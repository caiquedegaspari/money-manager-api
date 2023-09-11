import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddExpenseController implements Controller {
  constructor (private readonly addExpense: AddExpense) {}
  async handle (request: AddExpenseController.Params): Promise<HttpResponse> {
    if (!request.name) return badRequest(new MissingParamError('name'))
    if (!request.value) return badRequest(new MissingParamError('value'))
    if (!request.date) return badRequest(new MissingParamError('date'))
    if (request.value < 1) return badRequest(new InvalidParamError('value must be greater than 0'))

    const expense = await this.addExpense.add(request)
    return ok(expense)
  }
}

export namespace AddExpenseController {
  export type Params = {
    name: string
    value: number
    date: Date
    categoryId?: number
  }
}
