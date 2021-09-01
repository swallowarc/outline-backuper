import {Env} from "../env.mjs";
import {S3Client} from "../s3.js";
import {OutlineClient} from "../outline.mjs";

const env = new Env();
const oc = new OutlineClient(env.outline.baseURL, env.outline.token);
const s3 = new S3Client(env.aws.region, env.aws.s3Bucket);

oc.ExportCollection(env.outline.collectionIDs.split(",")[0]).then((data) => {
  s3.ListObjects().then(list => {
    console.log(list);
  })

  let _ = s3.Upload("outline/test.zip", data);
}).catch((err) => {
  console.error(err);
})
