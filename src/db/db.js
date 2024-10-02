import mysql from 'mysql2/promise';
import config from '../config.js';

const connection = mysql.createPool({
  host: config.host,
  database: config.dbName,
  port: config.port,
  user: config.user,
  password: config.password
});

export const getConnection = () => {
  return connection;
};

