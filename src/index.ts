import Discord, { Intents } from "discord.js";
import commands from "./commands";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  require("dotenv").config();
}
export type Context = {};
const main = async () => {
  const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  await client.login(process.env.BOT_TOKEN);

  await createConnection();

  console.log("initialization completed");

  const handleParseCommands = (msg: Discord.Message, context?: Context) => {
    const commandArray = Object.values(commands);
    if (msg.author.bot) return;
    for (const command of commandArray) command(msg);
  };

  client.on("message", (msg) => handleParseCommands(msg));
};
main();
