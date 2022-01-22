export default (str: string, substr: string) =>
  str.split(" ").some((value, i) => value.toLowerCase() === substr);
