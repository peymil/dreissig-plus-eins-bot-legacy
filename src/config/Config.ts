import fs from "fs/promises";
import ConfigValidators from "./ConfigValidators";
class Config {
  BOT_TOKEN = process.env.BOT_TOKEN || "";
  CU_EVENT_TIMEOUT_MINUTES = 5;
  CU_EVENT_CHANCE_PERCANTAGE = 0.01;
  CAMI_MI_EVENT_TIMEOUT = 5;

  async loadValues(validators?: ConfigValidators) {
    const file = await fs.readFile(__dirname + "/../../data/config.json");
    if (!file) return;
    const configFileJson = JSON.parse(file.toString());

    if (validators) {
      for (const validatorKey in validators) {
        //@ts-ignore
        const validator = validators[validatorKey];
        if (validator) {
          //@ts-ignore
          validator(configFileJson[validator]);
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
  async watchForConfig() {
    const a = await fs.watch(__dirname + "/../../data/config.json");
    await this.watchForConfig();
  }
  async saveValues() {
    await fs.writeFile(
      __dirname + "/../../data/config.json",
      JSON.stringify(this)
    );
  }
}
export default new Config();
