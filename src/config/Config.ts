import fs from "fs/promises";
import { ConfigImplement } from "./ConfigImplement";
import ConfigValidators from "./ConfigValidators";
class Config implements ConfigImplement {
  async loadValues() {
    console.log("hello");
    const file = await fs.readFile("../../data/config.json");
    const json = JSON.parse(file.toString());

    return json;
  }
  async saveValues(validators: ConfigValidators) {
    let objToWrite = { ...this };
    for (const validatorKey in validators) {
      //@ts-ignore
      const validator = validators[validatorKey];
      if (validator) {
        //@ts-ignore
        objToWrite[validator] = validator(this[validator]);
      }
    }
    await fs.writeFile("../../data/config.json", JSON.stringify(objToWrite));
  }
  TOKEN = "";
  CU_EVENT_TIMEOUT_MINUTES = 0;
  CU_EVENT_CHANCE_PERCANTAGE = 0.01;
}
export default Config;
