import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'
import { AddCategory } from '@/domain/usecases/category/add-category'

export class DbAddCategory implements AddCategory {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository, private readonly addCategoryRepository: AddCategoryRepository) {}
  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    const user = await this.loadAccountByIdRepository.loadById(params.userId)
    if (!user) return null
    await this.addCategoryRepository.add(params)
    return true
  };
}
