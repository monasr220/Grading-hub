# 🎓 Grading Hub

A RESTful backend API for managing academic assignments, submissions, and grading — built with **Node.js**, **Express**, and **MongoDB**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Users](#-users)
  - [Tasks](#-tasks)
  - [Submissions](#-submissions)
  - [File Upload](#-file-upload)
- [Authentication](#authentication)
- [Roles & Permissions](#roles--permissions)
- [Data Models](#data-models)

---

## Overview

Grading Hub is a backend system that allows:

- **Students** to register, log in, browse tasks, submit files, and track their grades.
- **Admins** to create and manage tasks, review submissions, and assign grades with feedback.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (via Mongoose) |
| Auth | JWT (stored in HTTP-only cookies) |
| File Upload | Multer |
| Password Hashing | bcryptjs |
| Dev Server | Nodemon |

---

## Project Structure

```
Grading-hub/
└── backend/
    ├── config/
    │   └── db.js                     # MongoDB connection
    ├── controllers/
    │   ├── user.controller.js         # Register, login, profile
    │   ├── task.Controller.js         # CRUD for tasks
    │   └── submission.Controller.js   # Submit, grade, review
    ├── middlewares/
    │   ├── asyncHandler.js            # Async error wrapper
    │   ├── authMiddleware.js          # JWT authentication + admin check
    │   └── checkId.js                 # MongoDB ObjectId validation
    ├── models/
    │   ├── User.js                    # User schema
    │   ├── Task.js                    # Task schema
    │   └── Submission.js              # Submission schema
    ├── routes/
    │   ├── user.route.js
    │   ├── task.route.js
    │   ├── sub.route.js
    │   └── upload.route.js
    ├── utils/
    │   └── createToken.js             # JWT generation + cookie setup
    └── index.js                       # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/monasr220/Grading-hub.git
cd Grading-hub

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Fill in your values (see Environment Variables below)

# 4. Create the uploads folder
mkdir uploads

# 5. Start the development server
npm run backend
```

Server runs on `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/gradinghub
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default: 3000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `NODE_ENV` | `development` or `production` |

---

## API Reference

### Base URL

```
http://localhost:3000/api/v1
```

---

### 👤 Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/users` | Public | Register a new user |
| `POST` | `/users/auth` | Public | Login |
| `POST` | `/users/logout` | Public | Logout (clears cookie) |
| `GET` | `/users` | Admin only | Get all users |
| `GET` | `/users/profile` | Authenticated | Get current user profile |
| `PUT` | `/users/profile` | Authenticated | Update current user profile |

#### Register — `POST /users`
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

#### Login — `POST /users/auth`
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "_id": "64abc...",
  "username": "John Doe",
  "email": "john@example.com",
  "isAdmin": false
}
```
> A JWT cookie (`jwt`) is set automatically on login.

---

### 📝 Tasks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/tasks/all-tasks` | Public | Get all tasks |
| `GET` | `/tasks/new-task` | Public | Get the latest task |
| `GET` | `/tasks/specific-task/:id` | Public | Get a task by ID |
| `POST` | `/tasks/create-task` | Admin only | Create a new task |
| `PUT` | `/tasks/update-task/:id` | Admin only | Update a task |
| `DELETE` | `/tasks/delete-task/:id` | Admin only | Delete a task |

#### Create Task — `POST /tasks/create-task`
```json
{
  "title": "Assignment 1",
  "description": "Write a summary of chapter 3",
  "deadline": "2025-12-01",
  "maxGrade": 100
}
```

---

### 📤 Submissions

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/sub/all` | Admin only | Get all submissions |
| `POST` | `/sub` | Authenticated | Submit a task |
| `GET` | `/sub/:id` | Authenticated | Get a specific submission |
| `PUT` | `/sub/:id` | Admin only | Grade a submission |
| `DELETE` | `/sub/:id` | Admin only | Delete a submission |

#### Submit a Task — `POST /sub`
```json
{
  "task": "64abc123...",
  "fileUrl": "/uploads/doc-1234567890.pdf"
}
```
> The `user` field is taken automatically from the JWT token.

#### Grade a Submission — `PUT /sub/:id`
```json
{
  "grade": 90,
  "feedback": "Excellent work! Well structured and detailed."
}
```

---

### 📁 File Upload

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/upload` | Public | Upload a PDF or DOCX file |

#### Upload File — `POST /upload`

Send as `multipart/form-data` with field name `doc`.

```
Content-Type: multipart/form-data
Field name:   doc
Accepted:     .pdf, .docx
Max size:     10 MB
```

**Success Response:**
```json
{
  "message": "Doc uploaded successfully",
  "doc": "uploads/doc-1719000000000.pdf"
}
```

**Typical flow:**
1. Upload the file → get the `doc` path in the response
2. Use that path as the `fileUrl` when submitting to `POST /sub`

---

## Authentication

This API uses **JWT tokens stored in HTTP-only cookies**.

- On login, the server sets a `jwt` cookie automatically (expires in 30 days).
- All protected routes read the token from the cookie — no need to set headers manually.
- On logout, the cookie is cleared.

To make authenticated requests from a client (e.g. Postman), enable **"Send cookies"** or use `withCredentials: true` in your HTTP client.

---

## Roles & Permissions

| Action | Student | Admin |
|---|:---:|:---:|
| Register / Login | ✅ | ✅ |
| View tasks | ✅ | ✅ |
| Submit assignment | ✅ | ✅ |
| View own submission | ✅ | ✅ |
| Create / Edit / Delete tasks | ❌ | ✅ |
| View all submissions | ❌ | ✅ |
| Grade submissions | ❌ | ✅ |
| Delete submissions | ❌ | ✅ |
| View all users | ❌ | ✅ |

> To make a user an admin, set `isAdmin: true` directly in MongoDB.

---

## Data Models

### User
```
username    String   required
email       String   required, unique
password    String   required (hashed with bcryptjs)
isAdmin     Boolean  default: false
timestamps
```

### Task
```
title       String   required
description String   required
deadline    Date
maxGrade    Number   required
createdBy   ObjectId ref: User, required
timestamps
```

### Submission
```
user        ObjectId ref: User,  required
task        ObjectId ref: Task,  required
fileUrl     String   required
grade       Number   default: null
feedback    String
submittedAt Date     default: Date.now
```

---

## Author

**Mohamed Nasr** — [GitHub](https://github.com/monasr220)