# COMP 4870 – Assignment 1: Mini CMS (ASP.NET + SQLite + React/Vite)

A decoupled full-stack mini CMS:
- **Backend:** ASP.NET MVC Controller + SQLite + Entity Framework Core
- **Frontend:** React (Vite) SPA that fetches articles from the backend JSON API
- **Admin site:** Authentication + CRUD + Rich Text Editor (Quill)

## Features

### Public Site (React)
- Lists articles from the backend JSON API
- Article details page renders rich text HTML 

### Admin Site (ASP.NET MVC)
- Login/Logout with Identity
- Create / Edit / Delete articles
- Rich Text Editor (Quill) for article content
- HTML sanitization on create/update to reduce XSS risk

### API (ASP.NET)
- REST endpoints: **GET, POST, PUT, DELETE**
- Swagger UI for testing endpoints

## Quick Start

### Prerequisites
- .NET SDK installed
- Node.js + npm installed

### Run BOTH backend + frontend together
From the **CmsFrontend** folder:

```bash
npm install
npm run dev
```

This runs:
- Backend: `http://localhost:5002`
- Frontend: `http://localhost:5173`

## Admin Login
Open:
- `http://localhost:5002/admin/articles`

Seeded account:
- Email: `a@a.a`
- Password: `P@$$w0rd`

## Swagger / API Testing
Swagger UI:
- `http://localhost:5002/swagger`

Example endpoints:
- `GET    /api/articles`
- `GET    /api/articles/{id}`
- `POST   /api/articles`
- `PUT    /api/articles/{id}`
- `DELETE /api/articles/{id}`