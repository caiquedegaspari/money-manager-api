import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { AddExpenseController } from '@/presentation/controllers/expense/add-expense-controller'
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
})
