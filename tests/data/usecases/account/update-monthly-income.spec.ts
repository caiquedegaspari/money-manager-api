import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { DbUpdateMonthlyIncome } from '@/data/usecases/account/db-update-monthly-income'
import { UpdateMonthlyIncomeRepository } from '@/data/protocols/db/account/update-monthly-income-repository'
import { mockLoadAccountByIdRepository } from '../../mocks'

interface SutTypes {
  sut: UpdateMonthlyIncome
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  updateMonthlyIncomeRepositoryStub: UpdateMonthlyIncomeRepository
}

const mockUpdateMonthlyIncomeRepository = (): UpdateMonthlyIncomeRepository => {
  class UpdateMonthlyIncomeRepositoryStub implements UpdateMonthlyIncomeRepository {
    async updateMonthlyIncome (id: UpdateMonthlyIncomeRepository.Params): Promise<UpdateMonthlyIncomeRepository.Result> {
      return await Promise.resolve(2000)
    }
  }
  return new UpdateMonthlyIncomeRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const updateMonthlyIncomeRepositoryStub = mockUpdateMonthlyIncomeRepository()
  const sut = new DbUpdateMonthlyIncome(loadAccountByIdRepositoryStub, updateMonthlyIncomeRepositoryStub)

  return {
    loadAccountByIdRepositoryStub,
    updateMonthlyIncomeRepositoryStub,
    sut
  }
}

describe('DbUpdateMonthIncome', () => {
  it('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.updateMonthlyIncome({ userId: 1, value: 200 })
    expect(spyLoad).toHaveBeenCalledWith(1)
  })
  it('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.updateMonthlyIncome({ userId: 1, value: 200 })
    expect(result).toBeNull()
  })

  it('Should call UpdateMonthIncomeRepository with correct values', async () => {
    const { sut, updateMonthlyIncomeRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateMonthlyIncomeRepositoryStub, 'updateMonthlyIncome')
    await sut.updateMonthlyIncome({ userId: 1, value: 1000 })
    expect(updateSpy).toHaveBeenCalledWith({ userId: 1, value: 1000 })
  })

  it('Should return monthly income on success', async () => {
    const { sut } = makeSut()
    const res = await sut.updateMonthlyIncome({ userId: 1, value: 1000 })
    expect(res).toBe(2000)
  })
})
