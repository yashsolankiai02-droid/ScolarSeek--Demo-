# 🎓 ScholarSeek - Scholarship Discovery Website

> Production-Ready Full-Stack Scholarship Matching Platform tailored for Indian students across 8 distinct sectors with universal and sector-specific dynamic criteria.

---

## 👥 6-Person Team Roles & Code Distribution

| Role | Responsibility | Key Files Owned | Git Branch |
| :--- | :--- | :--- | :--- |
| **1. Product Manager** | Project timeline, team coordination, bug tracking, demo presentation | `README.md`, `TEAM_DISTRIBUTION.md`, Project Board | `main` |
| **2. Frontend Dev 1** | Application architecture, React Router v6, page logic, state management & API integration | `client/src/App.jsx`, `pages/Home.jsx`, `Search.jsx`, `Results.jsx`, `Details.jsx`, `Admin.jsx` | `feature/frontend-logic` |
| **3. Frontend Dev 2** | UI/UX styling, Tailwind CSS, responsive layouts, components & animations | `client/src/components/*` (Navbar, FilterForm, ScholarshipCard, Footer), `index.css`, `tailwind.config.js` | `feature/frontend-ui` |
| **4. Backend Dev** | Express.js server, REST API routes, MongoDB Atlas connection, multi-sector search matching algorithm | `server/server.js`, `server/config/db.js`, `server/models/Scholarship.js`, `server/routes/*` | `feature/backend-api` |
| **5. UI/UX Designer** | Color palette, design system, typography guidelines (Outfit & Inter fonts), user flow mockups | Design system documentation, Figma specs | `feature/design-assets` |
| **6. Data Collector** | Scraping & organizing verified scholarship data across 8 sectors into MongoDB Atlas | `server/seedData.js`, `server/seedScript.js` | `feature/data-seeding` |

---

## ⚡ Tech Stack

- **Frontend**: React 18, React Router v6, Tailwind CSS v3, Lucide Icons, Axios, Vite
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose ODM)
- **Database**: MongoDB Atlas Cloud (`scolarseek.mugfafz.mongodb.net`)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install --prefix server
npm install --prefix client
```

### 2. Configure Environment Variables
Copy `config.env` or create `.env` in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://scolarseek_db_user:EuPMvAhGA2qZHCHI@scolarseek.mugfafz.mongodb.net/scholarseek?retryWrites=true&w=majority
ADMIN_KEY=admin123
```

### 3. Run Development Servers
```bash
# Run both Backend API (Port 5000) & Frontend App (Port 5173) concurrently
npm run dev
```

### 4. Seed MongoDB Database (Optional)
```bash
npm run seed
```

---

## 🌟 Pages Included

1. **Home Page (`/`)**: Hero section, 8 sector cards showcase, metrics, key features & CTA.
2. **Search Page (`/search`)**: Interactive universal & conditional sector filter controls.
3. **Results Page (`/results`)**: Grid of matching scholarships, active filter tags, grant sorting (High to Low / Deadline), loading skeleton & empty state.
4. **Details Page (`/scholarship/:id`)**: Full scholarship requirements breakdown, annual amount in ₹, share link & official application portal button.
5. **Protected Admin Form (`/admin`)**: Secure form to insert new scholarships directly into live MongoDB Atlas (Passcode protected).
