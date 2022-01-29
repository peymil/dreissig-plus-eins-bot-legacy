import { Message } from "discord.js";
import { ArgsOf, GuardFunction } from "discordx";

const isBotItself: GuardFunction<ArgsOf<"messageCreate">> = async (
  [message],
  client,
  next
) => {
  if (!(message instanceof Message) || client.user?.id !== message.author.id)
    await next();
};
export default isBotItself;
