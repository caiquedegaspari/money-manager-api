import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import prisma from '../client'

export class CategoryPrismaRepository implements AddCategoryRepository {
  async add (params: AddCategoryRepository.Params): Promise<void> {
    await prisma.category.create({
      data: {
        ...params
      }
    })
  }
}
