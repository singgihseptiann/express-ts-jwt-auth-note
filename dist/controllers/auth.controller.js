"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const authController = {
    registerController: async (req, res) => {
        try {
            const userData = req.body;
            const registerUser = await auth_service_1.default.register(userData);
            res.status(201).json(registerUser);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
    loginController: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userLogin = await auth_service_1.default.login(email, password);
            res.status(200).json(userLogin);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    },
};
exports.default = authController;
