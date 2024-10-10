import { Address } from "../model/addresses.model.js";
import { addressesRepository } from "../repository/addresses.repository.js";

const getByUserID = async (userID) => {
  try {
    const result = await addressesRepository.getByUserID(userID);
    const addresses = result.map((element) => {
      return new Address(
        element.id,
        element.userId,
        element.addressType,
        element.address,
        element.city,
        element.state,
        element.country,
        element.zipCode,
      );
    });
    return addresses;
  } catch (error) {
    console.log(error);
  }
};

const add = async (address) => {
  try {
    await addressesRepository.insert(address);
  } catch (error) {
    console.log(error);
  }
};

const updateByID = async (address) => {
  try {
    const result = await addressesRepository.getByID(address.id, address.userID);
    
    if(!address.type) address.type = result.addressType;
    if(!address.name) address.name = result.address;
    if(!address.city) address.city = result.city;
    if(!address.state) address.state = result.state;
    if(!address.country) address.country = result.country;
    if(!address.zipCode) address.zipCode = result.zipCode;

    await addressesRepository.updateByID(address);
  } catch (error) {
    console.log(error);
  }
};

const getByID = async (id, userID) => {
  try {
    const result = await addressesRepository.getByID(id, userID);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addressesService = {
  getByUserID,
  add,
  updateByID,
  getByID,
};