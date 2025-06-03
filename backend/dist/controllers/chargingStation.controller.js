"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChargingStation = exports.deleteChargingStation = exports.showAllChargingStation = exports.registerChargingStation = void 0;
const chargingStation_model_1 = __importDefault(require("../models/chargingStation.model"));
const registerChargingStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, status, powerOutput, connectorType } = req.body;
    try {
        const existingStation = yield chargingStation_model_1.default.findOne({ location });
        if (existingStation) {
            return res.status(400).json({ message: 'Charging Station already registered.' });
        }
        const newChargingStation = new chargingStation_model_1.default({ name, location, status, powerOutput, connectorType });
        yield newChargingStation.save();
        return res.status(201).json({ message: 'Charging Station registered successfully.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
});
exports.registerChargingStation = registerChargingStation;
const showAllChargingStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all charging stations from the database
        const chargingStations = yield chargingStation_model_1.default.find();
        // If no charging stations exist, return a 404 error
        if (!chargingStations.length) {
            return res.status(404).json({ message: "No charging stations found" });
        }
        // Send the charging stations as the response
        return res.json(chargingStations);
    }
    catch (error) {
        // Handle potential errors (e.g., DB connection issues)
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.showAllChargingStation = showAllChargingStation;
const deleteChargingStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedStation = yield chargingStation_model_1.default.findByIdAndDelete(id);
        if (!deletedStation) {
            return res.status(404).json({ message: 'Charging Station not found.' });
        }
        return res.status(200).json({ message: 'Charging Station deleted successfully.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
});
exports.deleteChargingStation = deleteChargingStation;
const updateChargingStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, location, status, powerOutput, connectorType } = req.body;
    try {
        const updatedStation = yield chargingStation_model_1.default.findByIdAndUpdate(id, { name, location, status, powerOutput, connectorType }, { new: true, runValidators: true });
        if (!updatedStation) {
            return res.status(404).json({ message: 'Charging Station not found.' });
        }
        return res.status(200).json({ message: 'Charging Station updated successfully.', data: updatedStation });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
});
exports.updateChargingStation = updateChargingStation;
