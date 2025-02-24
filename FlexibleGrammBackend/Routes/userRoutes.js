import Router from "express";
import { createAccount } from "../controllers/userController.js";
import { loginAction } from "../controllers/userController.js";
import { loginValidation, userValidation,} from "../middleware/userMiddleware.js";

const router = Router();

router.post("/register", userValidation ,  createAccount);

router.post("/login", loginValidation , loginAction);

export default router;