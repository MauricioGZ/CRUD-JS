import {getConnection} from '../db/db.js';
const qryInsertProduct = `insert into PRODUCTS(
                            name,
                            description,
                            price,
                            stock,
                            categoryId,
                            image,
                            createdAt,
                            updatedAt)
                          values(?,?,?,?,?,?,?,?);`;
const qryGetProductByID = `	select
                              id,
                              name,
                              description,
                              price,
                              stock,
                              categoryId,
                              image,
                              createdAt,
                              updatedAt
                            from PRODUCTS
                            where id = ?;`;
const qryUpdateProductByID = `update PRODUCTS
                        set
                          name = ?,
                          description = ?,
                          price = ?,
                          stock = ?,
                          categoryId = ?,
                          image = ?,
                          updatedAt = ?
                        where id = ?;`;
const qryDeleteProductByID = `delete 
                        from PRODUCTS
                        where id = ?;`;

const insert = async (product) => {
  try {
    const connection = getConnection();
    const result = await connection.query(
                            qryInsertProduct, 
                            [
                              product.name,
                              product.description,
                              product.price,
                              product.stock,
                              product.categoryID,
                              product.image,
                              product.createdAt,
                              product.updatedAt
                            ]
                          );
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryGetProductByID, id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteByID = async (id) => {
  try {
    const connection = getConnection();
    const [result] = await connection.query(qryDeleteProductByID, id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const productsRepository = {
  insert,
  getByID,
  deleteByID,
};