// src/routes/auth.routes.ts
import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.get("/user/:id", authController.getUserController);
export default router;
