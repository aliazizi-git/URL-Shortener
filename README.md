# ⚡ Snip. — Full-Stack URL Shortener & Analytics

A modern, production-grade URL shortening web service built with **Express 5**, **MongoDB**, **React 19**, and **Tailwind CSS v4**, designed according to the [roadmap.sh URL Shortening Service Project](https://roadmap.sh/projects/url-shortening-service).

---

## 🚀 Overview

**Snip.** is a full-stack link management platform that transforms cumbersome URLs into compact, high-performance aliases. It features real-time click tracking, collision-resistant slug generation, user authentication with JWT, and a developer-first dark interface.

### ✨ Key Features

- **⚡ Instant 302 Edge Redirection**: High-speed lookup with atomic click incrementing (`$inc: { clicks: 1 }`).
- **🎲 Custom & Auto-Generated Slugs**: Support for custom aliases or collision-resistant NanoID generation.
- **🔐 Secure Authentication**: JWT authentication with `bcryptjs` password hashing, protected routes, and Redux state sync.
- **📊 Real-Time Click Analytics**: Track total visits and monitor access statistics per link.
- **🎨 Modern Dark Aesthetic**: Crafted with Tailwind CSS v4, monospace data accents, and responsive layout.
- **🛡️ Enterprise Input Validation**: Server-side validation via `Yup` and client-side form management with `Formik`.
- **💥 Centralized Error Handling**: Standardized async flow using `vanta-api` (`catchError`, `HandleERROR`).

---

## 🛠️ Tech Stack

### Backend
| Technology | Role |
| :--- | :--- |
| **Node.js (ESM)** | Modern JavaScript runtime |
| **Express 5** | High-performance HTTP server framework |
| **MongoDB & Mongoose 9** | NoSQL document database with schema modeling |
| **JSON Web Tokens (JWT)** | Stateless bearer token authentication |
| **bcryptjs** | Salted cryptographic password hashing |
| **NanoID** | Secure, compact URL-friendly unique ID generator |
| **Yup** | Schema-based payload validation |
| **vanta-api** | Async wrapper and centralized error handling |
| **Morgan & Cors** | Request logging and Cross-Origin Resource Sharing |

### Frontend
| Technology | Role |
| :--- | :--- |
| **React 19** | Modern UI component library |
| **Vite 8** | Next-generation frontend tooling and bundler |
| **Tailwind CSS v4** | Modern utility-first CSS styling engine |
| **Redux Toolkit & React-Redux** | Global state management for authentication |
| **React Router v7** | Declarative client-side routing |
| **Formik & Yup** | Form state management and schema validation |
| **Axios** | HTTP client with automatic JWT authorization interceptors |
| **React Hot Toast** | Minimalist toast notifications |

---

## 📁 Project Architecture

```
URL-Shortener/
├── backend/
│   ├── Config/
│   │   └── dbConnection.js       # MongoDB Mongoose connection handler
│   ├── Middlewares/
│   │   ├── exportValidation.js   # Bearer token extractor & user context
│   │   └── isLogin.js            # Route protection guard
│   ├── Modules/
│   │   ├── Auth/                 # User authentication module
│   │   │   ├── auth.js           # Auth routes (/api/auth)
│   │   │   ├── authCn.js         # Register & Login controllers
│   │   │   └── authValidator.js  # Yup validation schemas
│   │   ├── User/
│   │   │   └── userMd.js         # User model schema
│   │   └── Url/                  # URL Shortener core module
│   │       ├── url.js            # URL routes (/api/url-shortener)
│   │       ├── urlCn.js          # CRUD & redirection controllers
│   │       ├── urlMd.js          # URL model schema & click tracker
│   │       └── urlValidator.js   # URL payload validators
│   ├── Utils/
│   │   └── generateCode.js       # NanoID generator utility
│   ├── app.js                    # Express app configuration & middlewares
│   ├── server.js                 # HTTP listener bootstrap
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar/           # Dynamic navigation header
│   │   │   └── Footer/           # Operational status footer
│   │   ├── Layout/               # Master application layout
│   │   ├── Pages/
│   │   │   ├── Auth/             # Sign-in & Sign-up forms
│   │   │   └── Home/             # URL shortening engine & copy UI
│   │   ├── Router/               # React Router configuration
│   │   ├── Services/
│   │   │   └── api.js            # Axios client with Auth interceptor
│   │   ├── Store/
│   │   │   ├── Slices/authSlice.js # Auth reducer & persistent session
│   │   │   └── index.jsx         # Redux store config
│   │   ├── NotFound/             # 404 Route handling
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 📡 API Reference

### 1. Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account | ❌ No |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | ❌ No |

#### Example: Register Request
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "developer",
  "email": "dev@example.com",
  "password": "Password123!"
}
```

---

### 2. URL Management (`/api/url-shortener`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/url-shortener` | Shorten a new URL (with optional custom slug) | 🔒 Yes (Bearer Token) |
| `GET` | `/api/url-shortener/:shortCode` | Retrieve statistics & analytics for a short link | 🔒 Yes (Bearer Token) |
| `PATCH` | `/api/url-shortener/:shortCode` | Update destination URL for an owned link | 🔒 Yes (Bearer Token) |
| `DELETE` | `/api/url-shortener/:shortCode` | Delete an owned short link | 🔒 Yes (Bearer Token) |

#### Example: Shorten URL Request
```json
POST /api/url-shortener
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "originalUrl": "https://roadmap.sh/projects/url-shortening-service",
  "shortCode": "roadmap-project"
}
```

#### Example: Shorten URL Response
```json
{
  "success": true,
  "message": "URL has been created",
  "data": {
    "url": "http://localhost:5000/roadmap-project"
  }
}
```

---

### 3. Redirection (`/:shortCode`)

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/:shortCode` | Increments click count and redirects to `originalUrl` | `302 Found` |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

---

### 1. Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside `backend/`:
   ```env
   PORT=5000
   BASE_URL=http://localhost:5000
   MONGO_URI=mongodb://username:password@cluster-shard-00-00.mongodb.net:27017,cluster-shard-00-01.mongodb.net:27017,cluster-shard-00-02.mongodb.net:27017/url_shortener?ssl=true&replicaSet=atlas-shard-0&authSource=admin
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   > Server will start listening at `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > The application will be available at `http://localhost:5173`.

---

## 🧪 Testing the Complete Flow

1. **Register**: Navigate to `http://localhost:5173/auth` and create a new account.
2. **Login**: Sign in with your credentials. A secure JWT will be saved to `localStorage` and Redux.
3. **Shorten**: On the home page (`http://localhost:5173/`), enter a long URL (e.g. `https://roadmap.sh/projects/url-shortening-service`) and an optional custom slug.
4. **Copy & Redirect**: Click "Copy Link" and paste the short link into your browser. You will be instantly redirected via HTTP 302, and click metrics will increment in the database.

---

## 📌 Project Specification

This project was built following the backend project guidelines from:  
👉 **[roadmap.sh - URL Shortening Service](https://roadmap.sh/projects/url-shortening-service)**

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
