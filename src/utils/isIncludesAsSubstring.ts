export default (str: string, substr: string) =>
  str.split(" ").every((value, i) => value.toLowerCase() === substr);
