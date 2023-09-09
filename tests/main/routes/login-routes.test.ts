import request from 'supertest'
import app from '@/main/config/app'
import { hash } from 'bcrypt'
import { prismaMock } from '@/tests/singleton'

describe('Login routes', () => {
  describe('POST /signup ', () => {
    it('Should return 200 on signup ', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce(null)
      await request(app)
        .post('/api/signup').send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'anypassword'
        })
        .expect(200)
    })
  })

  describe('POST /login ', () => {
    it('Should return 200 on login ', async () => {
      const password = await hash('anypassword', 12)
      prismaMock.user.findFirst.mockResolvedValueOnce({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        password,
        monthlyIncome: 200
      })
      await request(app)
        .post('/api/login').send({
          email: 'any_email@mail.com',
          password: 'anypassword'
        })
        .expect(200)
    })
    it('Should return 401 on login ', async () => {
      await request(app)
        .post('/api/login').send({
          email: 'any_email@mail.com',
          password: 'wrong_password'
        })
        .expect(401)
    })
  })
})
