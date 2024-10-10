import { addressesService } from "../service/addresses.service.js";
import { InsertAddress, UpadteAddress } from "./dtos/addresses.dtos.js";

export const addressesRouter = (app) => {
  app.get("/addresses", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user) return res.status(403).send("unauthorized");

      const addresses = await addressesService.getByUserID(user.id);

      res.status(200).send(addresses);
    } catch (error) {
      res.status(401).send("bad request");
    }
  });
  app.post("/addresses", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user) return res.status(403).send("unauthorized");

      const {
        address_type,
        address,
        city,
        state,
        country,
        zip_code,
      } = req.body;

      await addressesService.add(new InsertAddress(
        user.id,
        address_type,
        address,
        city,
        state,
        country,
        zip_code,
      ));

      res.status(200).send("address added");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  });
  
  app.patch("/addresses/:id", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user) return res.status(403).send("unauthorized");
  
      const {id} = req.params;
      const {
        address_type,
        address,
        city,
        state,
        country,
        zip_code
      } = req.body;
  
      await addressesService.updateByID(new UpadteAddress(
        id,
        user.id,
        address_type,
        address,
        city,
        state,
        country,
        zip_code,
      ));
      res.status(200).send("address updated");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  });
};