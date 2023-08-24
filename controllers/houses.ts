import { RequestHandler } from "express";

export const createHouse: RequestHandler = async (req, res) => {
  try {
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getHouseById: RequestHandler = async (req, res) => {
  try {
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateHouse: RequestHandler = async (req, res) => {
  try {
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
