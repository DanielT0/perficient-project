declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_PASSWORD: string;
      DATABASE: string;
      NODE_ENV: "development" | "production";
      PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
