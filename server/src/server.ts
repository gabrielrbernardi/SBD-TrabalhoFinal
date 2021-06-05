import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// const middleware = new Middleware();

app.use(routes);

let port = 3333;
console.log("Running on: " + port);
app.listen(process.env.PORT || port);

var token:any;