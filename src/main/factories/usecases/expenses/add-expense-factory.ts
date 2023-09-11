import { DbAddExpenses } from '@/data/usecases/expenses/db-add-expenses'
import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { ExpensePrismaRepository } from '@/infra/db/prisma/expense/expense-prisma-repository'

export const makeDbAddExpense = (): AddExpense => {
  const expensePrismaRepository = new ExpensePrismaRepository()
  return new DbAddExpenses(expensePrismaRepository, expensePrismaRepository)
}
