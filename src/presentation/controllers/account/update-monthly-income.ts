import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateMonthlyIncomeController implements Controller {
  constructor (private readonly updateMonthlyIncome: UpdateMonthlyIncome) { }
  async handle (request: UpdateMonthlyIncomeController.Request): Promise<HttpResponse> {
    try {
      if (!request.userId) return badRequest(new MissingParamError('userId'))
      if (!request.value) return badRequest(new MissingParamError('value'))
      const monthlyIncome = await this.updateMonthlyIncome.updateMonthlyIncome(request)
      if (!monthlyIncome) return forbidden(new UserNotFoundError())
      return ok(20)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UpdateMonthlyIncomeController {
  export type Request = {
    userId: number
    value: number
  }
}
