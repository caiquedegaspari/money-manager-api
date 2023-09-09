import { Controller } from '@/presentation/protocols'
import { UpdateMonthlyIncomeController } from '@/presentation/controllers/account/update-monthly-income'
import { makeDbUpdateMonthlyIncome } from '../../usecases/account/db-update-monthly-income-factory'

export const makeUpdateMonthlyIncomeController = (): Controller => {
  return new UpdateMonthlyIncomeController(makeDbUpdateMonthlyIncome())
}
