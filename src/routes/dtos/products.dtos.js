export class InsertProduct {
  constructor(name, description, price, stock, categoryID, image, createdAt, updatedAt ){
    this.name = name; 
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryID = categoryID;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};