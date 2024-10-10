import {getConnection} from '../db/db.js';

const qryInsertAddress = `insert into ADDRESSES(
                            userId,
                            addressType,
                            address,
                            city,
                            state,
                            country,
                            zipCode)
                          values (?,?,?,?,?,?,?);`;
const qryGetAddressesByUserID = `	select 
                                    id,
                                    userId,
                                    addressType,
                                    address,
                                    city,
                                    state,
                                    country,
                                    zipCode
                                  from ADDRESSES
                                  where userId = ?;`;
const qryDeleteAddressByID = `delete
                              from ADDRESSES
                              where id = ? AND userId = ?;`;
const qryUpdateAddressByID = `update ADDRESSES
                              set
                                addressType = ?,
                                address = ?,
                                city = ?,
                                state = ?,
                                country = ?,
                                zipCode = ?
                              where id = ? AND userId = ?;`;
const qryGetAddressByID = `	select 
                              id,
                              userId,
                              addressType,
                              address,
                              city,
                              state,
                              country,
                              zipCode
                            from ADDRESSES
                            where id = ? AND userId = ?;`;

const insert = async (address) => {
  try {
    const connection = getConnection();
    const result = await connection.query(
                            qryInsertAddress, 
                            [
                              address.userID,
                              address.type,
                              address.name,
                              address.city,
                              address.state,
                              address.country,
                              address.zipCode,
                            ]
                          );
    return result
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id, userID) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryGetAddressByID, [id, userID]);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getByUserID = async (userID) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryGetAddressesByUserID, userID);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteByID = async (id) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryDeleteAddressByID, id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateByID = async (address) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(
      qryUpdateAddressByID,
      [
        address.type,
        address.name,
        address.city,
        address.state,
        address.country,
        address.zipCode,
        address.id,
        address.userID,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const addressesRepository = {
  insert,
  getByID,
  getByUserID,
  deleteByID,
  updateByID,
};