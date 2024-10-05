import express, { json } from 'express';
import { userRouter } from './routes/user.routes.js';
import cookieParser from "cookie-parser";
import { productsRouter } from './routes/products.routes.js';

const app = express();

//settings
app.use(express.json());
app.use(cookieParser());
app.set("port", 8000);

userRouter(app)
productsRouter(app)


export default app;