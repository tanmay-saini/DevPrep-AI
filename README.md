# DevPrep AI — Full-Stack AI-Powered Web Development Interview Preparation Platform

A high-performance, **100% free-tier** interview intelligence workbench for computer science students and software engineers preparing for technical placements.

---

## 🌟 Core Features

1. **AI Mock Interviews (Google Gemini 3.6 Flash)**:
   - Interactive technical and behavioral simulations across 8 specialized tracks (DSA, System Design, DBMS, OOPs, OS, Computer Networks, HR/Behavioral, Full Stack General).
   - Instant rubric-based scoring (0–10), strengths analysis, missing edge cases/trade-offs, actionable placement tips, and senior engineer model answer comparisons.
   - Built-in daily rate limit protector (10 sessions/day per user) to strictly preserve free-tier quotas.

2. **Curated Question Bank (300+ Problems)**:
   - Curated syllabus covering Data Structures, System Design, Core CS, and Behavioral questions.
   - Multi-criteria filtering by category, difficulty (Easy, Medium, Hard), company tags (Google, Amazon, Microsoft, etc.), and text search.
   - Progressive hint reveals and comprehensive reference solutions.

3. **In-Browser Coding Practice (Monaco Editor & Sandboxed Runner)**:
   - Full VS Code Monaco editor instance with multi-language support (JavaScript, Python 3, C++, Java).
   - High-speed sandboxed execution engine with automated test case validation (Input vs Expected vs Actual output diffs).
   - Algorithmic Time & Space complexity analysis.

4. **AI Resume & ATS Compatibility Review**:
   - Client-side PDF text extraction via `pdfjs-dist` (100% private, zero paid OCR API fees).
   - ATS compatibility score (0–100), missing technical keywords cloud, section-by-section audit, and quantified **Google XYZ formula bullet point rewrites**.

5. **Progress Analytics & Radar Dashboard (Recharts)**:
   - Visual Engineering Competence Radar chart mapping mastery across 7 disciplines.
   - Automated weak area detector with prioritized recommendations.
   - Real-time activity timeline tracking mock sessions, code attempts, and resume audits.

6. **Systematic Dark & Light Theme System**:
   - Class-based Tailwind CSS & CSS variable architecture with persistent `localStorage` synchronization.
   - Synchronized themes across Monaco editor, Recharts charts, feedback badges, and modals.

---

## 🛠️ 100% Free-Tier Architecture

| Layer | Service / Tech | Tier | Cost |
|---|---|---|---|
| **Frontend** | React 18 (Vite) + Tailwind CSS | Open Source / Vercel | Free |
| **Backend** | Node.js + Express REST API | Open Source / Render | Free |
| **Database** | MongoDB Atlas (M0 Shared Cluster) | M0 Tier (512 MB) | Free forever |
| **AI / LLM** | Google Gemini API (`gemini-3.6-flash`) | Google AI Studio Free Tier | Free |
| **Code Runner** | Sandboxed Node VM + AI Runner | In-Process / Gemini | Free |
| **PDF Extraction** | `pdfjs-dist` | In-Browser Client-Side | Free |
| **Code Editor** | `@monaco-editor/react` | Open Source | Free |
| **Charts** | `recharts` | Open Source | Free |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed on your system.
- MongoDB Atlas connection string (`MONGODB_URI`).
- Google Gemini API key (`GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/app/apikey)).

### 1. Backend Setup
```bash
cd server
npm install
# Edit server/.env with your MONGODB_URI and GEMINI_API_KEY
npm run seed     # Seeds 30 curated starter questions into MongoDB Atlas
npm run dev      # Starts server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🌐 Production Deployment Guide

### Deploy Backend (Render):
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and set **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Any random 32-character string
   - `JWT_REFRESH_SECRET`: Any random 32-character string
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://devprep-ai.vercel.app`)

### Deploy Frontend (Vercel):
1. Create a new project on [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Configure Environment Variable:
   - `VITE_API_URL`: Your Render backend URL + `/api` (e.g. `https://devprep-backend.onrender.com/api`)
5. Click **Deploy**.

---

## 📜 API Reference

```
# Health & Status
GET    /api/health                     -> Server uptime and MongoDB connection state

# Authentication
POST   /api/auth/signup                -> Register new candidate account
POST   /api/auth/login                 -> Authenticate and obtain JWT tokens
POST   /api/auth/refresh               -> Refresh expired access token
GET    /api/auth/me                    -> Get profile & remaining daily AI quota
PUT    /api/auth/change-password       -> Update password

# Question Bank
GET    /api/questions                  -> Filter questions by category, difficulty, company, search
GET    /api/questions/categories       -> Get category counts
GET    /api/questions/companies        -> Get company tags
GET    /api/questions/:id              -> Get single question details
POST   /api/questions/:id/bookmark     -> Toggle question bookmark

# AI Mock Interview
POST   /api/interview/start            -> Initialize mock interview session
POST   /api/interview/answer           -> Submit answer for Gemini AI rubric scoring
POST   /api/interview/:id/finish       -> Generate final hiring manager debrief
GET    /api/interview/history          -> Get previous mock sessions

# Code Execution
POST   /api/code/run                   -> Sandboxed code runner with test case diffs

# Resume Review
POST   /api/resume/review              -> Gemini ATS audit and bullet point rewrites
GET    /api/resume/history             -> Get past resume reviews

# Dashboard Analytics
GET    /api/dashboard/stats            -> Aggregated competence, weak areas, and timeline
```

---

## 📄 License
MIT License. Built for engineering placement preparation.
