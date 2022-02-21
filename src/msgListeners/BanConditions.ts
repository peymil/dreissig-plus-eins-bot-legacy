import { DiscordAPIError } from "discord.js";
import { ArgsOf, Client, Discord, Guard, On } from "discordx";
import { BANNED_ACTIVITIES } from "../constants";
@Discord()
abstract class Jokes {
  @On("presenceUpdate")
  async forbiddenGames([oldPresence, newPresence]: ArgsOf<"presenceUpdate">, client: Client) {
    const currentActivity = newPresence?.activities[0];
    const prevActivity = oldPresence?.activities[0];
    const currentActivityName = currentActivity?.name
    const isAlreadyPlaying = currentActivityName === prevActivity?.name;
    if (BANNED_ACTIVITIES.includes(currentActivityName) && !isAlreadyPlaying) {
      const systemChannel = newPresence.guild?.systemChannel;
      const uppercaseAct = currentActivityName.toUpperCase()
      if (systemChannel) {
        await systemChannel.send(
          `<@${newPresence.userId}> ${uppercaseAct} OYUNCUSU TESPIT EDILDI! ${uppercaseAct} OYUNCUSU TESPIT EDILDI! AMINA KOYAYIM ${uppercaseAct} OYUNCUSU`
        ).catch(() => { });
        const member = newPresence.member;
        if (member) {
          member.ban({
            reason: currentActivityName + "oynuyo",
            days: 7,
          }).catch(() => {
            systemChannel.send(
              `<@${newPresence.userId}>'yi banlamak için yetki verir misinizzzz :innocent:`
            ).catch(() => { });
          })
        }
      }

    }
  }
}

export default Jokes;
