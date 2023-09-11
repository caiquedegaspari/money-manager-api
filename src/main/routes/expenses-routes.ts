import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateMonthlyIncomeController } from '../factories/controllers/account/update-monthly-income-repository-factory'
import { auth } from '../middlewares/auth'
import { makeAddExpenseController } from '../factories/controllers/expense/add-expense-controller-factory'

export default (router: Router): void => {
  router.patch('/update-monthly-income', auth, adaptRoute(makeUpdateMonthlyIncomeController()))
  router.post('/add-expense', auth, adaptRoute(makeAddExpenseController()))
}
