declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PASSWORD: string;
      DATABASE: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      PWD: string;
    }
  }
}

export {};
