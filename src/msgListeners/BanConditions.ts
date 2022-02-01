import { DiscordAPIError } from "discord.js";
import { ArgsOf, Client, Discord, Guard, On } from "discordx";
import { BANNED_ACTIVITIES } from "../constants";
@Discord()
abstract class Jokes {
  @On("presenceUpdate")
  async forbiddenGames(
    [oldPresence, newPresence]: ArgsOf<"presenceUpdate">,
    client: Client
  ) {
    try {
      const activityName = newPresence.activities[0].name;
      const prevActivityName = newPresence.activities[0].name;
      const doesAlreadyPlaying = activityName === prevActivityName;
      if (BANNED_ACTIVITIES.includes(activityName) && !doesAlreadyPlaying) {
        await newPresence.guild?.systemChannel?.send(
          `<@${newPresence.userId}> ${activityName} OYUNCUSU TESPIT EDILDI! ${activityName} OYUNCUSU TESPIT EDILDI! AMINA KOYAYIM ${activityName} OYUNCUSU`
        );
        // Disabled for testing
        // await newPresence.member?.kick(activityName + "oynuyo");
      }
    } catch (err) {
      return;
    }
  }
}
export default Jokes;
