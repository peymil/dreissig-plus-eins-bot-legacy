import "reflect-metadata";
import { Client } from "discordx";
import { createConnection } from "../node_modules/typeorm/index.js";
import config from "./config";
import { importx } from "@discordx/importer";
import path from "path";
import isBotItself from "./guards/isBotItself";
import { intents } from "./constants";
import { createClient } from "./client.js";

//Driver
const main = async () => {
  await createConnection();
  await createClient();
};
main();
