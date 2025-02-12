import Router from "express";
import { isAuth } from "../middleware/isAuthMiddleware.js";
import { createBarCharts, getEntry, deleteEntry } from "../controllers/barCharts.js";


const router = Router();

router.post("/createBarCharts", isAuth, createBarCharts);

router.get("", getEntry);

router.post("/delete", deleteEntry);

export default router;