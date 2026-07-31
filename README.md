# HireSmart AI

A full-stack, AI-powered recruitment platform connecting recruiters with the right candidates — built end-to-end with Java Spring Boot, React, and PostgreSQL.

**🔗 Live Demo:** [hiresmart-frontend.onrender.com](https://hiresmart-frontend.onrender.com)
**📄 API Docs (Swagger):** [hiresmart-ai-x34d.onrender.com/swagger-ui.html](https://hiresmart-ai-x34d.onrender.com/swagger-ui.html)

> Note: this project runs on Render's free , so the backend may take 30-60 seconds to "wake up" 
---

## Overview

HireSmart AI is a role-based hiring platform with three distinct experiences:

- **Applicants** build a profile, browse jobs, and apply with a CV, cover letter, and experience details
- **Recruiters** post jobs, review applicants with AI-generated match scores, and approve/reject candidates
- **Admins** manage all users, jobs, and applications from a dedicated control panel

## Features

- 🔐 **Secure authentication** — JWT-based login, password hashing, forgot/reset password via email
- 👥 **Role-based access control** — Applicant, Recruiter, and Admin roles with distinct permissions and dashboards
- 💼 **Job management** — recruiters create, edit, and manage postings with application deadlines
- 📄 **Rich applications** — CV upload (via Cloudinary), cover letters, degree/experience details
- 🤖 **AI-style match scoring** — automatically compares applicant profiles against job requirements to surface the best-fit candidates
- ✅ **Approve/reject workflow** — recruiters review and act on applications directly
- 🛠️ **Admin dashboard** — search, filter, and manage every user, job, and application on the platform, with role editing
- 🎨 **Customizable theming** — users can pick an accent color from Settings, applied instantly across the UI
- 📧 **Transactional email** — automated password reset emails via SMTP

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3, Spring Security, JWT, Hibernate/JPA |
| Frontend | React (Vite), Tailwind CSS, React Router, Axios |
| Database | PostgreSQL |
| File Storage | Cloudinary (CV uploads) |
| Email | SMTP (Gmail) |
| Deployment | Render (Docker backend, static frontend, managed PostgreSQL) |

## Architecture

```
HireSmart-AI/
├── backend/                 # Spring Boot REST API
│   └── src/main/java/com/hiresmart/
│       ├── entity/          # JPA entities (User, Job, Application, Profile)
│       ├── repository/      # Spring Data JPA repositories
│       ├── service/         # Business logic
│       ├── controller/      # REST endpoints
│       ├── security/        # JWT filter, auth, user details
│       └── config/          # Security & CORS configuration
└── frontend/                 # React (Vite) single-page app
    └── src/
        ├── pages/            # Route-level views (Login, Jobs, Profile, Admin, ...)
        ├── components/       # Reusable UI components (Navbar, JobCard, ...)
        └── api/              # Axios instance with auth interceptor
```

## Getting Started Locally

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL

### Backend

```bash
cd backend
# create application.properties from your own local PostgreSQL credentials
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app expects the backend running at `http://localhost:8080` by default (configurable via `VITE_API_URL`).

## Deployment

- **Backend** — deployed on Render as a Dockerized Web Service
- **Frontend** — deployed on Render as a Static Site, built with Vite
- **Database** — Render-managed PostgreSQL instance
- Configuration is environment-based (`application-prod.properties`), keeping all secrets out of source control

## Author

**Anne Tuyishime**
[GitHub](https://github.com/AnneTUYISHIME) 