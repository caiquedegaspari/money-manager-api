import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { ListExpenses } from '@/domain/usecases/expenses/list-expenses'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class ListExpensesController implements Controller {
  constructor (private readonly listExpenses: ListExpenses, private readonly loadAccountById: LoadAccountById) {}
  async handle (request: ListExpensesController.Params): Promise<HttpResponse> {
    try {
      const { userId, ...data } = request
      if (!data.endDate) return badRequest(new MissingParamError('endDate'))
      if (!data.startDate) return badRequest(new MissingParamError('startDate'))
      if (!userId) return badRequest(new MissingParamError('userId'))
      const user = await this.loadAccountById.loadById(userId)
      const expenses = await this.listExpenses.list({ ...data, userId: +userId })
      if (!user) return badRequest(new UserNotFoundError())
      const rateValue = user?.monthlyIncome - expenses.total

      return ok({ rate: rateValue, ...expenses })
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
