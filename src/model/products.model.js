export class Product{
  constructor(id, name, description, price, stock, categoryID, image, createdAt, UpdatedAt){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.stock = stock;
    this.category_id = categoryID;
    this.image = image;
    this.created_at = createdAt;
    this.updated_at = UpdatedAt;
  }
};