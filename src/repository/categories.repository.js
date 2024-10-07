import { getConnection } from "../db/db.js";

const qryInsertCategory = ` insert into CATEGORIES(
                              name,
                              description,
                              parentId)
                            values(?,?,?);`;
const qryInsertCategoryWithoutParent = `insert into CATEGORIES(
                                          name,
                                          description)
                                        values(?,?);`;
const qryGetAllCategories = `	select
                                id,
                                name,
                                description,
                                parentId
                              from CATEGORIES
                              ORDER BY parentId ASC;`;
const qryGetCategoryByID = `select
                              id,
                              name,
                              description,
                              parentId
                            from CATEGORIES
                            where id = ?;`;
const qryGetCategoryByName = `select
                                id,
                                name,
                                description,
                                parentId
                              from CATEGORIES
                              where name = ?;`;
const qryUpdateCategoryByID = `	update CATEGORIES
                                set
                                  name = ?,
                                  descripction = ?,
                                  parentId = ?
                                where id = ?;`;

const getAll = async () => {
  try {
    const conn = getConnection();
    const [result] = await conn.query(qryGetAllCategories);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const categoriesRepository = {
  getAll,
};