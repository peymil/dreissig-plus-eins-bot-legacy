import { ArgsOf, Client, Discord, Guard, On } from "discordx";
import { Parser } from "expr-eval";
import { getRepository } from "typeorm";
import config from "../config";
import { CuEvent } from "../entity/CuEvent";
import doesIncludesAsSubstring from "../utils/doesIncludesAsSubstring";
import generateRandomLaugh from "../utils/generateRandomLaugh";

@Discord()
class Jokes {
  @On("messageCreate")
  async cu([msg]: ArgsOf<"messageCreate">) {
    //Create cu event
    const cuRepo = getRepository(CuEvent);
    const cuVictim = await cuRepo.findOne({ channelId: msg.channel.id });

    //Check if cu event is already fired and user wrote a message which includes cu as substring
    if (cuVictim) {
      const isCuEventTimedOut =
        (+new Date() - +cuVictim.creationDate) / 60000 >
        config.CU_EVENT_TIMEOUT_MINUTES;

      if (doesIncludesAsSubstring(msg.content, "cu") && !isCuEventTimedOut) {
        const jokeSentence = "ANANIN AMCUUUUU";
        await msg.reply(jokeSentence).catch(() => {
          msg.channel.send(jokeSentence);
        });
      }
      await cuRepo.delete({ channelId: msg.channel.id });
      // If cu event is not fired
    } else {
      // If author is bot don't init cu event
      if (msg.author.bot) return;

      if (Math.random() < config.CU_EVENT_CHANCE_PERCANTAGE) {
        const cuEvent = new CuEvent();
        cuEvent.channelId = msg.channel.id;
        msg.channel.send("cu");
        cuRepo.save(cuEvent);
      }
    }
  }

  @On("messageCreate")
  laughToHolyNumbers([msg]: ArgsOf<"messageCreate">) {
    if (doesIncludesAsSubstring(msg.content, "31"))
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
  }

  @On("messageCreate")
  camiMi([msg]: ArgsOf<"messageCreate">) {
    const welcomeWords = ["selamun aleyküm", "selamın aleyküm", "sa"];
    welcomeWords.map((welcomeWord) => {
      welcomeWord.includes(msg.content);
    });
    const isFound = welcomeWords.includes(msg.content.toLowerCase());
    if (isFound) msg.channel.send("Cami mi lan burası");
  }
}
export default Jokes;
