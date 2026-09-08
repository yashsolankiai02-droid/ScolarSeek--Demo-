# 📋 Team Work Division & GitHub Git Strategy (6 Members)

This document defines the exact task distribution, file ownership, and Git workflow for our 6 team members.

---

## 🛠️ Git Branching Strategy

To prevent merge conflicts when 6 people work simultaneously:

- `main` -> Production branch (Managed by Product Manager). Only merged via approved Pull Requests.
- `feature/frontend-logic` -> Branch for Frontend Developer 1
- `feature/frontend-ui` -> Branch for Frontend Developer 2
- `feature/backend-api` -> Branch for Backend Developer
- `feature/design-assets` -> Branch for UI/UX Designer
- `feature/data-seeding` -> Branch for Data Collector

---

## 👥 Detailed Role Responsibilities

### 👤 Role 1: Product Manager
- **Deliverables**: Project coordination, GitHub board setup, testing, final presentation demo.
- **Files Owned**: `README.md`, `TEAM_DISTRIBUTION.md`.
- **Git Command**:
  ```bash
  git checkout -b main
  ```

### 👤 Role 2: Frontend Developer 1 (Logic & Architecture)
- **Deliverables**: React Router v6 navigation, filter state management, Axios API calls, page controllers.
- **Files Owned**:
  - `client/src/App.jsx`
  - `client/src/pages/Home.jsx`
  - `client/src/pages/Search.jsx`
  - `client/src/pages/Results.jsx`
  - `client/src/pages/Details.jsx`
  - `client/src/pages/Admin.jsx`
- **Git Command**:
  ```bash
  git checkout -b feature/frontend-logic
  ```

### 👤 Role 3: Frontend Developer 2 (UI & Styling)
- **Deliverables**: Tailwind CSS design system, glassmorphism UI, card components, filter form inputs, responsive layouts.
- **Files Owned**:
  - `client/src/components/Navbar.jsx`
  - `client/src/components/Footer.jsx`
  - `client/src/components/FilterForm.jsx`
  - `client/src/components/ScholarshipCard.jsx`
  - `client/src/components/LoadingSpinner.jsx`
  - `client/src/index.css`
  - `client/tailwind.config.js`
- **Git Command**:
  ```bash
  git checkout -b feature/frontend-ui
  ```

### 👤 Role 4: Backend Developer
- **Deliverables**: Express server setup, Mongoose schema, POST `/api/search` algorithm, REST endpoints, MongoDB connection.
- **Files Owned**:
  - `server/server.js`
  - `server/config/db.js`
  - `server/models/Scholarship.js`
  - `server/routes/search.js`
  - `server/routes/scholarships.js`
  - `.env` & `config.env`
- **Git Command**:
  ```bash
  git checkout -b feature/backend-api
  ```

### 👤 Role 5: UI/UX Designer
- **Deliverables**: Figma mockups, color scheme palette definition, typography guidelines (Outfit & Inter fonts), user flow diagrams.
- **Files Owned**: Design documentation & asset folder.
- **Git Command**:
  ```bash
  git checkout -b feature/design-assets
  ```

### 👤 Role 6: Data Collector
- **Deliverables**: Researching 200+ verified scholarships from official portals (`scholarships.gov.in`, `digitalgujarat.gov.in`, `aai.aero`, `csirhrdg.res.in`, `startupindia.gov.in`), formatting JSON data & seeding MongoDB Atlas.
- **Files Owned**:
  - `server/seedData.js`
  - `server/seedScript.js`
- **Git Command**:
  ```bash
  git checkout -b feature/data-seeding
  ```

---

## 📌 Instructions to Push Code to GitHub

```bash
# 1. Initialize local Git repository (if not already done)
git init

# 2. Add all files to Git
git add .

# 3. Commit initial complete code
git commit -m "feat: complete ScholarSeek production application with 8-sector dynamic filtering and MongoDB Atlas"

# 4. Create your remote repository on GitHub (e.g. https://github.com/your-username/scholarseek.git)

# 5. Link local repository to GitHub
git remote add origin https://github.com/your-username/scholarseek.git

# 6. Push main branch to GitHub
git branch -M main
git push -u origin main
```
