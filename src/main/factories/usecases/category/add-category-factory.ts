import { DbAddCategory } from '@/data/usecases/category/db-add-category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'
import { CategoryPrismaRepository } from '@/infra/db/prisma/category/category-prisma-repository'

export const makeDbAddCategory = (): AddCategory => {
  const accountPrismaRepository = new AccountPrismaRepository()
  const categoryPrismaRepository = new CategoryPrismaRepository()
  return new DbAddCategory(accountPrismaRepository, categoryPrismaRepository)
}
