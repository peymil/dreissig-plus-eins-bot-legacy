import Discord from "discord.js";
import { Parser } from "expr-eval";
import { removeItem } from "./utils";
import sqlite3 from "sqlite3";
const client = new Discord.Client();
const parser = new Parser();
const states = {
  cu: [] as { cooldown: boolean; userId: string }[],
};
const sql = new sqlite3.Database(":memory:");

const alphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhii̇jklmnoöprsştuüvyz";
const generateRandomLaugh = (min: number, max: number) => {
  const chars = [];
  for (let n = 0; n < Math.floor(Math.random() * max + 1) + min; n++) {
    const random = Math.floor(Math.random() * 60);
    chars.push(random);
  }
  return chars.map((x) => alphabet[x]).join("");
};

export default {
  laughTo31: (msg: Discord.Message) => {
    if (msg.content.includes("31")) msg.reply(generateRandomLaugh(30, 60));
    else {
      try {
        const sum = parser.parse(msg.content).evaluate();
        if (sum === 31) msg.reply(generateRandomLaugh(30, 60));
      } catch (err) {
        console.log(err);
      }
    }
  },
  camiMi: (msg: Discord.Message) => {
    const welcomeWords = ["selamun aleyküm", "selamın aleyküm", "sa"];
    welcomeWords.map((welcomeWord) => {
      welcomeWord.includes(msg.content);
    });
    const isFound = welcomeWords.includes(msg.content.toLowerCase());
    if (isFound) msg.reply("Cami mi lan burası.");
  },
  // cu: (msg: Discord.Message) => {
  // 	const userId = msg.author.id;
  // 	if (!states.cu.includes({ userId, cooldown: false })) {
  // 		states.cu.push({ userId, cooldown: false });
  // 		msg.reply("cu");
  // 		return;
  // 	} else if (states.cu.includes({ userId, cooldown: true })) {
  // 		return;
  // 	} else if (msg.content.includes("cu ne")) {
  // 		msg.reply("ANANIN AMCUĞUUUU");
  // 		setTimeout(() => {
  // 			states.cu = removeItem(states.cu, { userId, cooldown: true });
  // 		}, 86400000);
  // 		return;
  // 	}
  // },
};
