declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PWD: string;
      TOKEN?: string;
    }
  }
}
export {};
