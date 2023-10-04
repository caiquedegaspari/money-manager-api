import { LoadCategoryByAccountId } from '@/domain/usecases/category/load-categories-by-account-id'
import { LoadCategoryByAccountIdRepository } from '@/data/protocols/db/category/load-categories-by-account-id-repository'

export class DbLoadCategoryByAccountId implements LoadCategoryByAccountId {
  constructor (private readonly loadCategoryByAccountIdRepository: LoadCategoryByAccountIdRepository) { }
  async loadByAccountId (params: LoadCategoryByAccountId.Params): Promise<LoadCategoryByAccountId.Result> {
    return await this.loadCategoryByAccountIdRepository.loadByAccountId(params.userId)
  };
}
