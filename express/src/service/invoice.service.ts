import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import { createInvoiceDto } from "../dto/create-invoice.dto";
import { updateInvoiceDto } from "../dto/update-invoice.dto";
import Invoice from "../models/invoice.model";
import { InvoiceRepository } from "../repository/invoice.repository";

export class InvoiceService {
  private invoiceRepository: InvoiceRepository;
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
  }

  async createInvoice(invoiceData: CreateInvoicePayload): Promise<Invoice> {
    try {
      await createInvoiceDto.validate({ ...invoiceData });
      return this.invoiceRepository.create(invoiceData);
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
      return this.invoiceRepository.findAll(date, size, page);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateInvoice(
    invoiceNumber: string,
    invoiceData: UpdateInvoicePayload
  ): Promise<Invoice> {
    try {
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
}
