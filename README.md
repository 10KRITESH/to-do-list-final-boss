# To-Do List API 📝

A lightweight, robust backend API for managing a To-Do list. Built using **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Driver:** `pg` (node-postgres)
* **Process Manager:** `nodemon` (for development)

---

## 🛠️ Prerequisites
Before running this application, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ Setup & Installation

### 1. Database Setup
Log into your PostgreSQL CLI and create the database and user:
```sql
CREATE DATABASE todo_db;
CREATE USER todo_user WITH PASSWORD 'your_password';
ALTER USER todo_user WITH SUPERUSER; -- Optional, or grant explicit schema privileges
```

Connect to `todo_db` and create the `tasks` table:
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the project:
```env
PORT=3000
DB_USER=todo_user
DB_HOST=localhost
DB_DATABASE=todo_db
DB_PASSWORD=your_password
DB_PORT=5432
```

### 3. Install Dependencies
```bash
npm install
```

---

## 🏃 Running the Application

* **Development mode (with nodemon hot-reload):**
  ```bash
  npm run dev
  ```
* **Production mode:**
  ```bash
  npm start
  ```

Once started, the server will run on `http://localhost:3000` (or your configured `PORT`).

---

## 🔌 API Endpoints

### 1. Get All Tasks
* **URL:** `/tasks`
* **Method:** `GET`
* **Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "done": false,
      "created_at": "2026-06-25T11:54:12.000Z"
    }
  ]
  ```

### 2. Create a Task
* **URL:** `/tasks`
* **Method:** `POST`
* **Body:**
  ```json
  {
    "title": "Complete NMIMS assignment"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "id": 2,
    "title": "Complete NMIMS assignment",
    "done": false,
    "created_at": "2026-06-25T12:01:45.000Z"
  }
  ```

### 3. Update Task Status
* **URL:** `/tasks/:id`
* **Method:** `PATCH`
* **Body:**
  ```json
  {
    "done": true
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "id": 2,
    "title": "Complete NMIMS assignment",
    "done": true,
    "created_at": "2026-06-25T12:01:45.000Z"
  }
  ```

### 4. Delete a Task
* **URL:** `/tasks/:id`
* **Method:** `DELETE`
* **Response (200 OK):**
  ```json
  {
    "message": "Task deleted",
    "task": {
      "id": 2,
      "title": "Complete NMIMS assignment",
      "done": true,
      "created_at": "2026-06-25T12:01:45.000Z"
    }
  }
  ```
