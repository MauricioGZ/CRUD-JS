import {getConnection} from '../db/db.js';
const qryInsertUser = `	insert into USERS (
                          firstName,
                          lastName,
                          email,
                          password,
                          roleId,
                          createdAt
                        )
                        values (?,?,?,?,?,?);`;
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
                              user.firstName,
                              user.lastName,
                              user.email,
                              user.password,
                              user.roleID,
                              user.createdAt
                            ]
                          );
    return {result: result, error: null};
  } catch (error) {
    return {result: null, error: error.code};
  }
};

const getByEmail = async (email) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryGetUserByEmail, email);
    return {result: result, error: null};
  } catch (error) {
    return {result: null, error: error.code};
  }
};

const deleteByEmail = async (email) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryDeleteUserByEmail, email);
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