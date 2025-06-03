import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import cstationRoutes from './routes/chargingStation.routes'

dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chargingStation', cstationRoutes);



mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB error:', err));

export default app;
