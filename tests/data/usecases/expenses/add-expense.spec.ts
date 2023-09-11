import { AddExpenseRepository } from '@/data/protocols/db/expenses'
import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { DbAddExpenses } from '@/data/usecases/expenses/db-add-expenses'

type SutTypes = {
  sut: AddExpense
  addExpenseRepositoryStub: AddExpenseRepository
}

const makeAddExpenseRepository = (): AddExpenseRepository => {
  class AddExpenseRepositoryStub implements AddExpenseRepository {
    async add (params: AddExpenseRepository.Params): Promise<AddExpenseRepository.Result> {
      return {
        name: 'expense',
        value: 123,
        categoryId: 1
      }
    }
  }
  return new AddExpenseRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addExpenseRepositoryStub = makeAddExpenseRepository()
  const sut = new DbAddExpenses(addExpenseRepositoryStub)

  return {
    sut,
    addExpenseRepositoryStub
  }
}

describe('AddExpense usecase', () => {
  it('Should call AddExpenseRepository with correct values', async () => {
    const { sut, addExpenseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addExpenseRepositoryStub, 'add')
    await sut.add({ name: 'name', value: 123 })
    expect(addSpy).toHaveBeenCalledWith({ name: 'name', value: 123 })
  })
})
