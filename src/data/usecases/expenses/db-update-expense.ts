import { LoadExpenseByIdRepository } from '@/data/protocols/db/expenses/load-expense-by-id-repository'
import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'

export class DbUpdateExpense implements UpdateExpense {
  constructor (private readonly loadExpenseByIdRepository: LoadExpenseByIdRepository) {}
  async update (params: UpdateExpense.Params): UpdateExpense.Result {
    const expenseToUpdate = await this.loadExpenseByIdRepository.loadById(params.expenseId)
    if (!expenseToUpdate) return null
    return await Promise.resolve(true)
  };
}
