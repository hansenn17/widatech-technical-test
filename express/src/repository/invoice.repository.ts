import { Sequelize, Transaction } from "sequelize";

import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import { sequelize } from "../config/database.config";
import { updateInvoiceDto } from "../dto/update-invoice.dto";
import Invoice from "../models/invoice.model";
import Product from "../models/product.model";
import { ProductRepository } from "./product.repository";

interface IInvoiceRepository {
  create(
    invoiceData: CreateInvoicePayload,
    invoiceNumber: string
  ): Promise<Invoice>;
  findAll(date: string, size: number, page: number): Promise<Array<Invoice>>;
  update(invoice: Invoice, invoiceData: UpdateInvoicePayload): Promise<Invoice>;
  delete(invoiceNumber: string): Promise<number>;
}

export class InvoiceRepository implements IInvoiceRepository {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(
    invoiceData: CreateInvoicePayload,
    invoiceNumber: string
  ): Promise<Invoice> {
    const transaction: Transaction = await sequelize.transaction();
    try {
      const invoiceCreationResult: Invoice = await Invoice.create(
        {
          ...invoiceData,
          invoiceNumber,
        },
        { transaction }
      );

      if (invoiceData.listOfProductsSold?.length > 0) {
        const products: Array<Product> = [];
        for (let product of invoiceData.listOfProductsSold) {
          const productResult: Product = await this.productRepository.create(
            product,
            invoiceNumber,
            transaction
          );

          products.push(productResult);
        }
        invoiceCreationResult.dataValues.listOfProductsSold = products;
      }

      await transaction.commit();
      return invoiceCreationResult;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error.message);
    }
  }

  async findAll(
    date: string,
    size: number,
    page: number
  ): Promise<Array<Invoice>> {
    try {
      const rawInvoices = await sequelize.query(
        `
          SELECT i.invoice_number AS invoiceNumber, i.date AS date, i.customer_name AS customerName, i.sales_person_name AS salesPersonName,
          i.payment_type AS paymentType, i.notes AS notes, p.item_name AS itemName, p.quantity AS quantity,
          p.total_cost_of_goods_sold AS totalCostOfGoodsSold, p.total_price_sold AS totalPriceSold,
          (p.total_price_sold - p.total_cost_of_goods_sold) AS profit
          FROM invoices i INNER JOIN products p ON i.invoice_number = p.invoice_number
          WHERE date = ? ORDER BY invoiceNumber LIMIT ${size} OFFSET ${page};
        `,
        {
          replacements: [date],
        }
      );
      const result: Array<Invoice> = this.groupResult(
        rawInvoices[0]
      ) as unknown as Array<Invoice>;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  groupResult(results: Array<any>): Array<any> {
    const grouped: any = {};

    results.forEach((row) => {
      const invoiceNumber = row.invoicenumber;

      if (!grouped[invoiceNumber]) {
        grouped[invoiceNumber] = {
          invoiceNumber,
          date: row["date"],
          customerName: row["customername"],
          salesPersonName: row["salespersonname"],
          paymentType: row["paymenttype"],
          notes: row["notes"],
          listOfProductsSold: [],
        };
      }

      grouped[invoiceNumber].listOfProductsSold.push({
        itemName: row["itemname"],
        quantity: row["quantity"],
        totalCostOfGoodsSold: row["totalcostofgoodssold"],
        totalPriceSold: row["totalpricesold"],
        profit: row["profit"],
      });
    });

    return Object.values(grouped);
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
      const invoice = await this.findByInvoiceNumber(invoiceNumber);
      if (invoice) {
        await invoice.destroy();
        return 1;
      }
      return 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
