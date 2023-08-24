import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";
import { sequelize } from "../util/database";

export class HouseModal extends Model<
  InferAttributes<HouseModal>,
  InferCreationAttributes<HouseModal>
> {
  declare id: CreationOptional<number>;
  declare address: string;
  declare currentValue: number;
  declare loanAmount: number;
  declare risk: number;
}

HouseModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currentValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    risk: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  { sequelize, tableName: "houses", timestamps: true }
);
