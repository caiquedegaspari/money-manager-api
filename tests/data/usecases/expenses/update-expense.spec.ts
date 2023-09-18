import { LoadExpenseByIdRepository } from '@/data/protocols/db/expenses/load-expense-by-id-repository'
import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { DbUpdateExpense } from '@/data/usecases/expenses/db-update-expense'

export type SutTypes = {
  sut: UpdateExpense
  loadExpenseByIdRepositoryStub: LoadExpenseByIdRepository
}

const makeLoadExpenseByIdRepository = (): LoadExpenseByIdRepository => {
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

const makeSut = (): SutTypes => {
  const loadExpenseByIdRepositoryStub = makeLoadExpenseByIdRepository()
  const sut = new DbUpdateExpense(loadExpenseByIdRepositoryStub)

  return {
    sut,
    loadExpenseByIdRepositoryStub
  }
}

describe('Update Expense usecase', () => {
  it('Should LoadExpeseByIdRepository with correct values', async () => {
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
})
