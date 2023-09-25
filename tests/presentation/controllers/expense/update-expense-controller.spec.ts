import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { UpdateExpenseController } from '@/presentation/controllers/expense/update-expense-controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'

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
  it('Should return 400 if value is less than 1', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({ value: -1, expenseId: 1 })
    expect(result).toEqual(badRequest(new InvalidParamError('value must be greater than 0')))
  })
  it('Should return 500 if UpdateExpenses throws', async () => {
    const { updateExpenseStub, sut } = makeSut()
    jest.spyOn(updateExpenseStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))

    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  it('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(true))
  })
})
