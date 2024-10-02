import { userRepository } from "../repository/user.repository.js";


const register = async(user) => {
  try {
    let {result, error} = await userRepository.getByEmail(user.email);
    if (result.length != 0) {
      //TODO: implement error handling
      return null
    }
  
    if (error !== null) {
      return error
    }

    ({result, error} = await userRepository.insert(user));

    if (error !== null) {
      return error
    }
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  register
}