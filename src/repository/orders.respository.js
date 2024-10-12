import { getConnection } from "../db/db.js";

const qryInsertOrder = `insert into ORDERS(
                          userId,
                          orderDate,
                          status,
                          totalPrice
                        )
                        values (?,NOW(),?,?);`;
const qryGetOrderByID = ` select
                            id,
                            userId,
                            orderDate,
                            status,
                            totalPrice
                          from ORDERS
                          where id = ?;`;
const qryGetOrderByUserID = ` select
                                id,
                                userId,
                                orderDate,
                                status,
                                totalPrice
                              from ORDERS
                              where userId = ?;`;
const qryLastInsertID = `select LAST_INSERT_ID();`;

const insert = async (order) => {
  try {
    const conn = getConnection();
    const result = conn.query(
      qryInsertOrder,
      [
        order.userId,
        order.status,
        order.totalPrice,
      ],
    );
    //TODO: check if the last inserted ID is retrieved
    conn.releaseConnection();
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id) => {
  try {
    const conn = getConnection();
    const result = conn.query(qryGetOrderByID, id);
    conn.releaseConnection();
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getByUserID = async (userID) => {
  try {
    const conn = getConnection();
    const result = conn.query(qryGetOrderByUserID, userID);
    conn.releaseConnection();
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

export const ordersRepository = {
  insert,
  getByID,
  getByUserID,
};