import Discord from "discord.js";

export default (msg: Discord.Message) => {
  const welcomeWords = ["selamun aleyküm", "selamın aleyküm", "sa"];
  welcomeWords.map((welcomeWord) => {
    welcomeWord.includes(msg.content);
  });
  const isFound = welcomeWords.includes(msg.content.toLowerCase());
  if (isFound) msg.channel.send("Cami mi lan burası.");
};
