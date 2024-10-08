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