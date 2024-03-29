import fs from "fs/promises";
import ConfigValidators from "./ConfigValidators";

const fullConfigDir = process.env.CONFIG_DIR
  ? `${__dirname}/${process.env.CONFIG_DIR}`
  : `${__dirname}/../../data/config.json`;

class Config {
  BOT_TOKEN = process.env.BOT_TOKEN || "";
  CU_EVENT_TIMEOUT_MINUTES = 2;
  CU_EVENT_CHANCE_PERCANTAGE = 0.0025;
  CAMI_MI_EVENT_TIMEOUT = 2;

  async loadValues(validators?: ConfigValidators) {
    const file = await fs.readFile(fullConfigDir);
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
    const a = await fs.watch(fullConfigDir);
    await this.watchForConfig();
  }
  async saveValues() {
    await fs.writeFile(fullConfigDir, JSON.stringify(this));
  }
}
export default new Config();
