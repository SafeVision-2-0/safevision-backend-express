# SafeVision Backend

Backend service for **SafeVision** built with **TypeScript**, **Express**, **Prisma**, and **MySQL**.

This project provides API services for managing users, profiles, face embeddings, teams, positions, and history records.

---

# Tech Stack

* **Node.js**
* **TypeScript**
* **Express.js**
* **Prisma ORM**
* **MySQL**
* **pnpm**

---

# Prerequisites

Make sure the following tools are installed on your system:

* Node.js (recommended **v18+**)
* pnpm
* MySQL

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/SafeVision-2-0/safevision-backend-express.git
```

Go to the project directory:

```bash
cd safevision-backend
```

Install dependencies:

```bash
pnpm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example configuration:

```
DATABASE_URL="mysql://root:@localhost:3306/safevision"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="safevision"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

SECRET_KEY="safevision 2.0"
```

Make sure your **MySQL server is running** and the database exists.

Create database if it doesn't exist:

```sql
CREATE DATABASE safevision;
```

---

# Database Migration

Run Prisma migration to create the database schema.

```bash
npx prisma migrate dev
```

This will:

* create database tables
* generate Prisma client

---

# Database Seeder

The project includes a **seed script** to create a default admin account.

Default admin credentials:

```
email: admin@example.com
password: admin
```

The seeder will automatically create:

* admin profile
* admin user

Run the seeder:

```bash
npx prisma db seed
```

---

# Running the Project

Start the development server:

```bash
pnpm dev
```

Or if the project uses a start script:

```bash
pnpm start
```

Server will run at:

```
http://localhost:3000
```

---

# Project Structure

Example project structure:

```
src
 ├── controllers
 ├── routes
 ├── middleware
 ├── services
 └── app.ts

prisma
 ├── schema.prisma
 └── seed.ts
```

---

# Prisma Commands

Generate Prisma client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

Reset database:

```bash
npx prisma migrate reset
```

---

# Default Admin Account

After running the seed command, you can login using:

```
email: admin@example.com
password: admin
```

---

# API Development

The backend is built using **Express** and follows a modular structure:

* Routes handle API endpoints
* Controllers manage request logic
* Prisma handles database access

---

# License

This project is for educational and research purposes.

---

Jika Anda mau, saya juga bisa bantu membuat **README yang lebih profesional seperti repository open source**, misalnya dengan tambahan:

* badges (Node version, license, Prisma)
* API documentation section
* ERD diagram
* setup docker untuk MySQL
* script pnpm yang lebih rapi (`dev`, `build`, `start`, `seed`, dll)

Biasanya itu membuat repository terlihat jauh lebih **professional ketika dilihat recruiter atau interviewer**.
