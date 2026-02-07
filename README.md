# Task Service

The Task Service manages task creation and retrieval for authenticated users.

## Features

- **Task Management**: Create and list tasks with titles, descriptions, and tags.
- **Pagination**: Efficiently fetch tasks using `page` and `limit` query parameters.
- **Standardized Infrastructure**:
    - Global Error Handling.
    - Centralized logging with `Winston`.
    - Health-check ready (includes `curl`).
- **Security**: Validates JWT tokens issued by the User Service.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create a new task | Yes |
| GET | `/tasks` | Get all tasks for the logged-in user | Yes |
| GET | `/tasks/all` | Get all tasks (Admin/Internal bypass) | No |
| GET | `/` | Health check endpoint | No |

## Query Parameters (GET `/tasks`)

- `page`: Page number (default: 1)
- `limit`: Number of tasks per page (default: 5, max: 10)

## Environment Variables

Required `.env` variables:
- `PORT`: Service port (default: 3001)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret key for JWT verification (must match User Service)

## Tech Stack

- Node.js & Express
- MongoDB
- Winston (Logging)
- Docker (Alpine base)
