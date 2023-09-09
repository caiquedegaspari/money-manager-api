import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export class DbLoadAccountById implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) { }

  async loadById (params: LoadAccountById.Params): Promise<LoadAccountById.Result> {
    return await this.loadAccountByIdRepository.loadById(params)
  };
}
