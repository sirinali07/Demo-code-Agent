# Demo-code-Agent

## Authentication

- `POST /login` with JSON body `{ "username": "admin", "password": "password123" }` to receive a JWT.
- Include `Authorization: Bearer <token>` to access `GET /protected`.
