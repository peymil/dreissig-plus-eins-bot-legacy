import { DiscordAPIError } from "discord.js";
import { ArgsOf, Client, Discord, Guard, On } from "discordx";
import { BANNED_ACTIVITIES } from "../constants";
@Discord()
abstract class Jokes {
  @On("presenceUpdate")
  async forbiddenGames([oldPresence, newPresence]: ArgsOf<"presenceUpdate">, client: Client) {
    const oldActivites = oldPresence?.activities || [];
    const activites = newPresence.activities;
    const activityName = activites.length > 0 ? newPresence.activities[0].name : "";
    const prevActivityName = oldActivites.length > 0 && newPresence.activities[0].name;
    const isAlreadyPlaying = activityName === prevActivityName;
    if (BANNED_ACTIVITIES.includes(activityName) && !isAlreadyPlaying) {
      const systemChannel = newPresence.guild?.systemChannel;
      if (systemChannel) {
        await systemChannel.send(
          `<@${newPresence.userId}> ${activityName} OYUNCUSU TESPIT EDILDI! ${activityName} OYUNCUSU TESPIT EDILDI! AMINA KOYAYIM ${activityName} OYUNCUSU`
        );
      }

      const member = newPresence.member;
      if (member) {
        try {
          await member.ban({
            reason: activityName + "oynuyo",
            days: 7,
          });
        }
        catch (err) {
          console.log("No permission to ban.")
        }
      }
    }
  }
}
export default Jokes;
