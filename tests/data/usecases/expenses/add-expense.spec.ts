import { AddExpenseRepository } from '@/data/protocols/db/expenses'
import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { DbAddExpenses } from '@/data/usecases/expenses/db-add-expenses'
import { AddManyExpensesRepository } from '@/data/protocols/db/expenses/add-many-expenses-repository'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddExpense
  addExpenseRepositoryStub: AddExpenseRepository
  addManyExpensesRepositoryStub: AddManyExpensesRepository
}

const mockAddExpenseParams = (): AddExpense.Params => ({ name: 'name', value: 123, date: new Date() })

const makeAddExpenseRepository = (): AddExpenseRepository => {
  class AddExpenseRepositoryStub implements AddExpenseRepository {
    async add (params: AddExpenseRepository.Params): Promise<AddExpenseRepository.Result> {
      return {
        name: 'expense',
        value: 123,
        date: new Date()
      }
    }
  }
  return new AddExpenseRepositoryStub()
}

const makeAddManyExpensesRepository = (): AddManyExpensesRepository => {
  class AddManyExpensesRepositoryStub implements AddManyExpensesRepository {
    async addMany (params: AddManyExpensesRepository.Params): Promise<AddManyExpensesRepository.Result> {
      return {
        name: 'expense',
        value: 123,
        date: new Date()
      }
    }
  }
  return new AddManyExpensesRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addExpenseRepositoryStub = makeAddExpenseRepository()
  const addManyExpensesRepositoryStub = makeAddManyExpensesRepository()
  const sut = new DbAddExpenses(addExpenseRepositoryStub, addManyExpensesRepositoryStub)

  return {
    sut,
    addManyExpensesRepositoryStub,
    addExpenseRepositoryStub
  }
}

describe('AddExpense usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  it('Should call AddExpenseRepository with correct values', async () => {
    const { sut, addExpenseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addExpenseRepositoryStub, 'add')
    await sut.add(mockAddExpenseParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddExpenseParams())
  })

  it('Should call AddManyExpensesRepository with correct values if installmentsAmount is greater than 1', async () => {
    const { sut, addManyExpensesRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addManyExpensesRepositoryStub, 'addMany')
    await sut.add({ ...mockAddExpenseParams(), installmentsAmount: 2 })
    expect(addSpy).toHaveBeenCalledWith([mockAddExpenseParams(), mockAddExpenseParams()])
  })

  it('Should return an Expense result on AddExpenseRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddExpenseParams())
    expect(result.name).toBe('expense')
    expect(result.value).toBe(123)
  })

  it('Should return an Expense result on AddManyExpensesRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.add({ ...mockAddExpenseParams(), installmentsAmount: 2 })
    expect(result.name).toBe('expense')
    expect(result.value).toBe(123)
  })
})
