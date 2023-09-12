import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { DbListExpenses } from '@/data/usecases/expenses/db-list-expenses'
import { ListExpensesRepository } from '@/data/protocols/db/expenses'

type SutTypes = {
  sut: ListExpenses
  listExpensesRepositoryStub: ListExpensesRepository
}
const nextMonth = new Date().setMonth(new Date().getMonth() + 1)
const mockListExpensesParams = (): ListExpenses.Params => ({ startDate: new Date(), endDate: new Date(nextMonth), userId: 1 })

const mockListExpensesRepository = (): ListExpensesRepository => {
  class ListExpensesRepositoryStub implements ListExpensesRepository {
    async list (params: ListExpensesRepository.Params): Promise<ListExpensesRepository.Result> {
      return await Promise.resolve([{
        name: 'expense 1',
        value: 200,
        category: 'melão'
      }, {
        name: 'expense 2',
        value: 400
      }])
    }
  }
  return new ListExpensesRepositoryStub()
}

const makeSut = (): SutTypes => {
  const listExpensesRepositoryStub = mockListExpensesRepository()
  const sut = new DbListExpenses(listExpensesRepositoryStub)

  return {
    sut,
    listExpensesRepositoryStub
  }
}

describe('ListExpenses Usecase', () => {
  it('Should call ListExpensesRepository with correct values', async () => {
    const { listExpensesRepositoryStub, sut } = makeSut()
    const listSpy = jest.spyOn(listExpensesRepositoryStub, 'list')
    const params = mockListExpensesParams()
    await sut.list(params)
    expect(listSpy).toHaveBeenCalledWith(params)
  })
})
