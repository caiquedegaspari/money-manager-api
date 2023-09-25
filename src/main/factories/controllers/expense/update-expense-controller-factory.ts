import { UpdateExpenseController } from '@/presentation/controllers/expense/update-expense-controller'
import { makeDbUpdateExpense } from '../../usecases/expenses/update-expense-factory'
import { Controller } from '@/presentation/protocols'

export const makeUpdateExpenseController = (): Controller => {
  return new UpdateExpenseController(makeDbUpdateExpense())
}
