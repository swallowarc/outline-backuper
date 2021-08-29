/**
 * awsのaccess keyとsecretは下記の名称の環境変数をsdkが自動で読み込むため、コード中では設定していない
 */
export class Env {
  constructor() {
    this.outline = {
      baseURL: process.env.OUTLINE_BASE_URL ?? 'http://localhost/api',
      token: process.env.OUTLINE_TOKEN ?? 'dummy',
      collectionIDs: process.env.COLLECTION_IDS ?? ['dummy'],
    };
    this.aws = {
      accessKey: process.env.AWS_ACCESS_KEY_ID ?? 'dummy',
      secretKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'dummy',
      region: process.env.AWS_REGION ?? 'ap-northeast-1',
      s3Bucket: process.env.AWS_S3_BUCKET ?? 'backup',
    };
  }
}
