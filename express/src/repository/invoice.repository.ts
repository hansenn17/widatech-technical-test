import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import { updateInvoiceDto } from "../dto/update-invoice.dto";
import Invoice from "../models/invoice.model";

interface IInvoiceRepository {
  create(invoiceData: CreateInvoicePayload): Promise<Invoice>;
  findAll(date: string, size: number, page: number): Promise<Array<Invoice>>;
  update(invoice: Invoice, invoiceData: UpdateInvoicePayload): Promise<Invoice>;
  delete(invoiceNumber: string): Promise<number>;
}

export class InvoiceRepository implements IInvoiceRepository {
  async create(invoiceData: CreateInvoicePayload): Promise<Invoice> {
    try {
      const result: Invoice = await Invoice.create({ ...invoiceData });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(
    date: string,
    size: number,
    page: number
  ): Promise<Array<Invoice>> {
    try {
      console.log("result", date, size, page);
      const result: Array<Invoice> = await Invoice.findAll({
        where: {
          date,
        },
        offset: page,
        limit: size,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    try {
      const invoice: Invoice | null = await Invoice.findByPk(invoiceNumber);
      return invoice;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(
    invoice: Invoice,
    invoiceData: UpdateInvoicePayload
  ): Promise<Invoice> {
    try {
      await updateInvoiceDto.validate({ ...invoiceData });
      invoice.update({ ...invoiceData });
      return invoice;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(invoiceNumber: string): Promise<number> {
    try {
      return Invoice.destroy({
        where: {
          invoiceNumber,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
