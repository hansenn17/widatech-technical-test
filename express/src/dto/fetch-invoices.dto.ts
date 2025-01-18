import * as yup from "yup";

import { FetchInvoiceQueryParams } from "../common/types/fetch-invoices-query-params.types";

export const fetchInvoiceDto = yup.object<FetchInvoiceQueryParams>({
  date: yup.date().required(),
  page: yup.number().required().min(1),
  size: yup.number().required().min(0),
});
