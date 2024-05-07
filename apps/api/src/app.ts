import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import { ApiRouter } from './routers/api.router';
import { errorMiddleware, notFoundMiddleware } from './middleware/error-middleware';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(cookieParser());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use(errorMiddleware);
    this.app.use(notFoundMiddleware);
  }

  private routes(): void {
    const apiRouter = new ApiRouter();
    this.app.get('/', (req: Request, res: Response) => res.send(`Hello, Purwadhika Student !`));
    this.app.use('/api', apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${process.env.PORT}/`);
    });
  }
}
