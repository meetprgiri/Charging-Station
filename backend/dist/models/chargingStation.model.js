"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chargingStationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    powerOutput: { type: Number, required: true },
    powerUnit: { type: String, default: 'kW' },
    connectorType: {
        type: String,
        enum: ['CCS', 'CHAdeMO', 'Type2'],
        required: true
    }
});
const ChargingStation = mongoose_1.default.model('ChargingStation', chargingStationSchema);
exports.default = ChargingStation;
