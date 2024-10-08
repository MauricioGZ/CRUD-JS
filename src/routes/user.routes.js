import { userService } from "../service/user.service.js";
import jwt from 'jsonwebtoken';
import config from "../config.js";

export const userRouter = (app) => {
  app.post("/register", async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    const {user, result} = await userService.register({
      first_name,
      last_name,
      email,
      password,
      roleID: 1,
      createdAt: "2024-09-04 20:28:13",
    });
  
    const token = jwt.sign({
      id: user.id, 
      email: user.email, 
      roleId: user.roleID,
    }, 
    config.key, 
    {
      expiresIn: "1h",
    });

    if (result !== null) {
      //TODO: implement different responses for the different error cases
      res.status(500).send("internal server error");
      return;
    }
    res.cookie('access_token',token, {
      httpOnly: true,
      sameSite: 'strict',
    })
    .status(200).send("loged in");
  });

  app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const {user, result} = await userService.login({email,password})

    if (result !== true) {
      //TODO: implement different responses for the different error cases
      res.status(500).send("internal server error");
      return;
    }

    const token = jwt.sign({
                            id: user.id, 
                            email: user.email, 
                            roleId: user.roleID,
                          }, 
                          config.key, 
                          {
                            expiresIn: "1h",
                          });

    res.cookie('access_token',token, {
      httpOnly: true,
      sameSite: 'strict',
    })
    .status(200).send("loged in");
  });
}