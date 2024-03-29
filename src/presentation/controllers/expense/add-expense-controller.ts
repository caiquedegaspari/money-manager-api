import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddExpenseController implements Controller {
  constructor (private readonly addExpense: AddExpense) {}
  async handle (request: AddExpenseController.Params): Promise<HttpResponse> {
    try {
      const { date, ...data } = request
      if (!request.name) return badRequest(new MissingParamError('name'))
      if (!request.value) return badRequest(new MissingParamError('value'))
      if (!request.date) return badRequest(new MissingParamError('date'))
      if (!request.userId) return badRequest(new MissingParamError('userId'))
      if (request.value < 1) return badRequest(new InvalidParamError('value must be greater than 0'))

      const expense = await this.addExpense.add({ date: new Date(date), ...data })
      return ok(expense)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AddExpenseController {
  export type Params = {
    name: string
    value: number
    date: Date
    userId: number
    categoryId?: number
    installmentsAmount?: number
  }
}
