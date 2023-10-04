import { DbLoadCategoryByAccountId } from '@/data/usecases/category/db-load-categories-by-account-id'
import { LoadCategoryByAccountId } from '@/domain/usecases/category/load-categories-by-account-id'
import { CategoryPrismaRepository } from '@/infra/db/prisma/category/category-prisma-repository'

export const makeDbLoadCategoryByAccountId = (): LoadCategoryByAccountId => {
  const categoryPrismaRepository = new CategoryPrismaRepository()
  return new DbLoadCategoryByAccountId(categoryPrismaRepository)
}
