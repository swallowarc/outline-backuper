export class Backuper {
  constructor(outlineCli, awsCli) {
    this.outlineCli = outlineCli;
    this.awsCli = awsCli;
  }

  async Invoke(collectionID) {
    this.outlineCli.ExportCollection(collectionID).then((dump) => {
      console.log(dump);
    })
  }
}
