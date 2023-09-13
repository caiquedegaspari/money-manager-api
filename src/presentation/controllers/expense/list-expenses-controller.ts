import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class ListExpensesController implements Controller {
  constructor (private readonly listExpenses: ListExpenses) {}
  async handle (request: ListExpensesController.Params): Promise<HttpResponse> {
    try {
      if (!request.endDate) badRequest(new MissingParamError('endDate'))
      if (!request.startDate) badRequest(new MissingParamError('startDate'))
      if (!request.userId) badRequest(new MissingParamError('userId'))

      const expenses = await this.listExpenses.list(request)
      return ok(expenses)
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace ListExpensesController {
  export type Params = {
    userId: number
    startDate: Date
    endDate: Date
  }
}
