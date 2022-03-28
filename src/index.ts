import "reflect-metadata";
import { createConnection } from "../node_modules/typeorm/index";
import { createClient } from "./client";

//Driver
const main = async () => {
  await createConnection();
  await createClient();
};
main();
