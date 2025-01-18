import * as yup from "yup";

import { CreateProductPayload } from "../common/types/create-product-payload.types";

export const createProductDto = yup.object<CreateProductPayload>({
  itemName: yup.string().required().min(5),
  quantity: yup.number().required().min(1),
  totalCostOfGoodsSold: yup.number().required().min(0),
  totalPriceSold: yup.number().required().min(0),
});
