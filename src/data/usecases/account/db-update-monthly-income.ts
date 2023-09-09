import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { UpdateMonthlyIncomeRepository } from '@/data/protocols/db/account/update-monthly-income-repository'
import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'

export class DbUpdateMonthlyIncome implements UpdateMonthlyIncome {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly updateMonthlyIncomeRepository: UpdateMonthlyIncomeRepository
  ) {}

  async updateMonthlyIncome (params: UpdateMonthlyIncome.Params): Promise<UpdateMonthlyIncome.Result> {
    const user = await this.loadAccountByIdRepository.loadById(params.userId)
    if (!user) return null
    const monthlyIncome = await this.updateMonthlyIncomeRepository.updateMonthlyIncome({ userId: params.userId, value: params.value })
    return monthlyIncome
  }
}
