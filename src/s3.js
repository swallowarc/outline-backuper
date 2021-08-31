import aws from 'aws-sdk';

export class S3Client {
  #bucket;
  #s3;

  constructor(region, bucketName) {
    // see https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    aws.config.update({region: region});
    this.#s3 = new aws.S3({apiVersion: '2006-03-01'});
    this.#bucket = bucketName;
  }

  async ListBuckets() {
    let result = null;
    this.#s3.listBuckets(function (err, data) {
      if (err) {
        throw err;
      }

      result = data.Buckets;
    });

    return result;
  }

  async Upload(key, data) {
    const uploadParams = {Bucket: this.#bucket, Key: key, Body: data};
    this.#s3.upload(uploadParams, function (err, data) {
      if (err) {
        throw err;
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });
  }

  async Delete(key) {
    const deleteParams = {
      Bucket: this.#bucket,
      Key: key,
    };
    this.#s3.deleteObject(deleteParams, function (err, data) {
      if (err) {
        throw err;
      }

      console.log("Delete Success", data);
    });
  }
}
