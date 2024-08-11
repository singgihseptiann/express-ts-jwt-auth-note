"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
if (!JWT_SECRET || !JWT_REFRESH_SECRET || !JWT_EXPIRES_IN || !JWT_REFRESH_EXPIRES_IN) {
    throw new Error("JWT environment variables are not properly set.");
}
const authService = {
    register: async (userData) => {
        try {
            // Hash password sebelum menyimpan
            const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
            userData.password = hashedPassword;
            // Simpan pengguna ke database
            const newUser = await auth_repository_1.default.saveUser(userData);
            // Kembalikan data pengguna baru (tanpa password)
            const { password, ...userWithoutPassword } = newUser.toObject();
            return userWithoutPassword;
        }
        catch (error) {
            console.error(`Error registering user: ${error}`);
            throw new Error(`Error registering user: ${error}`);
        }
    },
    login: async (email, password) => {
        try {
            // Cari pengguna berdasarkan email
            const user = await auth_repository_1.default.findUserByEmail(email);
            // Validasi email
            if (!user) {
                throw new Error("User not found");
            }
            // Cek password
            const isMatch = await bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            // Buat token JWT
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
            // Perbarui refresh token pengguna di database
            await auth_repository_1.default.updateRefreshToken(user._id.toString(), refreshToken);
            return { token, refreshToken };
        }
        catch (error) {
            console.error(`Error logging in: ${error}`);
            throw new Error(`Error logging in: ${error}`);
        }
    },
};
exports.default = authService;
