import { engine } from 'express-handlebars';
import express, { Request, Response, Application } from 'express';
import cookieParser from 'cookie-parser';
import { HttpResponse } from './domain/response';
import { Code } from './enum/code.enum';
import { Status } from './enum/status.enum';
import { PORT } from './config/config';
import { verifyToken } from './middlewares';
import { userRoute, orderRoute, referralRoute } from './routes';
import * as database from './database';

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on:';
  private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

  constructor(private readonly port: (string | number) = PORT || 3000) {
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(express.json({ limit: '50mb' }));
    
    this.app.engine('handlebars', engine());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', __dirname + '/../src/views');

    this.app.use(express.static('public'));

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
    this.app.use('/user', userRoute);
    this.app.get('/signup', (req, res) => res.send({success: true}))
    this.app.use('/refer', referralRoute);
    this.middleware();
    this.app.use('/orders', orderRoute);
    this.app.get('/', (_: Request, res: Response)=> res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Order Service!')));
    this.app.all('*', (_: Request, res: Response)=> res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
  }
}
