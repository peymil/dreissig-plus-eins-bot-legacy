import "reflect-metadata";
import { Client } from "discordx";
import { createConnection } from "../node_modules/typeorm/index.js";
import config from "./config";
import { importx } from "@discordx/importer";
import path from "path";
import isBotItself from "./guards/isBotItself";
import { intents } from "./constants";

//Driver
const main = async () => {
  const client = new Client({
    intents,
    guards: [isBotItself],
  });
  await config.loadValues().catch(() => config.saveValues());

  client.on("ready", async () => {
    console.log(">> Bot started");

    await client.initApplicationCommands();
    await client.initApplicationPermissions();
  });

  await createConnection();

  await importx(path.join(__dirname, "/msgListeners/*.{ts,js}"));

  await client.login(config.BOT_TOKEN); // provide your bot token
};
main();
