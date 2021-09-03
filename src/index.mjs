import {OutlineClient} from "./outline.mjs";
import {Env} from "./env.mjs";
import {BackupInvoker} from "./invoker.mjs";
import {S3Client} from "./s3.js";

const env = new Env();
const oc = new OutlineClient(env.outline.baseURL, env.outline.token);
const s3 = new S3Client(env.aws.region, env.aws.s3Bucket);
const invoker = new BackupInvoker(oc, s3);

invoker.invoke(env.outline.collectionIDs);
