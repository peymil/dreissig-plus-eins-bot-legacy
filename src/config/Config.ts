import fs from "fs/promises";
import { ConfigImplement } from "./ConfigImplement";
import ConfigValidators from "./ConfigValidators";
class Config implements ConfigImplement {
  TOKEN = "";
  CU_EVENT_TIMEOUT_MINUTES = 0;
  CU_EVENT_CHANCE_PERCANTAGE = 0.01;

  async loadValues(validators?: ConfigValidators) {
    const file = await fs.readFile(__dirname + "/../../data/config.json");
    const configFileJson = JSON.parse(file.toString());

    if (validators) {
      for (const validatorKey in validators) {
        //@ts-ignore
        const validator = validators[validatorKey];
        if (validator) {
          //@ts-ignore
          objToWrite[validator] = validator(configFileJson[validator]);
        }
      }
    }

    for (const configFileKey in configFileJson) {
      const thisKeys = Object.keys(this);
      //@ts-ignore
      if (thisKeys.includes(configFileKey))
        //@ts-ignore
        this[configFileKey] = configFileJson[configFileKey];
    }
  }

  async saveValues() {
    await fs.writeFile(
      __dirname + "/../../data/config.json",
      JSON.stringify(this)
    );
  }
}
export default new Config();
