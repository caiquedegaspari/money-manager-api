import { ListExpensesRepository } from '@/data/protocols/db/expenses'
import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'

export class DbListExpenses implements ListExpenses {
  constructor (private readonly listExpensesRepository: ListExpensesRepository) {}
  async list (params: ListExpenses.Params): Promise<ListExpenses.Result> {
    await this.listExpensesRepository.list(params)
    return await Promise.resolve({
      expenses: [{
        name: 'any',
        value: 200
      }],
      percentages: [{
        category: 'any category',
        percent: 100,
        totalSpent: 200
      }]
    })
  };
}
