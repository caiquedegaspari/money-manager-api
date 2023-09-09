import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateMonthlyIncomeController implements Controller {
  constructor (private readonly updateMonthlyIncome: UpdateMonthlyIncome) { }
  async handle (request: UpdateMonthlyIncomeController.Request): Promise<HttpResponse> {
    try {
      if (!request.userId) return badRequest(new MissingParamError('userId'))
      if (!request.value) return badRequest(new MissingParamError('value'))
      await this.updateMonthlyIncome.updateMonthlyIncome(request)
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
