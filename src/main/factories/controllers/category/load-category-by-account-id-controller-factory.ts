import { LoadCategoryiesByAccountIdController } from '@/presentation/controllers/category/load-categories-by-account-id'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadCategoryByAccountId } from '../../usecases/category/load-category-by-account-id-factory'

export const makeLoadCategoriesByAccountIdController = (): Controller => {
  return new LoadCategoryiesByAccountIdController(makeDbLoadCategoryByAccountId())
}
