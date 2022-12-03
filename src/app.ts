import express, { Request, Response, Application, Router } from 'express';
import orderRoutes from './routes/orders.routes';
import { HttpResponse } from './domain/response';
import { Code } from './enum/code.enum';
import { Status } from './enum/status.enum';
import { PORT } from './config/config';
import { verifyToken } from './middlewares';
import { userRoute } from './routes';
import * as database from './database';
export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on:';
  private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

  constructor(private readonly port: (string | number) = PORT || 3000) {
    this.app = express();
    // TODO: Enable middlewares
    // this.middleware();
    this.routes();
  }

  listen(): void {
    database.init().then(()=>{
      this.app.listen(this.port);
      console.info(`${this.APPLICATION_RUNNING} ${this.port}`);
    })
  }

  private middleware(): void {
    this.app.use((req, res, next) => verifyToken(req, res, next));
  }

  private routes(): void {
    this.app.use('/orders', this.middleware, orderRoutes);
    this.app.use('/user', userRoute);
    this.app.get('/', (_: Request, res: Response)=> res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Order Service!')));
    this.app.all('*', (_: Request, res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
  }
}
