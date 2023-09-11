import { AddExpenseRepository } from '@/data/protocols/db/expenses'
import { AddExpense } from '@/domain/usecases/expenses/add-expense'

export class DbAddExpenses implements AddExpense {
  constructor (private readonly addExpenseRepository: AddExpenseRepository) {}
  async add (params: AddExpense.Params): Promise<AddExpense.Result> {
    await this.addExpenseRepository.add(params)
    return await Promise.resolve({
      name: 'name',
      value: 123
    })
  };
}
