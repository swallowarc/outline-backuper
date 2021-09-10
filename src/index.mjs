import {OutlineClient} from "./outline.mjs";
import {Env} from "./env.mjs";
import {BackupInvoker} from "./invoker.mjs";
import {S3Client} from "./s3.js";
import {SlackClient} from "./slack.mjs";
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = log4js.levels.INFO.levelStr;

logger.info('begin outline backup batch');

const env = new Env();
const oc = new OutlineClient(env.outline.baseURL, env.outline.token);
const s3 = new S3Client(logger, env.aws.region, env.aws.s3Bucket);
const slack = new SlackClient(logger, env.slack.botToken, env.slack.channelID);
const invoker = new BackupInvoker(logger, oc, s3, slack);

invoker.invoke().catch(err => {
  logger.error(err)
}).finally(() => {
  logger.info('end outline backup batch');
});
