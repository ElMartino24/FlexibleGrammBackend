import Router from "express";
import { isAuth } from "../middleware/isAuthMiddleware.js";
import { createFlowCharts, getEntry, deleteEntry } from "../controllers/flowCharts.js";


const router = Router();

router.post("/createFlowCharts", isAuth, createFlowCharts);

router.get("", getEntry);

router.post("/delete", deleteEntry);

export default router;