import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { AddCategory } from '@/domain/usecases/category/add-category'

export class DbAddCategory implements AddCategory {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}
  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    const user = await this.loadAccountByIdRepository.loadById(params.userId)
    if (!user) return null
    return false
  };
}
