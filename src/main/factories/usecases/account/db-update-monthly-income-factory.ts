import { DbUpdateMonthlyIncome } from '@/data/usecases/account/db-update-monthly-income'
import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'

export const makeDbUpdateMonthlyIncome = (): UpdateMonthlyIncome => {
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbUpdateMonthlyIncome(accountPrismaRepository, accountPrismaRepository)
}
