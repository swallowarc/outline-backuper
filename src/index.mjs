import {OutlineClient} from "./outline.mjs";
import {Env} from "./env.mjs";
import {Backuper} from "./backuper.mjs";

const env = new Env();
const oc = new OutlineClient(env.outline.baseURL, env.outline.token)
const invoker = new Backuper(oc, null);

env.outline.collectionIDs.forEach(id => {
  invoker.Invoke(id).catch(reason => {
    console.error(reason);
  });
});

