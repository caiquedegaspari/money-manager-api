import { ListExpensesController } from '@/presentation/controllers/expense/list-expenses-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbListExpenses } from '../../usecases/expenses/list-expenses-factory'
import { makeDbLoadAccountById } from '../../usecases/account/db-load-account-by-id-factory'

export const makeListExpensesController = (): Controller => {
  return new ListExpensesController(makeDbListExpenses(), makeDbLoadAccountById())
}
