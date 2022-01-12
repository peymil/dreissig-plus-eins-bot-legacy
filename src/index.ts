import Discord from "discord.js";
import commands from "./commands";
import dotenv from "dotenv";

if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  dotenv.config();
}
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const handleParseCommands = (msg: Discord.Message) => {
  const commandArray = Object.values(commands);
  if (msg.author.bot) return;
  for (const command of commandArray) command(msg);
};

client.on("message", handleParseCommands);
