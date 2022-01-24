import { ConfigImplement } from "./ConfigImplement";

type ConfigValidatorImplementation = {
  [key in keyof ConfigImplement]?: (value: unknown) => boolean;
};

class ConfigValidators implements ConfigValidatorImplementation {
  CU_EVENT_CHANCE_PERCANTAGE(value: unknown) {
    return !(typeof value !== "number" || value > 100 || value < 0);
  }
}
export default ConfigValidators;
