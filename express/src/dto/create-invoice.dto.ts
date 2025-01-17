import * as yup from "yup";

import { CreateInvoicePayload } from "../common/types/create-invoice-payload.types";
import { PaymentType } from "../common/types/payment-type.types";

export const createInvoiceDto = yup.object<CreateInvoicePayload>({
  date: yup.date().required(),
  customerName: yup.string().required().min(2),
  salesPersonName: yup.string().required().min(2),
  paymentType: yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)),
  notes: yup.string(),
  productsSold: yup.string(),
});
