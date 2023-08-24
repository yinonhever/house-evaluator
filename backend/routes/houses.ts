import { Router } from "express";
import { createHouse, getHouseById, updateHouse } from "../controllers/houses";

const router = Router();

router.post("/", createHouse);
router.get("/:id", getHouseById);
router.put("/:id", updateHouse);

export default router;
