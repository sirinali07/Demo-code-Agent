# Demo-code-Agent

## Authentication

- Set `JWT_SECRET`, `AUTH_USERNAME`, and `AUTH_PASSWORD` environment variables before starting the server.
- `POST /login` with JSON body `{ "username": "<AUTH_USERNAME>", "password": "<AUTH_PASSWORD>" }` to receive a JWT.
- Include `Authorization: Bearer <token>` to access `GET /protected`.
