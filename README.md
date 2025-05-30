# SafeChat – Civic Tech Public Safety Chatbot

**Deploys a free, AI‐powered chatbot and community safety platform for Indianapolis residents.**

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Environment Variables](#environment-variables)  
   - [Backend Installation & Run](#backend-installation--run)  
   - [Frontend Installation & Run](#frontend-installation--run)  
5. [Routes & Data Endpoints](#routes--data-endpoints)  
6. [Folder Structure](#folder-structure)  
7. [Deployment](#deployment)  
8. [Future Improvements](#future-improvements)  
9. [License](#license)  

---

## 📝 Project Overview

SafeChat is a modern, responsive web application designed as a **public safety hub** for Indianapolis (population 870,000+). It combines:

- An **AI‐powered chatbot** (via a free ChatGPT API)  
- **Real‐time community map** to report/view incidents  
- **Local alerts, safety tips, emergency contacts**  
- **Safety check-in (“Safe Circle”)** feature for personal well-being  
- **Mental health & domestic violence resources** page  
- **Basic admin dashboard** with incident analytics  
- **Photo upload with automatic face‐blurring** (privacy‐first)  

All features rely solely on open-source/free libraries and a free MongoDB tier. No paid subscriptions are required.

---

## ✨ Key Features

1. **AI Chatbot**  
   - Detects emergency keywords (e.g., “fire,” “shooting”) and triages—prompting users to call 911 immediately.  
   - Otherwise, forwards safe queries to a free ChatGPT API.  
   - Persists every user-bot conversation in MongoDB for future reference.

2. **Interactive Community Map**  
   - Built with Leaflet + OpenStreetMap (free).  
   - Displays all community‐reported “non-emergency” incidents as map pins.  
   - Users click anywhere on the map to “report” an incident (title + optional description), which is saved in MongoDB and appears immediately.

3. **Safety Check-In (“Safe Circle”)**  
   - Users start a 30-minute timer to check in.  
   - If they don’t press “I’m Safe” within 30 minutes, a “missed check-in” is logged in MongoDB.  
   - Could be extended to notify a friend or family member.

4. **Safety Alerts (Static JSON Feed)**  
   - Displays a curated list of current city alerts (weather warnings, road closures, community meetings).  
   - Served from a static `alerts.json` file in the backend.

5. **Emergency Contacts (Static JSON Feed)**  
   - Lists key phone numbers: 911, non-emergency police/fire, poison control, crisis hotlines, 211.  
   - Served from `contacts.json` in the backend.

6. **Safety Tips (Static JSON Feed)**  
   - Provides practical, season-agnostic tips (e.g., lock doors, winter ice safety, hydration).  
   - Served from `tips.json` in the backend.

7. **Mental Health & Domestic Violence Resources**  
   - A dedicated page listing national and local hotlines (988, 1-800-799-7233, Indiana 211).  
   - Static page content with helpful links.

8. **Photo Upload & Automated Face-Blurring**  
   - Uses Multer for server-side file storage.  
   - Uses `face-api.js` (open-source) in the browser to detect faces on a hidden `<canvas>` and blur them.  
   - Uploads only the blurred image for complete privacy.

9. **Admin Dashboard (Chart.js)**  
   - Protected route displaying:  
     - Number of incidents reported in the last 7 days  
     - Total safety check-ins started vs. missed  
     - A bar chart showing daily incident counts for the past week  
   - Built with Chart.js + `react-chartjs-2`.

---

## 🛠 Tech Stack

### Backend

- **Node.js & Express** – REST API  
- **MongoDB (Mongoose)** – Data storage (free Atlas tier)  
- **Multer** – File uploads (photo storage)  
- **dotenv** – Environment variable management  
- **CORS** – Cross-origin resource sharing

### Frontend

- **Vite + React (JavaScript)** – Fast, modern build  
- **react-router-dom** – Client-side routing  
- **Leaflet + react-leaflet** – Interactive community map with OpenStreetMap  
- **face-api.js** – Browser-based face detection & blurring  
- **Axios** – HTTP requests  
- **Framer Motion** – Subtle chat message animations  
- **Chart.js + react-chartjs-2** – Admin analytics charts  
- **CSS3 & Flexbox/Grid** – Responsive, custom styling (no Tailwind)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js ≥ 16.x](https://nodejs.org/)  
- npm (comes with Node.js)  
- MongoDB Atlas free cluster (or local MongoDB)  
- (Optional) Heroku CLI / Vercel CLI for deployment  

### Environment Variables

Create a `.env` file in **backend/** with:

MONGODB_URI=<your MongoDB connection string>
RAPIDAPI_KEY=<your free-ChatGPT RapidAPI key>

### Backend Installation & Run

1. Navigate to the backend folder:
   ```bash
   cd backend

   Install dependencies:
   npm install


 Start the server (with nodemon if preferred):
   npm start

   Listens on port 5000 by default (change via PORT in .env if needed).

   Verifies connection to MongoDB and mounts all API routes.

  Frontend Installation & Run
  Open a new terminal, navigate to the frontend folder:


   cd SafeChat-frontend
   cd frontend
   Install dependencies:

  npm install
  Start the dev server:

   npm run dev
   Vite serves at http://localhost:3000 by default.

  Ensure the backend is running at http://localhost:5000.


  📡 Routes & Data Endpoints
1. Chatbot API
POST /api/chat

Body: { "message": "<user text>" }

Calls free‐ChatGPT API (RapidAPI) and returns { "reply": "<bot reply>" }.

Also saves { userMessage, botMessage, timestamp } to Conversations collection.

2. Alerts
GET /api/alerts

Returns the contents of backend/data/alerts.json (an array of alert objects).

3. Contacts
GET /api/contacts

Returns the contents of backend/data/contacts.json (an array of contact objects).

4. Tips
GET /api/tips

Returns the contents of backend/data/tips.json (an array of safety tips).

5. Incidents (Community Map)
GET /api/incidents

Returns all incident documents from MongoDB (includes title, description, location.{lat,lng} + createdAt).

POST /api/incidents

Body: { "title": "<string>", "description": "<string>", "location": { "lat": <number>, "lng": <number> } }

Saves a new incident.

6. Check-Ins
POST /api/checkin/start

Creates a new check-in session (stores startedAt in MongoDB).

POST /api/checkin/end

Body: { "id": "<checkInId>" }

Marks session as ended (endedAt = now).

GET /api/checkin/missed

Finds check-ins older than 30 minutes without endedAt, marks them missed=true, and returns them.

7. Analytics
GET /api/analytics

Returns JSON with:

recentIncidentsCount (incidents in last 7 days)

totalStarted (check-ins started in last 7 days)

totalMissed (missed check-ins in last 7 days)

dailyIncidents (object mapping YYYY-MM-DD → count)

8. File Upload
POST /api/upload

Expects multipart/form-data with field name media (an image File/Blob).

Uses Multer to save to backend/uploads/. Returns { "filename": "...", "path": "/uploads/filename" }.

Static Serve /uploads/<filename>

Serves uploaded (blurred) images publicly.

📂 Folder Structure
pgsql
Copier
Modifier
public-safety-chatbot/
├── backend/
│   ├── data/
│   │   ├── alerts.json
│   │   ├── contacts.json
│   │   └── tips.json
│   ├── models/
│   │   ├── Incident.js
│   │   ├── CheckIn.js
│   │   ├── Conversation.js
│   │   └── (any other schemas)
│   ├── routes/
│   │   ├── chat.js
│   │   ├── alerts.js
│   │   ├── contacts.js
│   │   ├── tips.js
│   │   ├── incidents.js
│   │   ├── checkin.js
│   │   ├── analytics.js
│   │   └── upload.js
│   ├── uploads/             ← (auto‐created by Multer)
│   ├── server.js
│   ├── package.json
│   └── .env
└──SafeChat-frontend
     frontend/
    ├── public/
    │   ├── index.html
    │   └── models/          ← face-api.js models (tiny_face_detector etc.)
    ├── src/
    │   ├── components/
    │   │   ├── ChatMessage.jsx
    │   │   ├── UploadButton.jsx
    │   │   └── PhotoUploadHandler.jsx
    │   ├── pages/
    │   │   ├── Chatbot.jsx
    │   │   ├── Home.jsx
    │   │   ├── Alerts.jsx
    │   │   ├── Contacts.jsx
    │   │   ├── Tips.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── MapPage.jsx
    │   │   ├── SafetyCheck.jsx
    │   │   ├── MentalHealth.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── utils/
    │   │   └── faceBlur.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── Chatbot.css
    │   ├── Alerts.css
    │   ├── Contacts.css
    │   ├── Tips.css
    │   ├── About.css
    │   ├── Contact.css
    │   ├── MapPage.css
    │   ├── SafetyCheck.css
    │   ├── MentalHealth.css
    │   ├── AdminDashboard.css
    │   └── Navbar.css
    ├── package.json
    └── vite.config.js
☁️ Deployment
Backend (Heroku / Railway / Render)
Create a new Node.js app on Heroku (or similar).

Set environment variables (MONGODB_URI, RAPIDAPI_KEY) in the Heroku dashboard.

Push your backend folder to a Git remote, then deploy.

Ensure the “uploads” folder is writeable; on Heroku, uploads are ephemeral—consider switching to a free “Cloudinary” or “AWS S3” for persistent storage if needed beyond demo.

Frontend (Vercel / Netlify)
Create a new Vercel project, point to your frontend folder.

In “Project Settings,” add environment variable VITE_API_BASE_URL=http://<your-backend-url>.

Configure vite.config.js to proxy /api to process.env.VITE_API_BASE_URL when running locally.

Push your code; Vercel will build and serve your React app.

If using path‐based URLs (e.g., /chatbot), ensure you enable “SPA rewrite” (redirect all routes to index.html).

🔭 Future Improvements
User Authentication & Profiles

Allow residents to create accounts, save preferences, and see personalized history.

Push Notifications (PWA)

Make SafeChat a Progressive Web App—push severe weather/alert notifications even when the browser is closed.

Video Upload & Blur

Extend the photo blur logic to short video clips using ffmpeg.wasm or server‐side opencv4nodejs.

Secure Admin

Add login/auth to lock down the /admin dashboard to city officials or moderators only.

Live 911 Feed Integration

If Indianapolis publishes a real‐time “calls for service” feed, integrate and map them automatically.

SMS / WhatsApp Fallback

Let high-risk or data-limited users interact via SMS or WhatsApp (Twilio / free tier).

Dark/Light Mode Toggle

Offer users an on/off switch for dark vs. light theme to improve accessibility.

Localization / Spanish Support

Add Spanish translations for multi-language support in Indianapolis.

📝 License
This project is released under the MIT License. Feel free to fork, re-use, and extend for your own civic-tech initiatives!


