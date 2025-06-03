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
const express_1 = __importDefault(require("express"));
const chargingStation_controller_1 = require("../controllers/chargingStation.controller");
const router = express_1.default.Router();
router.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, chargingStation_controller_1.registerChargingStation)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.get('/showAllChargingStation', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, chargingStation_controller_1.showAllChargingStation)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.delete('/delete/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, chargingStation_controller_1.deleteChargingStation)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
router.put('/update/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, chargingStation_controller_1.updateChargingStation)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
exports.default = router;
