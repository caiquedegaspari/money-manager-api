import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { ListExpensesController } from '@/presentation/controllers/expense/list-expenses-controller'

type SutTypes = {
  listExpensesStub: ListExpenses
  sut: ListExpensesController
}

const nextMonth = new Date().setMonth(new Date().getMonth() + 1)

const mockRequest = (): ListExpensesController.Params => ({
  userId: 1,
  startDate: new Date(),
  endDate: new Date(nextMonth)
})

const mockListExpenses = (): ListExpenses => {
  class ListExpensesStub implements ListExpenses {
    async list (params: ListExpenses.Params): Promise<ListExpenses.Result> {
      return await Promise.resolve({
        expenses: [{ name: 'gasto 1', value: 200, category: 'Cartão de crédito' }],
        percentages: [{ category: 'Cartão de crédito', percent: 100, totalSpent: 200 }]
      })
    }
  }
  return new ListExpensesStub()
}

const makeSut = (): SutTypes => {
  const listExpensesStub = mockListExpenses()
  const sut = new ListExpensesController(listExpensesStub)
  return {
    sut,
    listExpensesStub
  }
}

describe('ListExpensesController', () => {
  it('Should call ListExpenses with correct values', async () => {
    const { listExpensesStub, sut } = makeSut()
    const listSpy = jest.spyOn(listExpensesStub, 'list')
    const params = mockRequest()
    await sut.handle(params)
    expect(listSpy).toHaveBeenCalledWith(params)
  })
})
