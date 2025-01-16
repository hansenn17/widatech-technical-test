import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: string = process.env.PORT ?? "3000";
app.listen(port, () => {
  console.info("app running on port", port);
});

export default app;
