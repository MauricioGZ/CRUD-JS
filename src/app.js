import express, { json } from 'express';
import { userRouter } from './routes/user.routes.js';
import cookieParser from "cookie-parser";

const app = express();

//settings
app.use(express.json());
app.use(cookieParser());
app.set("port", 8000);

userRouter(app)


export default app;