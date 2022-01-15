import Discord from "discord.js";
import { Parser } from "expr-eval";
import generateRandomLaugh from "../utils/generateRandomLaugh";
import isIncludesAsSubstring from "../utils/isIncludesAsSubstring";

export default async (msg: Discord.Message) => {
  if (isIncludesAsSubstring(msg.content, "31"))
    msg.channel.send(generateRandomLaugh(30, 60));
  else {
    try {
      const sum = Parser.parse(msg.content).evaluate();
      if (sum === 31) msg.channel.send(generateRandomLaugh(30, 60));
    } catch (err) {
      // The only error that can occur is parser error. If parser fails to parse just end the function
      return;
    }
  }
};
