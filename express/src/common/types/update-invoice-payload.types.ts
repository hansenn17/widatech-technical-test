import { PaymentType } from "./payment-type.types";

export type UpdateInvoicePayload = {
  date: Date;
  customerName: string;
  salesPersonName: string;
  paymentType: PaymentType;
  notes?: string;
};
