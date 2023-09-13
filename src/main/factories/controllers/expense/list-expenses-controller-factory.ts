import { ListExpensesController } from '@/presentation/controllers/expense/list-expenses-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbListExpenses } from '../../usecases/expenses/list-expenses-factory'

export const makeListExpensesController = (): Controller => {
  return new ListExpensesController(makeDbListExpenses())
}
