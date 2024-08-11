"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // Tambahkan ini untuk mengelola cookies
mongoose_1.default
    .connect(process.env.MONGO_URI || "", {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
app.use("/api/v1", notes_routes_1.default);
app.use("/api/v1/auth", auth_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
