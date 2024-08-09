// src/repositories/auth.repository.ts
import userModel from "../models/user.model";

const authRepository = {
  findUserByEmail: async (email: string) => {
    try {
      const findUser = await userModel.findOne({ email });
      return findUser;
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  },

  saveUser: async (user: any) => {
    try {
      const newUser = new userModel(user); // Create an instance of userModel
      const saveUser = await newUser.save(); // Save the instance
      return saveUser;
    } catch (error) {
      throw new Error(`Error saving user: ${error}`);
    }
  },

  findUserById: async (id: string) => {
    try {
      const findUserById = await userModel.findById(id);
      return findUserById;
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  },

  updateRefreshToken: async (id: string, refreshToken: string) => {
    try {
      const updateRefreshToken = await userModel.findByIdAndUpdate(id, { refreshToken }, { new: true });
      return updateRefreshToken;
    } catch (error) {
      throw new Error(`Error updating refresh token: ${error}`);
    }
  },
};

export default authRepository;
