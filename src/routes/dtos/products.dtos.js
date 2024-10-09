export class InsertProduct {
  constructor(name, description, price, stock, categoryID, image){
    this.name = name; 
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryID = categoryID;
    this.image = image;
  }
}

export class UpdateProduct extends InsertProduct {
  constructor(id, name, description, price, stock, categoryID, image){
    super(name, description, price, stock, categoryID, image);
    this.id = id;
  }
}