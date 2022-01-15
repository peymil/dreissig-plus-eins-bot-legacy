import camiMi from "./camiMi";
import cu from "./cu";
import laughToHolyNumbers from "./laughToHolyNumbers";
import Discord from "discord.js";

const msgListeners = [camiMi, cu, laughToHolyNumbers];

export default (msg: Discord.Message) => {
  msgListeners.forEach((func) => func(msg));
};
