const request = require('supertest');

process.env.JWT_SECRET = 'test-secret';
process.env.AUTH_USERNAME = 'admin';
process.env.AUTH_PASSWORD = 'password123';

const app = require('./app');

describe('JWT authentication', () => {
  test('POST /login returns token with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('POST /login rejects invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong-password' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
  });

  test('GET /protected rejects requests without token', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Access token missing' });
  });

  test('GET /protected allows requests with valid token', async () => {
    const login = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });

    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Protected route accessed by admin'
    });
  });
});
