import { AddExpenseController } from '@/presentation/controllers/expense/add-expense-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddExpense } from '../../usecases/expenses/add-expense-factory'

export const makeAddExpenseController = (): Controller => {
  return new AddExpenseController(makeDbAddExpense())
}
