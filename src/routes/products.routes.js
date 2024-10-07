import { productsService } from "../service/products.service.js";

export const productsRouter = (app) => {
  app.get("/products", async (req, res) => {
    try {
      const {category} = req.query;
      let products;
      if (category === undefined) {
        products = await productsService.getAll();
      } else {
        products = await productsService.getByCategoryID(category);
      }

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send("internal server error ");
    }
  });

  app.get("/products/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const product = await productsService.getByID(parseInt(id));
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send("internal server error ");
    }
  });
};