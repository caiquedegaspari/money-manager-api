import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { AddExpenseController } from '@/presentation/controllers/expense/add-expense-controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, ok } from '@/presentation/helpers'
import { mockAddExpenseParams } from '@/tests/data/mocks/expenses'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddExpenseController
  addExpenseStub: AddExpense
}

const mockAddExpense = (): AddExpense => {
  class AddExpenseStub implements AddExpense {
    async add (params: AddExpense.Params): Promise<AddExpense.Result> {
      return await Promise.resolve({
        name: 'expense',
        value: 200,
        date: new Date()
      })
    }
  }
  return new AddExpenseStub()
}

const makeSut = (): SutTypes => {
  const addExpenseStub = mockAddExpense()
  const sut = new AddExpenseController(addExpenseStub)

  return {
    sut,
    addExpenseStub
  }
}

describe('AddExpenseController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  it('Should call AddExpense with correct values', async () => {
    const { addExpenseStub, sut } = makeSut()
    const addSpy = jest.spyOn(addExpenseStub, 'add')
    await sut.handle(mockAddExpenseParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddExpenseParams())
  })
  it('Should return 400 if value is less than 1', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ date: new Date(), name: 'invalid_expense', value: -1 })
    expect(result).toEqual(badRequest(new InvalidParamError('value must be greater than 0')))
  })
  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockAddExpenseParams())
    expect(result).toEqual(ok({
      name: 'expense',
      value: 200,
      date: new Date()
    }))
  })
})
