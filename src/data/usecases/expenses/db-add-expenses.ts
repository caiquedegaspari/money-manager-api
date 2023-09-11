import { AddExpenseRepository } from '@/data/protocols/db/expenses'
import { AddManyExpensesRepository } from '@/data/protocols/db/expenses/add-many-expenses-repository'
import { AddExpense } from '@/domain/usecases/expenses/add-expense'

export class DbAddExpenses implements AddExpense {
  constructor (
    private readonly addExpenseRepository: AddExpenseRepository,
    private readonly addManyExpensesRepository: AddManyExpensesRepository
  ) {}

  async add (params: AddExpense.Params): Promise<AddExpense.Result> {
    if (params.installmentsAmount && params.installmentsAmount > 1) {
      const expenses: AddManyExpensesRepository.Params = []
      for (let i = 0; i < params.installmentsAmount; i++) {
        expenses.push({ name: params.name, value: params.value, categoryId: params.categoryId })
      }
      const expense = await this.addManyExpensesRepository.addMany(expenses)
      return expense
    }
    const expense = await this.addExpenseRepository.add(params)
    return expense
  };
}
