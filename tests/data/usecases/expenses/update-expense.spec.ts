import { LoadExpenseByIdRepository } from '@/data/protocols/db/expenses/load-expense-by-id-repository'
import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { DbUpdateExpense } from '@/data/usecases/expenses/db-update-expense'
import { UpdateExpenseRepository } from '@/data/protocols/db/expenses/update-expense-repository'

export type SutTypes = {
  sut: UpdateExpense
  loadExpenseByIdRepositoryStub: LoadExpenseByIdRepository
  updateExpenseRepositoryStub: UpdateExpenseRepository
}

const mockLoadExpenseByIdRepository = (): LoadExpenseByIdRepository => {
  class LoadExpenseByIdRepositoryStub implements LoadExpenseByIdRepository {
    async loadById (params: LoadExpenseByIdRepository.Params): Promise<LoadExpenseByIdRepository.Result> {
      return await Promise.resolve({
        id: 1,
        name: 'expense',
        value: 1000
      })
    }
  }
  return new LoadExpenseByIdRepositoryStub()
}

const mockUpdateExpenseRepository = (): UpdateExpenseRepository => {
  class UpdateExpenseRepositoryStub implements UpdateExpenseRepository {
    async update (params: UpdateExpenseRepository.Params): Promise<UpdateExpenseRepository.Result> {
      return await Promise.resolve()
    }
  }
  return new UpdateExpenseRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadExpenseByIdRepositoryStub = mockLoadExpenseByIdRepository()
  const updateExpenseRepositoryStub = mockUpdateExpenseRepository()
  const sut = new DbUpdateExpense(loadExpenseByIdRepositoryStub, updateExpenseRepositoryStub)

  return {
    sut,
    loadExpenseByIdRepositoryStub,
    updateExpenseRepositoryStub
  }
}

describe('Update Expense usecase', () => {
  it('Should call LoadExpeseByIdRepository with correct values', async () => {
    const { loadExpenseByIdRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadExpenseByIdRepositoryStub, 'loadById')
    await sut.update({ expenseId: 1, value: 200 })
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  it('Should return null if LoadExpeseByIdRepository returns null', async () => {
    const { loadExpenseByIdRepositoryStub, sut } = makeSut()
    jest.spyOn(loadExpenseByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const res = await sut.update({ expenseId: 1, value: 200 })
    expect(res).toBeNull()
  })
  it('Should call UpdateExpeseRepository with correct values', async () => {
    const { updateExpenseRepositoryStub, sut } = makeSut()
    const updateSpy = jest.spyOn(updateExpenseRepositoryStub, 'update')
    await sut.update({ expenseId: 1, value: 200 })
    expect(updateSpy).toHaveBeenCalledWith({ id: 1, value: 200 })
  })
})
