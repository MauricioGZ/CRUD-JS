import { userRepository } from "../repository/user.repository.js";
import bcrypt from 'bcrypt';

const register = async(user) => {
  try {
    let {result, error} = await userRepository.getByEmail(user.email);
    if (result.length !== 0) {
      //TODO: implement error handling
      return {user: {}, result: null};
    }
  
    if (error !== null) {
      return {user: {}, result: error};
    }

    user.password = await bcrypt.hash(user.password, 10);
    ({result, error} = await userRepository.insert(user));

    if (error !== null) {
      return {user: {}, result: error};
    }
    return {user: { 
      id: result[0].insertId, 
      email: user.email, 
      role: user.roleId,
    }, result: error};
  } catch (error) {
    console.log(error);
  }
};

const login = async(user) => {
  try {
    let {result, error} = await userRepository.getByEmail(user.email);
    if (result.length === 0) {
      //TODO: implement error handling
      return {user: {}, result: false};
    }
    
    if (false === await bcrypt.compare(user.password, result[0].password)) {
      return {user: {}, result: false};
    }

    return {user: { 
                    id: result[0].id, 
                    email: result[0].email, 
                    role: result[0].roleId,
                  }, result: true};
  } catch (error) {
    console.log(error);
  }
} 

export const userService = {
  register,
  login
}