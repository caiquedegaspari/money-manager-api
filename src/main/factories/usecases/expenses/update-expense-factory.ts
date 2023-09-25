import { DbUpdateExpense } from '@/data/usecases/expenses/db-update-expense'
import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { ExpensePrismaRepository } from '@/infra/db/prisma/expense/expense-prisma-repository'

export const makeDbUpdateExpense = (): UpdateExpense => {
  const expensePrismaRepository = new ExpensePrismaRepository()
  return new DbUpdateExpense(expensePrismaRepository, expensePrismaRepository)
}
