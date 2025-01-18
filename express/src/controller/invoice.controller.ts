import { Request, Response } from "express";

import { ApiResponse } from "../common/model/api-response.model";
import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import Invoice from "../models/invoice.model";
import { InvoiceService } from "../service/invoice.service";
import { ProductService } from "../service/product.service";

export class InvoiceController {
  private invoiceService: InvoiceService;
  private productService: ProductService;
  constructor() {
    this.invoiceService = new InvoiceService();
    this.productService = new ProductService();
  }

  async createInvoice(req: Request, res: Response) {
    try {
      const payload: CreateInvoicePayload = req.body as CreateInvoicePayload;
      const result: Invoice = await this.invoiceService.createInvoice(payload);
      return res.json(ApiResponse.success(result, "success creating invoice"));
    } catch (error) {
      return res
        .status(400)
        .json(ApiResponse.error("failed creating invoice", error.message));
    }
  }

  async getInvoices(req: Request, res: Response) {
    try {
      const { date, size, page } = req.query;
      const result: Array<Invoice> = await this.invoiceService.getInvoices(
        String(date),
        Number(size),
        Number(page)
      );
      return res.json(ApiResponse.success(result, "success fetching invoices"));
    } catch (error) {
      return res
        .status(400)
        .json(ApiResponse.error("failed fetching invoices", error.message));
    }
  }

  async updateInvoice(req: Request, res: Response) {
    try {
      const invoiceNumber: string = req.params.invoiceNumber;
      const payload: UpdateInvoicePayload = req.body as UpdateInvoicePayload;
      const result: Invoice = await this.invoiceService.updateInvoice(
        invoiceNumber,
        payload
      );
      return res.json(ApiResponse.success(result, "success updating invoice"));
    } catch (error) {
      return res
        .status(400)
        .json(ApiResponse.error("failed updating invoice", error.message));
    }
  }

  async deleteInvoice(req: Request, res: Response) {
    try {
      const invoiceNumber: string = req.params.invoiceNumber;
      const result: number = await this.invoiceService.deleteInvoice(
        invoiceNumber
      );
      if (result === 0) {
        return res
          .status(404)
          .json(
            ApiResponse.error("failed deleting invoice", "no invoice found")
          );
      }
      return res.json(ApiResponse.success(result, "success deleting invoice"));
    } catch (error) {
      return res
        .status(400)
        .json(ApiResponse.error("failed deleting invoice", error.message));
    }
  }

  async uploadInvoice(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json(
            ApiResponse.error(
              "failed uploading invoice",
              "no file uploaded or invalid file format"
            )
          );
      }
      const filePath: string = req.file.path;
      const processedInvoices: Array<Invoice> =
        await this.invoiceService.processUploadedInvoiceSheet(filePath);

      return res.json(
        ApiResponse.success(processedInvoices, "file processed successfully")
      );
    } catch (error) {
      return res
        .status(500)
        .json(ApiResponse.error("failed uploading invoice", error.message));
    }
  }
}
