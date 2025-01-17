import { DataTypes, Model, Sequelize } from "sequelize";
import Invoice from "./invoice.model";

export default class Product extends Model {
  public id!: string;
  public itemName!: string;
  public quantity!: number;
  public totalCostOfGoodsSold!: number;
  public totalPriceSold!: number;
}

export const ProductSchema = async (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      invoice_number: {
        type: DataTypes.INTEGER,
        field: "invoice_number",
        references: {
          model: "invoices",
          key: "invoice_number",
        },
      },
      itemName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "item_name",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalCostOfGoodsSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "total_cost_of_goods_sold",
      },
      totalPriceSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "total_price_sold",
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
    }
  );
  await Product.sync();
  Product.belongsTo(Invoice, {
    foreignKey: "invoice_number",
    as: "invoices",
  });
};
