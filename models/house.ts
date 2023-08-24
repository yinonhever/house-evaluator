import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";
import { sequelize } from "../util/database";

/**
 * Initializing the house's Sequelize model, connecting to the 'houses' table in the database and
 * creating it if it doesn't exist (without altering or dropping it afterwards). The 'address' column
 * is set to be unique, to avoid duplicate houses in the table.
 */
export class HouseModel extends Model<
  InferAttributes<HouseModel>,
  InferCreationAttributes<HouseModel>
> {
  declare id: CreationOptional<number>;
  declare address: string;
  declare currentValue: number;
  declare loanAmount: number;
  declare risk: number;
}

HouseModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    currentValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    risk: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  { sequelize, tableName: "houses", timestamps: true }
).sync();
