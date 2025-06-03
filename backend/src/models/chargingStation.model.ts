import mongoose from 'mongoose';

const chargingStationSchema = new mongoose.Schema({
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

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema); 

export default ChargingStation;
