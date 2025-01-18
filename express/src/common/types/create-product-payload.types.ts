export type CreateProductPayload = {
  itemName: string;
  quantity: number;
  totalCostOfGoodsSold: number;
  totalPriceSold: number;
  invoiceNumber?: string;
};
