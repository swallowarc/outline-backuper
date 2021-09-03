const NUM_OF_BACKUP_GENS = 10;

export class BackupInvoker {
  #outlineCli;
  #s3CLi;

  constructor(outlineCli, s3CLi) {
    this.#outlineCli = outlineCli;
    this.#s3CLi = s3CLi;
  }

  invoke(collectionIDs) {
    collectionIDs.forEach(id => {
      this.#outlineCli.exportCollection(id).then((data) => {
        const _ = this.#s3CLi.upload(sprintf("outline/%s.zip", id), data);
      })
    });
  }

  generationalChange() {

  }
}
