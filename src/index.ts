import Discord from "discord.js";
import commands from "./commands";
import dotenv from "dotenv";

if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  dotenv.config();
}
const main = async () => {
  const client = new Discord.Client();
  await client.login(process.env.BOT_TOKEN);
  console.log("login succeed");
  
  const handleParseCommands = (msg: Discord.Message) => {
    const commandArray = Object.values(commands);
    if (msg.author.bot) return;
    for (const command of commandArray) command(msg);
  };
  
  client.on("message", handleParseCommands);
}
main()