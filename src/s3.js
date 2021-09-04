import aws from 'aws-sdk';

export class S3Client {
  #logger;
  #bucket;
  #s3;

  constructor(logger, region, bucketName) {
    this.#logger = logger;
    // see https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    aws.config.update({region: region});
    this.#s3 = new aws.S3({apiVersion: '2006-03-01'});
    this.#bucket = bucketName;
  }

  async listObjects(prefix) {
    let keyList = [];
    for (let continuationToken = null; ;) {
      const params = {
        Bucket: this.#bucket,
        Prefix: prefix,
      };
      if (continuationToken) {
        params.ContinuationToken = continuationToken;
      }

      const res = await this.#s3.listObjectsV2(params).promise();
      res.Contents.map(v => v.Key).forEach(key => {
        keyList.push(key);
      });

      if (!res.IsTruncated) {
        break;
      }

      // 1度に1000件までしか取得できないため、続きがある場合は再取得する
      continuationToken = res.NextContinuationToken;
    }

    return keyList;
  }

  async upload(key, data) {
    const uploadParams = {
      Bucket: this.#bucket,
      Key: key,
      Body: data,
      ContentEncoding: 'base64',
      ContentType: 'application/zip',
    };

    return new Promise((resolve, reject) => {
      this.#s3.upload(uploadParams, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve();
          this.#logger.info("Upload Success", data.Location);
        }
      });
    });
  }

  async deleteObjects(keys) {
    if (keys.length === 0) {
      return;
    }

    let params = {
      Bucket: this.#bucket,
      Delete: {
        Objects: keys.map(key => {
          return {Key: key};
        }),
      },
    };

    this.#s3.deleteObjects(params, (err, data) => {
      if (err) {
        throw err;
      }

      this.#logger.info("Delete Success", data);
    });
  }
}
