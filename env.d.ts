declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_URL: string;
      AUTH_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      OPENAI_API_KEY: string;
      DATABASE_API_URL: string;
      FIREBASE_SERVICE_ACCOUNT_KEY: string;
    }
  }
}

export {
    
}