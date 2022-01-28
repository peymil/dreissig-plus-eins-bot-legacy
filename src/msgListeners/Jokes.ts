import { ArgsOf, Client, Discord, Guard, On } from "discordx";
import { Parser } from "expr-eval";
import config from "../config";
import ChannelEventProvider from "../event/ChannelEventProvider";
import doesIncludesAsSubstring from "../utils/doesIncludesAsSubstring";
import generateRandomLaugh from "../utils/generateRandomLaugh";

@Discord()
class Jokes {
  @On("messageCreate")
  async cu([msg]: ArgsOf<"messageCreate">) {
    //Create cu event
    const eventName = "cu";
    const cuVictim = await ChannelEventProvider.find(eventName, msg.channelId);

    //Check if cu event is already initialized and user wrote a message which includes cu as substring
    if (cuVictim) {
      const isCuEventTimedOut =
        (+new Date() - +cuVictim.creation_date) / 60000 >
        config.CU_EVENT_TIMEOUT_MINUTES;
      if (doesIncludesAsSubstring(msg.content, "cu") && !isCuEventTimedOut) {
        const jokeSentence = "ANANIN AMCUUUUU";
        await msg.reply(jokeSentence).catch(() => {
          msg.channel.send(jokeSentence);
        });
      }
      await ChannelEventProvider.delete(eventName, msg.channelId);
    }
    // If cu event is not initialized
    else if (Math.random() < config.CU_EVENT_CHANCE_PERCANTAGE) {
      await ChannelEventProvider.create(eventName, msg.channelId);
      msg.channel.send("cu");
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
  async camiMiEvetCamiymis([msg]: ArgsOf<"messageCreate">) {
    const eventName = "camiMi";
    const camiMiEvent = await ChannelEventProvider.find(
      eventName,
      msg.channelId
    );
    if (camiMiEvent) {
      const welcomeReplyWords = ["aleyküm selam", "as", "aleykümselam"];
      const lowerCaseMsg = msg.content.toLowerCase();
      const isFound = welcomeReplyWords.some((welcomeReplyWord) => {
        return doesIncludesAsSubstring(lowerCaseMsg, welcomeReplyWord);
      });
      const isCamiMiEventTimedOut =
        (+new Date() - +camiMiEvent.creation_date) / 60000 >
        config.CU_EVENT_TIMEOUT_MINUTES;
      if (isFound && !isCamiMiEventTimedOut) {
        msg.channel.send("Camiymiş");
      }
      await ChannelEventProvider.delete(eventName, msg.channelId);
    } else {
      const welcomeWords = ["selamun aleyküm", "selamın aleyküm", "sa"];
      const lowerCaseMsg = msg.content.toLowerCase();
      const isFound = welcomeWords.some((welcomeWord) => {
        return doesIncludesAsSubstring(lowerCaseMsg, welcomeWord);
      });

      if (isFound) {
        msg.channel.send("Cami mi lan burası");
        await ChannelEventProvider.create(eventName, msg.channelId);
      }
    }
  }
}
export default Jokes;
