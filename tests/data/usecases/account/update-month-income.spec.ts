import { UpdateMonthIncome } from '@/domain/usecases/account/update-month-income'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { DbUpdateMonthIncome } from '@/data/usecases/account/db-update-month-income'

interface SutTypes {
  sut: UpdateMonthIncome
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const mockLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
      return await Promise.resolve({
        id: 1,
        email: 'any_mail@mail.com'
      })
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new DbUpdateMonthIncome(loadAccountByIdRepositoryStub)

  return {
    loadAccountByIdRepositoryStub,
    sut
  }
}

describe('DbUpdateMonthIncome', () => {
  it('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.updateMonthIncome({ userId: 1, value: 200 })
    expect(spyLoad).toHaveBeenCalledWith(1)
  })
  it('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.updateMonthIncome({ userId: 1, value: 200 })
    expect(result).toBeNull()
  })
})
