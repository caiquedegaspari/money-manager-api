import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { UpdateMonthIncome } from '@/domain/usecases/account/update-month-income'

export class DbUpdateMonthIncome implements UpdateMonthIncome {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}
  async updateMonthIncome (params: UpdateMonthIncome.Params): Promise<number> {
    await this.loadAccountByIdRepository.loadById(params.userId)
    return await Promise.resolve(1)
  }
}
