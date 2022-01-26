declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PWD: string;
      BOT_TOKEN?: string;
      CONFIG_DIR?: string;
    }
  }
}
export {};
