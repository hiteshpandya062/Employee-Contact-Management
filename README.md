# Employee Contact Management System

A full-stack Employee Contact Management System built using:

- **Backend:** .NET 8 Web API
- **Frontend:** React 19.1.0 with TypeScript
- **Database:** Microsoft SQL Server

This application allows you to manage employees, their contact details, and associated companies.

---

## 📁 Project Folder Structure

```
ContactManagement/
├── Contact.Management
│   ├── Contact.Management.API
│   │    ├── Controllers
│   │    └── Extensions
│   ├── Contact.Management.Application
│   │    └── Services
│   ├── Contact.Management.Core
│   │   ├── Entities
│   │   └── Interfaces
│   │       ├── Repository
│   │       └── Service
│   ├── Contact.Management.Infrastructure
│   │   ├── Data
│   │   └── Repositories
│   └── Contact.Management.Shared
│       └── API
│           └── DTOs
├── Contact-Management-App/   # Frontend React App
├── DB/                       # SQL scripts
└── README.md
```

---

## ⚙️ Backend Setup (.NET 8 Web API)

### ✅ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### ✅ Running the API

1. Navigate to `Contact.Management.API`:

   ```bash
   cd Contact.Management.API
   dotnet restore
   dotnet run
   ```

2. The API will run on `https://localhost:7132/` (or the port specified in `launchSettings.json`).

### ✅ Key Design Patterns

- **Unit of Work** and **Generic Repository Pattern** implemented
- Follows Clean Architecture principles
- DTOs are stored in `Contact.Management.Shared/API/DTOs`

---

## 💻 Frontend Setup (React + TypeScript)

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v20.11.0)
- [npm](https://www.npmjs.com/)

### ✅ Install & Start

```bash
cd contact-management-app
npm install
npm start
```

### ✅ Used Packages

- `@reduxjs/toolkit`, `react-redux`, `@types/react-redux`
- `axios`
- `primereact` (v10.9.6), `primeicons`, `primeflex`
- `formik`, `yup` (for form handling & validation)

### ✅ Environment Variables

Create a `.env` file in the root of `contact-management-app`:

```env
REACT_APP_API_URL=https://localhost:7132/api

REACT_APP_ABSTRACT_API_URL=https://emailvalidation.abstractapi.com/v1/?api_key={API_KEY}&email=
```

### ✅ Email Validation

- Uses AbstractAPI ([https://www.abstractapi.com/email-verification-api](https://www.abstractapi.com/email-verification-api))
- Provide your API key via `.env` file

---

## 🗄️ Database Setup (Microsoft SQL Server)

### ✅ SQL Scripts

- All database creation scripts are stored in the `DB/` folder.
- You can use SSMS to run the scripts.

---

## ✅ Summary

| Layer    | Stack                                |
| -------- | ------------------------------------ |
| Backend  | .NET 8 Web API, Clean Architecture   |
| Frontend | React 19.1.0, TypeScript, PrimeReact |
| Database | Microsoft SQL Server                 |
| Features | CRUD, Pagination, Validation, Toasts |
