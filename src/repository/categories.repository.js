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
const qryUpdateCategoryByIDWithoutParent = `update CATEGORIES
                                            set
                                              name = ?,
                                              descripction = ?
                                            where id = ?;`;

const insert = async (category) => {
  try {
    const conn = getConnection();
    if (!category.parentID) {
      const [result] = conn.query(
        qryInsertCategory,
        [
          category.name,
          category.description,
          category.parentID,
        ],
      );
    } else {
      const [result] = conn.query(
        qryInsertCategoryWithoutParent,
        [
          category.name,
          category.description,
        ],
      );
    }
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const conn = getConnection();
    const [result] = await conn.query(qryGetAllCategories);
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
}

const getByID = async (id) => {
  try {
    const conn = getConnection();
    const [result] = await conn.query(qryGetCategoryByID, id);
    conn.releaseConnection();
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const updateByID = async (category) => {
  try {
    const conn = getConnection();
    if (!category.parentID) {
      const [result] = conn.query(
        qryUpdateCategoryByID,
        [
          category.name,
          category.description,
          category.parentID,
          category.id,
        ],
      );
    } else {
      const [result] = conn.query(
        qryUpdateCategoryByIDWithoutParent,
        [
          category.name,
          category.description,
          category.id,
        ],
      );
    }
    conn.releaseConnection();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const categoriesRepository = {
  getAll,
  getByID,
  insert,
  updateByID,
};