import Product from "../../models/product.model";
import { PaymentType } from "./payment-type.types";

export type CreateInvoicePayload = {
  date: Date;
  customerName: string;
  salesPersonName: string;
  paymentType: PaymentType;
  notes?: string;
  listOfProductsSold?: Array<Product>;
};
