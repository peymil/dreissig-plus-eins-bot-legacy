import "reflect-metadata";
import { Client, ClientOptions } from "discordx";
import { createConnection } from "typeorm";
import config from "./config";
import { importx } from "@discordx/importer";
import path from "path";
import isBotItself from "./guards/isBotItself";
import { intents } from "./constants";

//Driver
export const createClient = async (clientOptions?: ClientOptions) => {
  const client = new Client(
    clientOptions || {
      intents,
      guards: [isBotItself],
    }
  );
  await config.loadValues().catch(() => config.saveValues());

  client.on("ready", async () => {
    console.log(">> Bot started");

    await client.initApplicationCommands();
    await client.initApplicationPermissions();
  });

  await importx(path.join(__dirname, "/msgListeners/*.{ts,js}"));

  await client.login(config.BOT_TOKEN); // provide your bot token
  return client;
};
