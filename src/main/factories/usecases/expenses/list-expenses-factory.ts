import { DbListExpenses } from '@/data/usecases/expenses/db-list-expenses'
import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { ExpensePrismaRepository } from '@/infra/db/prisma/expense/expense-prisma-repository'

export const makeDbListExpenses = (): ListExpenses => {
  const expenesesPrismaRepository = new ExpensePrismaRepository()
  return new DbListExpenses(expenesesPrismaRepository)
}
