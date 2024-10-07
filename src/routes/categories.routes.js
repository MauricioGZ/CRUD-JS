import { categoriesService } from "../service/categories.service.js";

export const categoriesRouter = (app) => {
  app.get("/categories", async (req, res) => {
    try {
      const categories = await categoriesService.getAll();

      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send("internal server error ");
    }
  });
};