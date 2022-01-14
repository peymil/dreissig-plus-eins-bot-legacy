import Discord from "discord.js";
import commands from "./commands";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection } from "typeorm";

if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  dotenv.config();
}
export type Context = {

}
const main = async () => {
  const connection = await createConnection();
  const client = new Discord.Client();
  await client.login(process.env.BOT_TOKEN);

  const handleParseCommands = (msg: Discord.Message,context?:Context) => {
    const commandArray = Object.values(commands);
    if (msg.author.bot) return;
    for (const command of commandArray) command(msg);
  };
  
  client.on("message", (msg) => handleParseCommands(msg));
}
main()