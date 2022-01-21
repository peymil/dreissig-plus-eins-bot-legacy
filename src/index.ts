import Discord, { Intents } from "discord.js";
import "reflect-metadata";
import typeOrm from "typeorm";
import config from "./config";
import msgListeners from "./msgListeners";

//Driver
const main = async () => {
  const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  await client.login(config.TOKEN);

  await typeOrm.createConnection();
  console.log("initialization completed");

  client.on("message", msgListeners);
};
main();
