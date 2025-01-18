import { v4 } from "uuid";
import xlsx, { WorkBook } from "xlsx";

import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import { createInvoiceDto } from "../dto/create-invoice.dto";
import { updateInvoiceDto } from "../dto/update-invoice.dto";
import { fetchInvoiceDto } from "../dto/fetch-invoices.dto";
import Invoice from "../models/invoice.model";
import { InvoiceRepository } from "../repository/invoice.repository";
import { CreateProductPayload } from "../common/types/create-product-payload.types";
import { ProductService } from "./product.service";

export class InvoiceService {
  private invoiceRepository: InvoiceRepository;
  private productService: ProductService;
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
    this.productService = new ProductService();
  }

  async createInvoice(
    invoiceData: CreateInvoicePayload,
    invoiceNumber?: string
  ): Promise<Invoice> {
    try {
      await createInvoiceDto.validate({ ...invoiceData });
      invoiceNumber = invoiceNumber ?? v4();
      return this.invoiceRepository.create(invoiceData, invoiceNumber);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getInvoices(
    date: string,
    size: number,
    page: number
  ): Promise<Array<Invoice>> {
    try {
      await fetchInvoiceDto.validate({ date, size, page });
      return this.invoiceRepository.findAll(date, size, page - 1);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateInvoice(
    invoiceNumber: string,
    invoiceData: UpdateInvoicePayload
  ): Promise<Invoice> {
    try {
      console.log(invoiceNumber);
      const invoice: Invoice | null =
        await this.invoiceRepository.findByInvoiceNumber(invoiceNumber);

      if (!invoice) {
        throw new Error("invoice not found");
      } else {
        await updateInvoiceDto.validate({ ...invoiceData });
        return this.invoiceRepository.update(invoice, invoiceData);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteInvoice(invoiceNumber: string): Promise<number> {
    try {
      return this.invoiceRepository.delete(invoiceNumber);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getInvoiceByInvoiceNumber(
    invoiceNumber: string
  ): Promise<Invoice | null> {
    try {
      return this.invoiceRepository.findByInvoiceNumber(invoiceNumber);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async processUploadedInvoiceSheet(filePath: string): Promise<Array<Invoice>> {
    const workbook: WorkBook = xlsx.readFile(filePath, { raw: true });

    const [invoiceSheetName, productSheetName] = workbook.SheetNames;
    const invoiceSheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[invoiceSheetName],
      {
        raw: false,
      }
    );
    const productSheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[productSheetName]
    );

    const parsedInvoiceData: Array<CreateInvoicePayload> = this.mapKeys(
      invoiceSheetData
    ) as unknown as Array<CreateInvoicePayload>;
    const parsedProductData: Array<CreateProductPayload> = this.mapKeys(
      productSheetData
    ) as unknown as Array<CreateProductPayload>;

    const processedInvoices: Array<Invoice> = [];
    for (const invoiceData of parsedInvoiceData) {
      const invoice: Invoice | null = await this.getInvoiceByInvoiceNumber(
        String(invoiceData.invoiceNumber ?? "")
      );
      if (!invoice) {
        const processedInvoice = await this.createInvoice(
          invoiceData,
          invoiceData.invoiceNumber
        );
        processedInvoices.push(processedInvoice);
      }
    }

    for (const product of parsedProductData) {
      const invoice: Invoice | null = await this.getInvoiceByInvoiceNumber(
        String(product.invoiceNumber ?? "")
      );
      if (invoice) {
        await this.productService.createProduct(product, invoice.invoiceNumber);
      }
    }

    return processedInvoices;
  }

  private mapKeys(data: Array<any>) {
    return data.map((row) => ({
      invoiceNumber: row["invoice no"] || row["Invoice no"] || "",
      date: row["date"] || "",
      customerName: row["customer"] || "",
      salesPersonName: row["salesperson"] || "",
      paymentType: row["payment type"] || "",
      notes: row["notes"] || "",
      itemName: row["item"] || "",
      quantity: row["quantity"] || "",
      totalCostOfGoodsSold: row["total cogs"] || "",
      totalPriceSold: row["total price"] || "",
    }));
  }
}
