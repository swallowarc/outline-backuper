import s from "sprintf-js";

const NUM_OF_BACKUP_GENS = 10;

export class BackupInvoker {
  #outlineCli;
  #s3CLi;

  constructor(outlineCli, s3CLi) {
    this.#outlineCli = outlineCli;
    this.#s3CLi = s3CLi;
  }

  invoke(collectionIDs) {
    this.generationalChange();
    return;

    collectionIDs.forEach(id => {
      this.#outlineCli.exportCollection(id).then((data) => {
        const _ = this.#s3CLi.upload(sprintf("outline/%s.zip", id), data);
      })
    });
  }

  generationalChange() {
    const today = new Date().toLocaleString('ja-JP');
    const ymd = s.sprintf(
        "%s-%s-%s",
        today.getFullYear(),
        ('00' + (today.getMonth() + 1)).slice(-2),
        ('00' + today.getDate()).slice(-2),
    );

    console.log(ymd);
  }
}
