import { prismaMock } from '@/tests/singleton'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'
import { mockAddAccountParams } from '@/tests/data/mocks'

interface SutTypes {
  sut: AccountPrismaRepository
}

const makeSut = (): SutTypes => {
  const sut = new AccountPrismaRepository()

  return {
    sut
  }
}

describe('AccountPrismaRepository', () => {
  describe('add()', () => {
    it('Should return true on add success', async () => {
      const { sut } = makeSut()
      const res = await sut.add(mockAddAccountParams())
      prismaMock.user.create.mockResolvedValueOnce({ id: 1, monthlyIncome: 0, ...mockAddAccountParams() })
      expect(res).toBe(true)
    })
  })
})
