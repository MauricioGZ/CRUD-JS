import express from 'express';
import { userRouter } from './routes/user.routes.js';
import cookieParser from "cookie-parser";
import { productsRouter } from './routes/products.routes.js';
import { categoriesRouter } from './routes/categories.routes.js';
import { addressesRouter } from './routes/addresses.routes.js';
import jwt from 'jsonwebtoken';
import config from './config.js';

const key = "";
const app = express();

//settings
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user : null };

  try {
    const data = jwt.verify(token, config.key);
    req.session.user = data;
  } catch (error) {
    console.log(error);
  }

  next();
});

app.set("port", 8000);

userRouter(app);
productsRouter(app);
categoriesRouter(app);
addressesRouter(app);


export default app;