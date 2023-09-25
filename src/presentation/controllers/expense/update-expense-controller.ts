import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateExpenseController implements Controller {
  constructor (private readonly updateExpense: UpdateExpense) {}
  async handle (request: UpdateExpenseController.Params): Promise<HttpResponse> {
    try {
      await this.updateExpense.update(request)
      return ok(true)
    } catch (err) {
      return serverError(err as Error)
    }
  };
}

export namespace UpdateExpenseController {
  export type Params = {
    expenseId: number
    value: number
  }
}
