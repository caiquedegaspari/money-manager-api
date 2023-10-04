import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import prisma from '../client'
import { LoadCategoryByAccountIdRepository } from '@/data/protocols/db/category/load-categories-by-account-id-repository'

export class CategoryPrismaRepository implements AddCategoryRepository, LoadCategoryByAccountIdRepository {
  async add (params: AddCategoryRepository.Params): Promise<void> {
    await prisma.category.create({
      data: {
        ...params
      }
    })
  }

  async loadByAccountId (params: number): Promise<LoadCategoryByAccountIdRepository.Result> {
    return await prisma.category.findMany({
      where: {
        userId: params
      }
    })
  }
}
