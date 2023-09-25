import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { UpdateExpenseController } from '@/presentation/controllers/expense/update-expense-controller'

type SutTypes = {
  updateExpenseStub: UpdateExpense
  sut: UpdateExpenseController
}

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
    await sut.handle({ expenseId: 1, value: 200 })
    expect(updateSpy).toHaveBeenCalledWith({ expenseId: 1, value: 200 })
  })
})
