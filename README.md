# ⚡ Charging Station

A full-stack web application to manage EV charging stations with authentication, filtering, map views, and REST API support.

---

## 🛠 Tech Stack

### 🔧 Backend

- Node.js + Express
- TypeScript
- MongoDB
- JWT for Authentication
- Hosted on **Render**

### 🎨 Frontend

- Vue.js + Vite + TypeScript
- Google Maps / OpenStreetMap
- Hosted on **Vercel**

---

## 📁 Project Structure

project-root/
├── backend/
│ ├── dist/ # Compiled JS
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── config/
│ │ └── utils/
│ ├── .env
│ ├── tsconfig.json
│ └── package.json
├── frontend/
│ └── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── plugins/
│ └── router/
├── README.md

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [charging-station-2025.vercel.app](https://charging-station-2025.vercel.app/login)
- **Backend (Render)**: [charging-station-dglu.onrender.com](https://charging-station-dglu.onrender.com)
- **Postman Collection**: -

---

## ⚙️ Setup Instructions

1️⃣ Clone the Repository

```bash
git clone https://github.com/meetprgiri/Charging-Station
cd Charging-Station

2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in /backend with the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
To run the backend:

bash
Copy
Edit
npm run dev      # for development
npm run build    # compile to /dist

3️⃣ Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Create a .env file in /frontend with the following:

env
Copy
Edit
AUTH_URL=http://localhost:5000/api/auth          # or deployed URL
CHARGINGSTATION_URL=http://localhost:5000/api/chargingStation  # or deployed URL
GOOGLE_API=your_google_maps_api_key

🔒 Authentication Routes
Register: POST /api/auth/register

Login: POST /api/auth/login → Returns JWT token

Protected Routes: Add Authorization: Bearer <token> header

📍 Charging Station Schema
Each station contains the following fields:

name: Station name

location: Latitude & Longitude

status: Active / Inactive

powerOutput: in kW

connectorType: e.g., Type2, CCS

🗺️ Features
✅ User Login with JWT Auth

✅ Protected API Routes

✅ Charger Listing with Filters

✅ Map View (Google Maps or OpenStreetMap)

✅ Add / Edit / Delete Charging Stations

✅ Fully Deployed UI & API

✅ Postman Collection for Easy API Testing
```
