import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { createConnection } from "../node_modules/typeorm/index.js";
import config from "./config";
import { importx } from "@discordx/importer";
import path from "path";
import isBotItself from "./guards/isBotItself";

//Driver
const main = async () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    guards: [isBotItself],
  });
  await config.loadValues().catch(config.saveValues);
  client.on("ready", async () => {
    console.log(">> Bot started");

    await client.initApplicationCommands();
    await client.initApplicationPermissions();
  });

  await createConnection();

  await importx(path.join(__dirname, "/msgListeners/*.{ts,js}"));

  await client.login(config.TOKEN); // provide your bot token
};
main();
