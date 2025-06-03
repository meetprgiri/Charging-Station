import { Router } from 'express';

const router = Router();

const dummyData = [
  {
    name: "Downtown EV Station",
    location: { lat: 37.7749, lng: -122.4194 },
    status: "Active",
    powerOutput: 50,
    connectorType: "Type 2"
  },
  {
    name: "Airport Fast Charger",
    location: { lat: 33.9416, lng: -118.4085 },
    status: "Active",
    powerOutput: 120,
    connectorType: "CCS"
  }
  // add more if needed
];

router.get('/getdata', (_req, res) => {
  res.json(dummyData);
});

export default router;
