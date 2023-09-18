import { prismaMock } from '@/tests/singleton'
import { ExpensePrismaRepository } from '@/infra/db/prisma/expense/expense-prisma-repository'

interface SutTypes {
  sut: ExpensePrismaRepository
}

const makeSut = (): SutTypes => {
  const sut = new ExpensePrismaRepository()

  return {
    sut
  }
}

describe('ExpensePrismaRepository', () => {
  describe('add()', () => {
    it('Should return true on add success', async () => {
      const { sut } = makeSut()
      prismaMock.expense.create.mockResolvedValueOnce({
        id: 1,
        name: 'expense 1',
        value: 200,
        date: new Date(),
        userId: 1,
        categoryId: null
      })
      const res = await sut.add({ date: new Date(), name: 'expense 1', userId: 1, value: 200 })

      expect(res.name).toBe('expense 1')
      expect(res.value).toBe(200)
    })
  })
})
