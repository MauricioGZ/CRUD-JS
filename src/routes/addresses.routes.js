import { addressesService } from "../service/addresses.service.js";

export const addressesRouter = (app) => {
  app.get("/addresses", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user) return res.status(403).send("unauthorized");

      const addresses = addressesService.getByUserID(user.id);

      res.status(200).send(addresses);
    } catch (error) {
      res.status(401).send("bad request");
    }
  });
};