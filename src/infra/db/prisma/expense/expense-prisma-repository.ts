import { AddExpenseRepository, ListExpensesRepository } from '@/data/protocols/db/expenses'
import prisma from '../client'
import { AddManyExpensesRepository } from '@/data/protocols/db/expenses/add-many-expenses-repository'

export class ExpensePrismaRepository implements AddExpenseRepository, AddManyExpensesRepository, ListExpensesRepository {
  async add (params: AddExpenseRepository.Params): Promise<AddExpenseRepository.Result> {
    const createdExpense = await prisma.expense.create({ data: params })
    return {
      date: createdExpense.date,
      name: createdExpense.name,
      value: createdExpense.value,
      categoryId: createdExpense.categoryId ?? undefined
    }
  };

  async addMany (params: AddManyExpensesRepository.Params): Promise<AddManyExpensesRepository.Result> {
    await prisma.expense.createMany({ data: params })
    return {
      date: params[0].date,
      name: params[0].name,
      value: params[0].value,
      categoryId: params[0].categoryId ?? undefined
    }
  };

  async list (params: ListExpensesRepository.Params): Promise<ListExpensesRepository.Result> {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: params.userId,
        date: { gte: params.startDate, lte: params.endDate }
      },
      include: {
        category: true
      }
    })
    return expenses.map((expense) => ({
      name: expense.name,
      value: expense.value,
      category: expense.category?.name
    }))
  }
}
