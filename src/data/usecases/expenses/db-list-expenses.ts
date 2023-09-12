import { ListExpensesRepository } from '@/data/protocols/db/expenses'
import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'

export class DbListExpenses implements ListExpenses {
  constructor (private readonly listExpensesRepository: ListExpensesRepository) {}
  async list (params: ListExpenses.Params): Promise<ListExpenses.Result> {
    const expenses = await this.listExpensesRepository.list(params)
    return { expenses, percentages: [] }
  };
}
