const alphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZabcçdefgğhii̇jklmnoöprsştuüvyz";

const generateRandomLaugh = (min: number, max: number) => {
  const chars = [];
  for (let n = 0; n < Math.floor(Math.random() * max + 1) + min; n++) {
    const random = Math.floor(Math.random() * alphabet.length + 1);
    chars.push(random);
  }
  return chars.map((x) => alphabet[x]).join("");
};
export default generateRandomLaugh;
