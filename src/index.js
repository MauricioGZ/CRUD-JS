import app from './app.js';
import { products } from './repository/products.repository.js';

const main = async () => {
  const product = await products.getByID(1);
  console.log(product);
  app.listen(app.get("port"));
  console.log(`server listening on port ${app.get("port")}`);
};

main();