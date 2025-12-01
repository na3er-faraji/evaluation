# NestJS Evaluation API

A simple REST API built with **NestJS**, designed to manage users and evaluations. The project includes:

- **User registration & login** with JWT authentication
- **CRUD operations** for an item called “Evaluation”
- **Pagination** on `GET /evaluations`
- **Role management** (`admin` and `user`)
- **Swagger / OpenAPI documentation**
- **Dockerized setup** with PostgreSQL and Redis

---

## Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/na3er-faraji/evaluation
cd evaluation
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment variables:**

An example environment file `env.example` is included. Copy it to `.env` and update the values as needed:

```bash
cp env.example .env
```

Edit `.env` with your own credentials:

```env
PORT=3000

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=evaluation

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRATION=300
JWT_REFRESH_EXPIRATION=86400
```

---

## Running with Docker

The project is fully dockerized. Run the following command to start all services:

```bash
docker-compose up -d
```

Services included:

- **PostgreSQL** (`postgres:16`) on port `5432`
- **Redis** (`redis:7`) on port `6379`
- **NestJS API** on port `3000`

Check that all containers are running:

```bash
docker ps
```

---

## Accessing the API

- **API Base URL:** `http://localhost:3000`
- **Swagger / OpenAPI Docs:** `http://localhost:3000/api`

---

## Available Endpoints

### **Auth**

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login with credentials
- `POST /auth/refresh` – Refresh JWT token
- `POST /auth/me` – Get current user info

### **Users**

- `POST /users/` – Register a new user by admin

### **Evaluations**

- `GET /evaluations` – List evaluations (supports `page` and `limit` query params)
- `POST /evaluations` – Create a new evaluation
- `GET /evaluations/:id` – Get evaluation by ID
- `PATCH /evaluations/:id` – Update evaluation
- `DELETE /evaluations/:id` – Delete evaluation

---

## Roles

- **admin** – Can perform all actions on evaluations and can register new users with any role.
- **user** – Can perform only read and delete actions on their own evaluations, and cannot create or update evaluations for other users. Also, cannot create new users with the admin role.

---

## Notes

- Make sure to **rename `env.example` to `.env`** and set the proper database/Redis credentials before starting Docker.
- All service names in Docker Compose match the hostnames used in the `.env` file (`postgres`, `redis`) to ensure connectivity between containers.
