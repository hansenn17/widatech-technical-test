import express, { Router, Request, Response } from "express";
import { InvoiceController } from "../controller/invoice.controller";
import { InvoiceSchema } from "../models/invoice.model";
import { sequelize } from "../config/database.config";

const router: Router = express.Router();
const invoiceController = new InvoiceController();

router.post("/", async (req: Request, res: Response) => {
  await invoiceController.createInvoice(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await invoiceController.getInvoices(req, res);
});

router.put("/", async (req: Request, res: Response) => {
  await invoiceController.updateInvoice(req, res);
});

router.delete("/", async (req: Request, res: Response) => {
  await invoiceController.deleteInvoice(req, res);
});

export default router;
