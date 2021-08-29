export class Env {
  constructor() {
    this.outline = {
      baseURL: process.env.OUTLINE_BASE_URL ?? 'http://localhost/api',
      token: process.env.OUTLINE_TOKEN ?? 'dummy',
      collectionIDs: process.env.COLLECTION_IDS ?? ['dummy'],
    };
    this.aws = {
      id: process.env.AWS_ACCESS_KEY ?? 'dummy',
      secret: process.env.AWS_SECRET_KEY ?? 'dummy',
      region: process.env.AWS_REGION ?? 'ap-northeast-1',
      s3Bucket: process.env.AWS_S3_BUCKET ?? 'backup',
    };
  }
}
