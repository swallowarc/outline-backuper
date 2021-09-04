import {Env} from "../env.mjs";
import {S3Client} from "../s3.js";
import {OutlineClient} from "../outline.mjs";
import log4js from "log4js";

const BACKUP_DIR = 'outline';
const BACKUP_DIR_FORMAT = new RegExp('^' + BACKUP_DIR + '\/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\/$')

const logger = log4js.getLogger();
logger.level = 'info';

const env = new Env();
const outlineCli = new OutlineClient(env.outline.baseURL, env.outline.token);
const s3Cli = new S3Client(logger, env.aws.region, env.aws.s3Bucket);

const list = await s3Cli.listObjects('outline/');
const a = list.filter(key => BACKUP_DIR_FORMAT.test(key));
console.log(a);
