import { getConnection } from "../db/db.js";

const qryInsertOrderItem = `insert into ORDER_ITEMS(
                              orderId,
                              productId,
                              quantity,
                              price
                            )
                            values (?,?,?,?);`;
const qryGetOrderItemsByOrderID = `	select
                                      id,
                                      orderId,
                                      productId,
                                      quantity,
                                      price
                                    from ORDER_ITEMS
                                    where orderId = ?;`;
const qryUpdateOrderItemByID = `update ORDER_ITEMS
                                set
                                  productId = ?,
                                  quantity = ?,
                                  price = ?
                                where orderId = ?;`;
const qryDeleteOrderItemsByOrderID = `delete 
                                      from ORDER_ITEMS
                                      where orderId = ?;`;
const qryDeleteOrderItemByID = `delete 
                                from ORDER_ITEMS
                                where id = ?;`;
const qryGetOrderItemsByUserID = `select
                                    ORDERS.id,
                                    ORDERS.orderDate,
                                    ORDERS.status,
                                    ORDERS.totalPrice,
                                    ORDER_ITEMS.id,
                                    ORDER_ITEMS.productId,
                                    ORDER_ITEMS.quantity,
                                    ORDER_ITEMS.price
                                  from ORDERS
                                  join ORDER_ITEMS on ORDERS.id = ORDER_ITEMS.orderId
                                  where ORDERS.userId = ?;`;

const insert = async (orderID, orderItem) => {
  try {
    const conn = getConnection();
    const result = conn.query(
      qryInsertOrderItem,
      [
        orderID,
        orderItem.productID,
        orderItem.quantity,
        orderItem.price,
      ],
    );
    conn.releaseConnection();
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getByOrderID = async (orderID) => {
  try {
    const conn = getConnection();
    const result = conn.query(qryGetOrderItemsByOrderID, orderID);
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getByUserID = async (userID) => {
  try {
    const conn = getConnection();
    const result = conn.query(qryGetOrderItemsByUserID, userID);
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const orderItemsRepository = {
  insert,
  getByOrderID,
  getByUserID,
};