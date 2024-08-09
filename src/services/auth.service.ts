import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../models/user.model";
import authRepository from "../repositories/auth.repository";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

if (!JWT_SECRET || !JWT_REFRESH_SECRET || !JWT_EXPIRES_IN || !JWT_REFRESH_EXPIRES_IN) {
  throw new Error("JWT environment variables are not properly set.");
}

const authService = {
  register: async (userData: IUser) => {
    try {
      // Hash password sebelum menyimpan
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      // Simpan pengguna ke database
      const newUser = await authRepository.saveUser(userData);

      // Kembalikan data pengguna baru (tanpa password)
      const { password, ...userWithoutPassword } = newUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      throw new Error(`Error registering user: ${error}`);
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Cari pengguna berdasarkan email
      const user = await authRepository.findUserByEmail(email);

      // Validasi email
      if (!user) {
        throw new Error("User not found");
      }

      // Cek password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      // Buat token JWT
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

      // Perbarui refresh token pengguna di database
      await authRepository.updateRefreshToken(user._id.toString(), refreshToken);
      return { token, refreshToken };
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      throw new Error(`Error logging in: ${error}`);
    }
  },
};

export default authService;
