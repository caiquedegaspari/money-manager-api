import { AddExpense } from '@/domain/usecases/expenses/add-expense'
import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddExpenseController implements Controller {
  constructor (private readonly addExpense: AddExpense) {}
  async handle (request: AddExpenseController.Params): Promise<HttpResponse> {
    await this.addExpense.add(request)
    return await Promise.resolve(ok(200))
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
