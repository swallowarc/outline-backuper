import aws from 'aws-sdk';

export class S3Client {
  constructor(region, bucket) {
    // see https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    aws.config.update({region: region});
    this.s3 = new aws.S3({apiVersion: '2006-03-01'});
  }

  async Upload() {

  }
}
