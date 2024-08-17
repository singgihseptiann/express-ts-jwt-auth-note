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

  getUserController: async (req: Request, res: Response) => {
    try {
      console.log(`Fetching user with ID: ${req.params.id}`); // Tambahkan logging
      const userId = req.params.id;
      const user = await authService.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error getting user: ${error}`); // Tambahkan logging
      res.status(500).json({ message: error });
    }
  },
};

export default authController;
