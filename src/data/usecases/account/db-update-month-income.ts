import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { UpdateMonthIncome } from '@/domain/usecases/account/update-month-income'

export class DbUpdateMonthIncome implements UpdateMonthIncome {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}
  async updateMonthIncome (params: UpdateMonthIncome.Params): Promise<UpdateMonthIncome.Result> {
    const user = await this.loadAccountByIdRepository.loadById(params.userId)
    if (!user) return null
    return await Promise.resolve(1)
  }
}
