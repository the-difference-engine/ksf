const request = require('supertest')
const app = require('../server')
describe('GET Endpoints', () => {
  it('should create a new GET request', async () => {
    const res = await request(app)
      .get('/greeting')
    expect(res.statusCode).toBe(200)
  })
})


describe('GET Nomination Endpoint', () => {
  it('should create a new GET request', async () => {
    const res = await request(app)
      .get('/nominations/{nomination.id}')
    expect(res.statusCode).toBe(200)
  })
})
