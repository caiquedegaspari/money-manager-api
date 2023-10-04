import { LoadCategoryByAccountId } from '@/domain/usecases/category/load-categories-by-account-id'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadCategoryiesByAccountIdController implements Controller {
  constructor (private readonly loadCategoriesByAccountId: LoadCategoryByAccountId) { }
  async handle (request: LoadCategoryiesByAccountIdontroller.Params): Promise<HttpResponse> {
    try {
      if (!request.userId) return badRequest(new MissingParamError('userId'))

      const res = await this.loadCategoriesByAccountId.loadByAccountId({ userId: +request.userId })
      return ok(res)
    } catch (err) {
      return serverError(err as Error)
    }
  };
}

export namespace LoadCategoryiesByAccountIdontroller {
  export type Params = {
    userId: number
  }
}
