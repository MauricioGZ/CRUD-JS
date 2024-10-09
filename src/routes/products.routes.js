import { productsService } from "../service/products.service.js";
import { InsertProduct, UpdateProduct } from "./dtos/products.dtos.js";

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
      const id = req.params.id;
      const product = await productsService.getByID(parseInt(id));
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send("internal server error ");
    }
  });

  app.post("/products", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user || (user.roleId !== 1)) return res.status(403).send("unauthorized");

      const {
        name,
        description,
        price,
        stock,
        category_id,
        image,
      } = req.body;

      await productsService.add(new InsertProduct(
        name,
        description,
        price,
        stock,
        category_id,
        image
      ));
      
      res.status(200).send("product added");
    } catch {
      res.status(500).send("internal server error");
    }
  });

  app.patch("/products/:id", async (req, res) => {
    try {
      const {user} = req.session;
      if (!user || (user.roleId !== 1)) return res.status(403).send("unauthorized");

      const {
        name,
        description,
        price,
        stock,
        category_id,
        image,
      } = req.body;

      const id = req.params.id;

      await productsService.updateByID(new UpdateProduct(
        parseInt(id),
        name,
        description,
        price,
        stock,
        category_id,
        image,
      )
      );
      res.status(200).send("product updated");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  });
};