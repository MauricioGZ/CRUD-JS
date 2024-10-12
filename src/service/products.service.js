import { productsRepository } from "../repository/products.repository.js";
import { Product } from "../model/products.model.js";

const getAll = async () => {
  try {
    const result = await productsRepository.getAll();
    const products = result.map((element) => {
      return new Product(
        element.id,
        element.name,
        element.description,
        element.price,
        element.stock,
        element.categoryId,
        element.image,
        element.createdAt,
        element.updatedAt,
      );
    });
    return products
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id) => {
  try {
    const result = await productsRepository.getByID(id);
    return new Product(
      result.id,
      result.name,
      result.description,
      result.price,
      result.stock,
      result.categoryId,
      result.image,
      result.createdAt,
      result.updatedAt,
    );
  } catch (error) {
    console.log(error);
  }
};

const getByCategoryID = async (categoryID) => {
  try {
    const result = await productsRepository.getByCategoryID(categoryID);
    const products = result.map((element) => {
      return new Product(
        element.id,
        element.name,
        element.description,
        element.price,
        element.stock,
        element.categoryId,
        element.image,
        element.createdAt,
        element.updatedAt,
      );
    });
    return products
  } catch (error) {
    console.log(error);
  }
};

const add = async (product) => {
  try {
    await productsRepository.insert(product);
  } catch (error) {
    console.log(error);
  }
};

const updateByID = async (product) => {
  try {
    const result = await productsRepository.getByID(product.id);

    if (product.name == null) product.name = result.name;
    if (product.description == null) product.description = result.description;
    if (product.price == null) product.price = result.price;
    if (product.stock == null) product.stock = result.stock;
    if (product.categoryID == null) product.categoryID = result.categoryId;
    if (product.image == null) product.image = result.image;

    await productsRepository.updateByID(product);
  } catch (error) {
    console.log(error);
  }
};

const deleteByID = async (id) => {
  //TODO: finish this when the order repo is ready
};

export const productsService = {
  getAll,
  getByID,
  getByCategoryID,
  add,
  updateByID,
}