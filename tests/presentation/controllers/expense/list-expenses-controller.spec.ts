import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { ListExpensesController } from '@/presentation/controllers/expense/list-expenses-controller'
import { ok, serverError } from '@/presentation/helpers'
import { mockLoadAccountById } from '../mocks/account'

type SutTypes = {
  listExpensesStub: ListExpenses
  loadAccountByIdStub: LoadAccountById
  sut: ListExpensesController
}

const nextMonth = new Date().setMonth(new Date().getMonth() + 1)

const mockRequest = (): ListExpensesController.Params => ({
  userId: 1,
  startDate: new Date(),
  endDate: new Date(nextMonth)
})

const mockListExpensesReturn = (): ListExpenses.Result => ({
  expenses: [{ name: 'gasto 1', value: 200, category: 'Cartão de crédito' }],
  percentages: [{ category: 'Cartão de crédito', percent: 100, totalSpent: 200 }]
})

const mockListExpenses = (): ListExpenses => {
  class ListExpensesStub implements ListExpenses {
    async list (params: ListExpenses.Params): Promise<ListExpenses.Result> {
      return await Promise.resolve(mockListExpensesReturn())
    }
  }
  return new ListExpensesStub()
}

const makeSut = (): SutTypes => {
  const listExpensesStub = mockListExpenses()
  const loadAccountByIdStub = mockLoadAccountById()
  const sut = new ListExpensesController(listExpensesStub, loadAccountByIdStub)
  return {
    sut,
    listExpensesStub,
    loadAccountByIdStub
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
  it('Should call LoadAccountById with correct values', async () => {
    const { loadAccountByIdStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'loadById')
    const params = mockRequest()
    await sut.handle(params)
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  it('Should return 200 on ListExpenses success', async () => {
    const { sut } = makeSut()

    const result = await sut.handle(mockRequest())
    expect(result).toEqual(ok(mockListExpensesReturn()))
  })
  it('Should return 500 if ListExpenses throws', async () => {
    const { listExpensesStub, sut } = makeSut()
    jest.spyOn(listExpensesStub, 'list').mockReturnValueOnce(Promise.reject(new Error()))

    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  it('Should return 500 if LoadAccountById throws', async () => {
    const { loadAccountByIdStub, sut } = makeSut()
    jest.spyOn(loadAccountByIdStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
