import express, { Router, Request, Response } from "express";

import { InvoiceController } from "../controller/invoice.controller";
import multerConfig from "../config/multer.config";

const router: Router = express.Router();
const invoiceController = new InvoiceController();

router.post("/", async (req: Request, res: Response) => {
  await invoiceController.createInvoice(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  await invoiceController.getInvoices(req, res);
});

router.put("/:invoiceNumber", async (req: Request, res: Response) => {
  await invoiceController.updateInvoice(req, res);
});

router.delete("/:invoiceNumber", async (req: Request, res: Response) => {
  await invoiceController.deleteInvoice(req, res);
});

router.post(
  "/upload",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    await invoiceController.uploadInvoice(req, res);
  }
);

export default router;
