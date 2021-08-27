import {OutlineClient} from "./outline.mjs";

const oc = new OutlineClient("https://dummy", "token-string")
let res = oc.GetBackup("collection uuid")
console.log(res)
