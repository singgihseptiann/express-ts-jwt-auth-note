import { Request, Response } from "express";
import authService from "../services/auth.service";

const authController = {
  registerController: async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const registerUser = await authService.register(userData);
      res.status(201).json(registerUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  loginController: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userLogin = await authService.login(email, password);
      res.status(200).json(userLogin);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default authController;
