"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const chargingStation_routes_1 = __importDefault(require("./routes/chargingStation.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/chargingStation', chargingStation_routes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.error('MongoDB error:', err));
exports.default = app;
