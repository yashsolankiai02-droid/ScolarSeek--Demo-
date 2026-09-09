# 🎓 ScholarSeek - Scholarship Discovery Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 🌟 Live Demo Links

- **🌐 Frontend Web Application**: [https://scolar-seek-demo.vercel.app](https://scolar-seek-demo.vercel.app)
- **⚙️ Live Backend REST API**: [https://scolarseek-backend.onrender.com/api/health](https://scolarseek-backend.onrender.com/api/health)
- **🔒 Protected Admin Portal**: [https://scolar-seek-demo.vercel.app/admin](https://scolar-seek-demo.vercel.app/admin) *(Passcode Protected)*

---

## 📌 Project Overview

**ScholarSeek** is a full-stack smart scholarship discovery platform designed for Indian students. Unlike traditional static portals, ScholarSeek implements **sector-specific dynamic filtering**—recognizing that different sectors (e.g. Healthcare vs. Sports vs. Education) require entirely different eligibility criteria.

### Key Principle: *Different sectors need different questions.*

---

## 🌟 Key Features

1. **Universal Filters (Always Visible)**:
   - State of Domicile (Gujarat, Maharashtra, Delhi, Karnataka, UP, Rajasthan, etc.)
   - Family Annual Income Brackets (`< 3 Lakhs`, `3-6L`, `6-10L`, `10-15L`, `> 15L`)
   - Social Categories (`General`, `OBC`, `SC`, `ST`, `EWS`)
   - 8 Major Sectors Selection

2. **Conditional Sector-Specific Filters**:
   - **Educational**: Class Grade (`12th`, `Bachelor`, `Masters`, `PhD`), Field of Study, Minimum Percentage/CGPA.
   - **Sports**: Sport Type (`Cricket`, `Athletics`, etc.), Performance Level (`State`, `National`, `International`), Age Group.
   - **Arts & Culture**: Art Discipline (`Classical Music`, `Theatre`, `Painting`), Skill Level, Years of Practice.
   - **Healthcare**: Medical Field (`MBBS`, `Nursing`, `AYUSH`), Qualification Level, NEET Score requirement.
   - **Business & Entrepreneurship**: Startup Stage (`Idea`, `Growth`, `Scale`), Industry Domain, Funding Need.
   - **Research & Innovation**: Research Domain (`AI`, `Biotech`, `Clean Energy`), Degree Level, Fellowship Duration.
   - **Agricultural**: Agricultural Field (`Horticulture`, `Dairy`, `Organic`), Education Level, Farm Scale.
   - **Social Sector**: Cause Area (`Education`, `Rural Dev`, `Disability`), Background Requirement, Role Type.

3. **Zero Document Upload Required**: Instant filter-based matching in under 10 seconds.
4. **Direct Official Portal Access**: Direct link buttons to official government portals (`scholarships.gov.in`, `digitalgujarat.gov.in`, `aai.aero`, `startupindia.gov.in`).
5. **Passcode-Protected Admin Form**: Dedicated admin page (`/admin`) for verified scholarship additions directly into live MongoDB Atlas Cloud.

---

## 🏗️ Architecture & Technology Stack

```
ScholarSeek Platform
├── Frontend (Client)  -> React 18, React Router v6, Tailwind CSS v3, Lucide Icons, Vite
├── Backend (Server)   -> Node.js, Express.js REST API
└── Database           -> MongoDB Atlas Cloud (Mongoose ODM)
```

---

## 👥 6-Person Team Roles & Code Distribution

| Member / Role | Main Responsibilities | Code Files Owned | Git Branch |
| :--- | :--- | :--- | :--- |
| **Yash Solanki** *(Backend Lead / Team Lead)* | Express REST API server, MongoDB Atlas Mongoose connection, search matching algorithm, deployment | `server/server.js`, `server/config/db.js`, `server/models/Scholarship.js`, `server/routes/*`, `config.env` | `main` / `Yash-Backend-TeamLead` |
| **Frontend Developer 1** | Application routing, state management, Axios API calls, page controllers | `client/src/App.jsx`, `pages/Home.jsx`, `Search.jsx`, `Results.jsx`, `Details.jsx`, `Admin.jsx` | `Frontend-Developer-1` |
| **Frontend Developer 2** | Responsive glassmorphism UI, Tailwind CSS, components, badges & animations | `client/src/components/*` (`Navbar`, `FilterForm`, `ScholarshipCard`, `Footer`), `index.css` | `Frontend-Developer-2` |
| **UI/UX Designer** | Typography (Outfit & Inter fonts), color palette definition, Figma design system | Design assets & documentation | `feature/design-assets` |
| **Data Collector & Analyst** | Researching verified Indian scholarships & writing MongoDB Atlas seed scripts | `server/seedData.js`, `server/seedScript.js` | `Data-Analyst` |
| **Product Manager** | Project roadmap, team coordination, slide presentation & evaluation demo | `README.md`, `TEAM_DISTRIBUTION.md` | `main` |

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js (`v18.x` or `v20.x`)
- npm (`v9.x` or higher)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yashsolankiai02-droid/ScolarSeek--Demo-.git
   cd ScolarSeek--Demo-
   ```

2. **Install Dependencies**:
   ```bash
   npm install --prefix server
   npm install --prefix client
   ```

3. **Configure Environment Variables**:
   Create a `.env` or `config.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://scolarseek_db_user:EuPMvAhGA2qZHCHI@scolarseek.mugfafz.mongodb.net/scholarseek?retryWrites=true&w=majority
   ADMIN_KEY=admin123
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)** in your browser!

5. **Seed Database (Optional)**:
   ```bash
   npm run seed
   ```

---

## 🔒 Security & Admin Access

- **Admin Form URL**: `/admin`
- **Security Passcode**: Required header verification (`x-admin-key`) before database insertion.
- **Configurable Passcode**: Defined via `ADMIN_KEY` environment variable.

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
