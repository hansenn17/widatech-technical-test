import * as yup from "yup";

import { UpdateInvoicePayload } from "../common/types/update-invoice-payload.types";
import { PaymentType } from "../common/types/payment-type.types";

export const updateInvoiceDto = yup.object<UpdateInvoicePayload>({
  date: yup.date().required(),
  customerName: yup.string().required().min(2),
  salesPersonName: yup.string().required().min(2),
  paymentType: yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)),
  notes: yup.string(),
});
