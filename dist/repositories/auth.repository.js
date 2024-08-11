"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/auth.repository.ts
const user_model_1 = __importDefault(require("../models/user.model"));
const authRepository = {
    findUserByEmail: async (email) => {
        try {
            const findUser = await user_model_1.default.findOne({ email });
            return findUser;
        }
        catch (error) {
            throw new Error(`Error finding user: ${error}`);
        }
    },
    saveUser: async (user) => {
        try {
            const newUser = new user_model_1.default(user); // Create an instance of userModel
            const saveUser = await newUser.save(); // Save the instance
            return saveUser;
        }
        catch (error) {
            throw new Error(`Error saving user: ${error}`);
        }
    },
    findUserById: async (id) => {
        try {
            const findUserById = await user_model_1.default.findById(id);
            return findUserById;
        }
        catch (error) {
            throw new Error(`Error finding user: ${error}`);
        }
    },
    updateRefreshToken: async (id, refreshToken) => {
        try {
            const updateRefreshToken = await user_model_1.default.findByIdAndUpdate(id, { refreshToken }, { new: true });
            return updateRefreshToken;
        }
        catch (error) {
            throw new Error(`Error updating refresh token: ${error}`);
        }
    },
};
exports.default = authRepository;
