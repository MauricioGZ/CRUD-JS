import app from './app.js';

const main = async () => {
  app.listen(app.get("port"));
  console.log(`server listening on port ${app.get("port")}`);
};

main();