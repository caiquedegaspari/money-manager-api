import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateMonthlyIncomeController } from '../factories/controllers/account/update-monthly-income-repository-factory'

export default (router: Router): void => {
  router.patch('/update-monthly-income', adaptRoute(makeUpdateMonthlyIncomeController()))
}
