import { categoriesRepository } from "../repository/categories.repository.js";
import { CategoryNode } from "../model/categories.model.js";


const appendChilds = (parentCategories, categories, offset) => {
  for (let i = offset + 1; i < categories.length; i++) {
    if (parentCategories.getID() === categories[i].parentId) {
      parentCategories.append(
        categories[i].id,
        categories[i].name,
        categories[i].description,
      );
      appendChilds(parentCategories.getLastChild(), categories, i);
    }
  }
};

const getAll = async () => {
  try {
    let result = await categoriesRepository.getAll();
    let categories = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].parentId === null) {
        const parentCategory = new CategoryNode(
          result[i].id, 
          result[i].name, 
          result[i].description,
        );
        appendChilds(parentCategory, result, i);
        categories.push(parentCategory);
      }
    }
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id) => {
  try {
    const result = await categoriesRepository.getByID(id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const add = async (category) => {
  try {
    await categoriesRepository.insert(category);
  } catch (error) {
    console.log(error);
  }
};

const updateByID = async (category) => {
  try {
    const result = await categoriesRepository.getByID(category.id);

    if(!category.name) category.name = result.name;
    if(!category.description) category.description = result.description;
    if(!category.name) category.parentID = result.parentId;

    await categoriesRepository.updateByID(category);
  } catch (error) {
    console.log(error);
  }
};

export const categoriesService = {
  getAll,
  getByID,
  add,
  updateByID,
};