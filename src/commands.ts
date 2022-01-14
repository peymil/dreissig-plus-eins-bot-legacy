import Discord from "discord.js";
import { Parser } from "expr-eval";
import { getRepository } from "typeorm";
import { CuEvent } from "./entity/CuEvent";
// import { removeItem } from "./utils";
// import sqlite3 from "sqlite3";
// const client = new Discord.Client();
const parser = new Parser();
// const states = {
// cu: [] as { cooldown: boolean; userId: string }[],
// };
// const sql = new sqlite3.Database(":memory:");

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
    if (msg.content.includes("31"))
      msg.channel.send(generateRandomLaugh(30, 60));
    else {
      try {
        const sum = parser.parse(msg.content).evaluate();
        if (sum === 31) msg.channel.send(generateRandomLaugh(30, 60));
      } catch (err) {
        return;
      }
    }
  },
  camiMi: (msg: Discord.Message) => {
    const welcomeWords = ["selamun aleyküm", "selamın aleyküm", "sa"];
    welcomeWords.map((welcomeWord) => {
      welcomeWord.includes(msg.content);
    });
    const isFound = welcomeWords.includes(msg.content.toLowerCase());
    if (isFound) msg.channel.send("Cami mi lan burası.");
  },
  checkIfCuEventFinish: async (msg: Discord.Message) => {
    const cuRepo = getRepository(CuEvent);
    const cuVictim = await cuRepo.findOne({ channelId: msg.channel.id });
    const isSentenceIncludeCu = msg.content
      .split(" ")
      .every((value, i) => value.toLowerCase() === "cu");
    if (isSentenceIncludeCu && cuVictim) {
      msg.reply("ANANIN AMCUUUUU");
      await cuRepo.delete({ channelId: msg.channel.id });
    }
  },
  createCuEvent: async (msg: Discord.Message) => {
    if (Math.random() > 0.99) {
      const repo = getRepository(CuEvent);
      const cuVictim = await repo.findOne({ channelId: msg.channel.id });
      if (!cuVictim) {
        const cuEvent = new CuEvent();
        cuEvent.channelId = msg.channel.id;
        msg.channel.send("cu");
        repo.save(cuEvent);
      }
    }
  },
};
