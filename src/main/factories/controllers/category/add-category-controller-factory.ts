import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddCategory } from '../../usecases/category/add-category-factory'

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeDbAddCategory())
}
