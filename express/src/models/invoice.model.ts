import { DataTypes, Model, Sequelize } from "sequelize";
import Product from "./product.model";
import { PaymentType } from "../common/types/payment-type.types";

export default class Invoice extends Model {
  public invoiceNumber!: string;
  public date!: Date;
  public customerName!: string;
  public salesPersonName!: string;
  public paymentType!: PaymentType;
  public notes?: string;
  public listOfProductsSold?: Array<Product>;
}

export const InvoiceSchema = async (sequelize: Sequelize) => {
  Invoice.init(
    {
      invoiceNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "invoice_number",
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "customer_name",
      },
      salesPersonName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "sales_person_name",
      },
      paymentType: {
        type: DataTypes.ENUM(PaymentType.CASH, PaymentType.CREDIT),
        allowNull: false,
        field: "payment_type",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "invoices",
      timestamps: false,
    }
  );
  await Invoice.sync();
};
