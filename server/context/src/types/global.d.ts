import { Express } from 'express';

declare global {
  namespace NodeJS {
    interface Global {
      __EXPRESS_APP__: Express;
    }
  }
}