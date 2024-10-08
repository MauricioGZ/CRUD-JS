import { config } from "dotenv";

config();

export default {
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.PASSWORD || "",
  dbName: process.env.DB_NAME || "",
  key: process.env.KEY || "",
};