const request = require('supertest');
const app = require('../app.js');

let id;
let token;

test('POST /users', async () => {
    const body = {
        firstName: "Angie",
        lastName: "Gomez",
        email: "angiegomez2100@gmail.com",
        password: "angie21",
        phone: "3106042220"
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /users/login', async () => {
    const body = {
        email: 'angiegomez2100@gmail.com',
        password: 'angie21',
    }
    const res = await request(app)
        .post('/users/login')
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
       .get('/users')
       .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const body = { firstName: "Angie V"}
    const res = await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /users/:id', async () => {
    const res =  await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});