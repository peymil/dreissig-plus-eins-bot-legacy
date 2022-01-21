import Discord from "discord.js";
import config from "../config";
import { getRepository } from "typeorm";
import { CuEvent } from "../entity/CuEvent";
import isIncludesAsSubstring from "../utils/isIncludesAsSubstring";
export default async (msg: Discord.Message) => {
  //Create cu event
  const cuRepo = getRepository(CuEvent);
  const cuVictim = await cuRepo.findOne({ channelId: msg.channel.id });
  //Check if cu event is already fired and user wrote a message which includes cu as substring
  if (cuVictim) {
    const isCuEventTimedOut =
      +new Date() - +cuVictim.creationDate / 60000 >
      config.CU_EVENT_TIMEOUT_MINUTES;
    const isSentenceIncludeCu = isIncludesAsSubstring(msg.content, "cu");
    if (isSentenceIncludeCu && !isCuEventTimedOut) {
      msg.reply("ANANIN AMCUUUUU");
    }
    await cuRepo.delete({ channelId: msg.channel.id });
    // If cu event is not fired
  } else {
    if (Math.random() * 100 > config.CU_EVENT_CHANCE_PERCANTAGE) {
      const cuEvent = new CuEvent();
      cuEvent.channelId = msg.channel.id;
      msg.channel.send("cu");
      cuRepo.save(cuEvent);
    }
  }
};
