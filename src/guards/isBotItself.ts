import { ArgsOf, GuardFunction } from "discordx";

const isBotItself: GuardFunction<ArgsOf<"messageCreate">> = async (
  [message],
  client,
  next
) => {
  if (client.user?.id !== message.author.id) await next();
};
export default isBotItself;
