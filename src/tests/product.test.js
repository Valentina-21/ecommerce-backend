const request = require('supertest');
const app = require('../app.js');
require('../models')

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user)
    token = res.body.token;
})


test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const product = {
        title: "Atún",
        description: "El Atún de Isabel se presenta ahora en aceite de girasol y en distintos formatos para que puedas escoger en según qué ocasiones. Tras muchos años de experiencia seleccionando y elaborando el mejor atún, Isabel prepara este producto con las partes más sabrosas del atún y con exquisito aceite de girasol  que tiene una composición muy similar a la del aceite de oliva, Se obtiene a través de girasoles seleccionados que son ricos en Oleico, el principal componente del aceite de oliva y que científicamente ha sido demostrado ser beneficioso en una alimentación balanceada.",
        brand: "Isabel",
        price: 9580
    }
    const res = await request(app)
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`)
    id= res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});