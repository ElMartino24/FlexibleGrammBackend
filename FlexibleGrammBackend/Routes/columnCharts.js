import Router from "express";
import { isAuth } from "../middleware/isAuthMiddleware.js";
import { createColumnCharts, getEntry, deleteEntry } from "../controllers/columnCharts.js";


const router = Router();

router.post("/createColumnCharts", isAuth, createColumnCharts);

router.get("", getEntry);

router.post("/delete", deleteEntry);

export default router;