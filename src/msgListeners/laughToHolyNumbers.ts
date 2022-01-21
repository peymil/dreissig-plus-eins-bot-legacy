import Discord from "discord.js";
import { Parser } from "expr-eval";
import isIncludesAsSubstring from "../utils/isIncludesAsSubstring";

const alphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhii̇jklmnoöprsştuüvyz";
const generateRandomLaugh = (min: number, max: number) => {
  const chars = [];
  for (let n = 0; n < Math.floor(Math.random() * max + 1) + min; n++) {
    const random = Math.floor(Math.random() * 60);
    chars.push(random);
  }
  return chars.map((x) => alphabet[x]).join("");
};

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
