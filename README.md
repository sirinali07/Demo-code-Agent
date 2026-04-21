# Demo-code-Agent

## Authentication

- Set `JWT_SECRET`, `AUTH_USERNAME`, and `AUTH_PASSWORD` environment variables before starting the server.
- `POST /login` with JSON body `{ "username": "<AUTH_USERNAME>", "password": "<AUTH_PASSWORD>" }` to receive a JWT.
- Example (shell): `JWT_SECRET='super-secret-key' AUTH_USERNAME='admin' AUTH_PASSWORD='Str0ng!Passphrase' npm start`
- Include `Authorization: Bearer <token>` to access `GET /protected`.
