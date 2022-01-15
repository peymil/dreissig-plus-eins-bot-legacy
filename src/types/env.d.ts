declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      NODE_ENV?: "development" | "production";
      CU_EVENT_TIMEOUT_MINUTES: number;
      CU_EVENT_CHANCE_PERCANTAGE: number;
    }
  }
}

export {};
