import express, { Express } from "express";
import dotenv from "dotenv";

import invoiceRouter from "./routes/invoice.routes";
import { sequelize } from "./config/database.config";
import { InvoiceSchema } from "./models/invoice.model";
import { ProductSchema } from "./models/product.model";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/invoice", invoiceRouter);

const port: string = process.env.PORT ?? "3000";
app.listen(port, () => {
  console.info("app running on port", port);
});

(async () => {
  await InvoiceSchema(sequelize);
  await ProductSchema(sequelize);
  await sequelize.sync();
})();

export default app;
