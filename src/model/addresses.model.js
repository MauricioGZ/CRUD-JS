export class Address {
  constructor(id, userID, addressType, address, city, state, country, zipCode) {
    this.id = id;
    this.user_id = userID;
    this.address_type = addressType;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zip_code = zipCode;
  }
};