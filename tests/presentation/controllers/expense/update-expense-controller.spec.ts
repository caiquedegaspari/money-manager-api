import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { UpdateExpenseController } from '@/presentation/controllers/expense/update-expense-controller'
import { serverError } from '@/presentation/helpers'

type SutTypes = {
  updateExpenseStub: UpdateExpense
  sut: UpdateExpenseController
}

const mockRequest = (): UpdateExpense.Params => ({ expenseId: 1, value: 200 })

const mockUpdateExpense = (): UpdateExpense => {
  class UpdateExpenseStub implements UpdateExpense {
    async update (params: UpdateExpense.Params): UpdateExpense.Result {
      return await Promise.resolve(true)
    }
  }
  return new UpdateExpenseStub()
}

const makeSut = (): SutTypes => {
  const updateExpenseStub = mockUpdateExpense()
  const sut = new UpdateExpenseController(updateExpenseStub)
  return { sut, updateExpenseStub }
}

describe('Update Expense Controller', () => {
  it('Should call UpdateExpense', async () => {
    const { sut, updateExpenseStub } = makeSut()
    const updateSpy = jest.spyOn(updateExpenseStub, 'update')
    const params = mockRequest()
    await sut.handle(params)
    expect(updateSpy).toHaveBeenCalledWith(params)
  })
  it('Should return 500 if UpdateExpenses throws', async () => {
    const { updateExpenseStub, sut } = makeSut()
    jest.spyOn(updateExpenseStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))

    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
