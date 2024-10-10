export class InsertAddress {
  constructor(userID, addressType, address, city, state, country, zipCode) {
    this.userID = userID;
    this.type = addressType;
    this.name = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }
}

export class UpadteAddress extends InsertAddress {
  constructor(id,userID, addressType, address, city, state, country, zipCode) {
    super(userID, addressType, address, city, state, country, zipCode);
    this.id =id;
  }
}