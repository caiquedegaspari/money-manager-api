import { UpdateExpense } from '@/domain/usecases/expenses/update-expense'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class UpdateExpenseController implements Controller {
  constructor (private readonly updateExpense: UpdateExpense) {}
  async handle (request: UpdateExpenseController.Params): Promise<HttpResponse> {
    try {
      if (request.value < 0) return badRequest(new InvalidParamError('value must be greater than 0'))
      const result = await this.updateExpense.update(request)
      return ok(result)
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
