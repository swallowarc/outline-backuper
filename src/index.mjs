import {OutlineClient} from "./outline.mjs";
import {Env} from "./env.mjs";
import {BackupInvoker} from "./invoker.mjs";
import {S3Client} from "./s3.js";
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = log4js.levels.INFO.levelStr;

logger.info('begin outline backup batch');

const env = new Env();
const oc = new OutlineClient(env.outline.baseURL, env.outline.token);
const s3 = new S3Client(logger, env.aws.region, env.aws.s3Bucket);
const invoker = new BackupInvoker(logger, oc, s3);
const collectionIDs = env.outline.collectionIDs.split(',');

logger.info('target collection ids', collectionIDs);

invoker.invoke(collectionIDs).catch(err => {
  logger.error(err)
}).finally(() => {
  logger.info('end outline backup batch');
});

