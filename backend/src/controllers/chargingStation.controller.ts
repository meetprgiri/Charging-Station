import { Request, Response } from "express";
import ChargingStation from "../models/chargingStation.model";

export const registerChargingStation = async (req: Request, res: Response): Promise<Response> => {
    const { name, location, status, powerOutput, connectorType } = req.body;
  
    try {
      const existingStation = await ChargingStation.findOne({ location });
      if (existingStation) {
        return res.status(400).json({ message: 'Charging Station already registered.' });
      }
  
      const newChargingStation = new ChargingStation({ name, location, status, powerOutput, connectorType});
      await newChargingStation.save();
  
      return res.status(201).json({ message: 'Charging Station registered successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error.' });
    }
  };

export const showAllChargingStation = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Fetch all charging stations from the database
      const chargingStations = await ChargingStation.find();
      
      // If no charging stations exist, return a 404 error
      if (!chargingStations.length) {
        return res.status(404).json({ message: "No charging stations found" });
      }
      
      // Send the charging stations as the response
      return res.json(chargingStations);
    } catch (error) {
      // Handle potential errors (e.g., DB connection issues)
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  export const deleteChargingStation = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
  
    try {
      const deletedStation = await ChargingStation.findByIdAndDelete(id);
  
      if (!deletedStation) {
        return res.status(404).json({ message: 'Charging Station not found.' });
      }
  
      return res.status(200).json({ message: 'Charging Station deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  

  export const updateChargingStation = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, location, status, powerOutput, connectorType } = req.body;
  
    try {
      const updatedStation = await ChargingStation.findByIdAndUpdate(
        id,
        { name, location, status, powerOutput, connectorType },
        { new: true, runValidators: true }
      );
  
      if (!updatedStation) {
        return res.status(404).json({ message: 'Charging Station not found.' });
      }
  
      return res.status(200).json({ message: 'Charging Station updated successfully.', data: updatedStation });
    } catch (error) {
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  