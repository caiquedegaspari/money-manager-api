import { LoadExpenseByIdRepository } from '@/data/protocols/db/expenses/load-expense-by-id-repository'
import { UpdateExpenseRepository } from '@/data/protocols/db/expenses/update-expense-repository'
import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'

export class DbUpdateExpense implements UpdateExpense {
  constructor (
    private readonly loadExpenseByIdRepository: LoadExpenseByIdRepository,
    private readonly updateExpenseRepository: UpdateExpenseRepository
  ) {}

  async update (params: UpdateExpense.Params): UpdateExpense.Result {
    const expenseToUpdate = await this.loadExpenseByIdRepository.loadById(params.expenseId)
    if (!expenseToUpdate) return null
    await this.updateExpenseRepository.update({ id: params.expenseId, value: params.value })
    return await Promise.resolve(true)
  };
}
