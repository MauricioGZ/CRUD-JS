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
    console.log(error)
  }
};

export const addressesService = {
  getByUserID,
  add,
};