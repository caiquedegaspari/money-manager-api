import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeAddCategoryController } from '../factories/controllers/category/add-category-controller-factory'
import { makeLoadCategoriesByAccountIdController } from '../factories/controllers/category/load-category-by-account-id-controller-factory'

export default (router: Router): void => {
  router.post('/add-category', auth, adaptRoute(makeAddCategoryController()))
  router.get('/load-categories', auth, adaptRoute(makeLoadCategoriesByAccountIdController()))
}
