import { RequestHandler } from "express";
import { HouseModel } from "../models/house";
import { calculateRisk } from "../util/functions";
import { Op } from "sequelize";

/**
 * Controller for the POST /api/houses route, creating a new house in the database.
 * Receives the address, current value and loan amount from the user's input, and automatically
 * calculates the risk based on the received. Returns an error if a house with the given address
 * already exists.
 */
export const createHouse: RequestHandler = async (req, res) => {
  try {
    const { address, currentValue, loanAmount }: HouseModel = req.body;
    if (!address || !currentValue || !loanAmount) {
      return res
        .status(400)
        .json({ msg: "Please fill in all the required fields" });
    }
    const existingHouse = await HouseModel.findOne({ where: { address } });
    if (existingHouse) {
      return res
        .status(400)
        .json({ msg: "A house with that address already exists" });
    }
    const risk = calculateRisk(currentValue, loanAmount);
    const house = await HouseModel.create({
      address,
      currentValue,
      loanAmount,
      risk
    });
    res.status(201).json(house);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Controller for the PUT /api/houses/:id route, receiving a house ID as a parameter and
 * retrieving the house with that ID from the database, or returning a 404 error if a nouse
 * with that ID doesn't exist.
 */
export const getHouseById: RequestHandler = async (req, res) => {
  try {
    const { id: houseId } = req.params;
    const house = await HouseModel.findByPk(houseId);
    if (!house) {
      return res.status(404).json({ msg: "House not found", houseId });
    }
    res.json(house);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Controller for the PUT /api/houses/:id route, updating an existing house in the database
 * with the given ID, and re-calculating the risk based on the user's input. Returns a 404 error
 * if a house with the given ID is not found. Returns an error if a different house with the given
 * address already exists.
 */
export const updateHouse: RequestHandler = async (req, res) => {
  try {
    const { id: houseId } = req.params;
    const house = await HouseModel.findByPk(houseId);
    if (!house) {
      return res.status(404).json({ msg: "House not found", houseId });
    }
    const { address, currentValue, loanAmount }: HouseModel = req.body;
    if (!address || !currentValue || !loanAmount) {
      return res
        .status(400)
        .json({ msg: "Please fill in all the required fields" });
    }
    const existingHouse = await HouseModel.findOne({
      where: { address, id: { [Op.not]: houseId } }
    });
    if (existingHouse) {
      return res
        .status(400)
        .json({ msg: "A different house with that address already exists" });
    }
    const risk = calculateRisk(currentValue, loanAmount);
    house.address = address;
    house.currentValue = currentValue;
    house.loanAmount = loanAmount;
    house.risk = risk;
    await house.save();
    res.json(house);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
