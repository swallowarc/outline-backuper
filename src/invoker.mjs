import s from "sprintf-js";

const BACKUP_DIR = 'outline';
const YMD_FORMAT = '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])';
const BACKUP_DIR_REG_EXP = new RegExp(s.sprintf('^%s\/%s\/', BACKUP_DIR, YMD_FORMAT))
const BACKUP_GENS_MAX = 10;

export class BackupInvoker {
  #logger;
  #outlineCli;
  #s3Cli;
  #slackCli;

  constructor(logger, outlineCli, s3CLi, slackCli) {
    this.#logger = logger;
    this.#outlineCli = outlineCli;
    this.#s3Cli = s3CLi;
    this.#slackCli = slackCli;
  }

  async invoke(collectionIDs) {
    const baseKey = this.baseKey();

    // バックアップ
    this.#logger.info('begin backup');

    const promises = [];
    collectionIDs.forEach(id => {
      this.#logger.info('export from outline', id);

      promises.push(new Promise((resolve, reject) => {
        this.#outlineCli.exportCollection(id).then(data => {
          this.#logger.info('upload to S3', id);
          this.#s3Cli.upload(s.sprintf("%s/%s.zip", baseKey, id), data).then(() => {
            resolve();
          });
        }).catch(err => {
          reject(err);
        });
      }));
    });

    await Promise.all(promises);
    this.#logger.info('end backup');

    // 世代交代
    this.#logger.info('begin generationalChange');

    this.generationalChange().catch(err => {
      this.#logger.error('failed to generationalChange');
      throw err;
    });

    this.#logger.info('end generationalChange');

    this.#slackCli.send(s.sprintf("Backup complete. \n%s/*", baseKey));
  }

  baseKey() {
    const today = new Date();
    const ymd = s.sprintf(
        "%s-%s-%s",
        today.getFullYear(),
        ('00' + (today.getMonth() + 1)).slice(-2),
        ('00' + (today.getDate())).slice(-2),
    );

    return s.sprintf('%s/%s', BACKUP_DIR, ymd);
  }

  async generationalChange() {
    const allKeyList = await this.#s3Cli.listObjects(s.sprintf("%s/", BACKUP_DIR));
    let dirList = [];
    allKeyList.forEach(key => {
      if (!BACKUP_DIR_REG_EXP.test(key)) {
        return;
      }

      const path = key.split('/');
      if (path.length === 3) {
        dirList.push(s.sprintf('%s/%s/', path[0], path[1]));
      }
    })

    const over = dirList.length - BACKUP_GENS_MAX;
    if (over <= 0) {
      return;
    }

    dirList.slice(0, over).forEach(dirKey => {
      const deleteKeyList = allKeyList.filter(key => key.match(dirKey));
      this.#s3Cli.deleteObjects(deleteKeyList);
    });
  }
}
