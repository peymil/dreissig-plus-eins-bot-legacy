import Config from "./Config";

type ConfigValidatorImplementation = {
  [key in keyof typeof Config]?: (value: unknown) => boolean;
};

class ConfigValidators implements ConfigValidatorImplementation {
  CU_EVENT_CHANCE_PERCANTAGE(value: unknown) {
    return !(typeof value !== "number" || value > 100 || value < 0);
  }
  TOKEN(value: unknown) {
    if (!value) throw new Error("Token must not be empty");
    else if (typeof value !== "string") throw new Error("Token must be string");
    return true;
  }
}
export default ConfigValidators;
