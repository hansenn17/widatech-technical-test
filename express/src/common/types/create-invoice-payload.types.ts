import { PaymentType } from "./payment-type.types";
import { CreateProductPayload } from "./create-product-payload.types";

export type CreateInvoicePayload = {
  invoiceNumber?: string;
  date: Date;
  customerName: string;
  salesPersonName: string;
  paymentType: PaymentType;
  notes?: string;
  listOfProductsSold: Array<CreateProductPayload>;
};
