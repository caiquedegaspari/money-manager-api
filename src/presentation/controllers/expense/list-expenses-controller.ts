import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class ListExpensesController implements Controller {
  constructor (private readonly listExpenses: ListExpenses) {}
  async handle (request: ListExpensesController.Params): Promise<HttpResponse> {
    const expenses = await this.listExpenses.list(request)
    return ok(expenses)
  }
}

export namespace ListExpensesController {
  export type Params = {
    userId: number
    startDate: Date
    endDate: Date
  }
}
