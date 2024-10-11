import {getConnection} from '../db/db.js';
const qryInsertUser = `	insert into USERS (
                          firstName,
                          lastName,
                          email,
                          password,
                          roleId,
                          createdAt
                        )
                        values (?,?,?,?,3,NOW());`;
const qryGetUserByEmail = `	select 
                              id, 
                              firstName, 
                              lastName, 
                              email,
                              password,
                              roleId,
                              createdAt
                            from USERS
                            where email = ?;`;
const qryDeleteUserByEmail = `delete from USERS
                              where email = ?;`;

const insert = async (user) => {
  try {
    const connection = getConnection();
    const result = await connection.query(
                            qryInsertUser, 
                            [
                              user.first_name,
                              user.last_name,
                              user.email,
                              user.password,
                            ]
                          );
    conn.releaseConnection();
    return {result: result, error: null};
  } catch (error) {
    return {result: null, error: error.code};
  }
};

const getByEmail = async (email) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryGetUserByEmail, email);
    conn.releaseConnection();
    return {result: result, error: null};
  } catch (error) {
    return {result: null, error: error.code};
  }
};

const deleteByEmail = async (email) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryDeleteUserByEmail, email);
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const userRepository = {
  insert,
  getByEmail,
  deleteByEmail,
};