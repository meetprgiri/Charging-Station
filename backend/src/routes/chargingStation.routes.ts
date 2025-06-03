import express from 'express';
import { registerChargingStation, showAllChargingStation, deleteChargingStation, updateChargingStation } from '../controllers/chargingStation.controller';

const router = express.Router();

router.post('/add', async (req, res, next) => {
    try {
      await registerChargingStation(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.get('/showAllChargingStation', async (req, res, next) => {
    try {
      await showAllChargingStation(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
router.delete('/delete/:id', async (req, res, next) => {
    try {
      await deleteChargingStation(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
router.put('/update/:id', async (req, res, next) => {
    try {
      await updateChargingStation(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;