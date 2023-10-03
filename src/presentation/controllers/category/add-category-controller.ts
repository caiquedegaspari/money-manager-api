import { AddCategory } from '@/domain/usecases/category/add-category'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}
  async handle (request: AddCategoryController.Params): Promise<HttpResponse> {
    try {
      if (!request.name) return badRequest(new MissingParamError('name'))
      if (!request.userId) return badRequest(new MissingParamError('userId'))

      const res = await this.addCategory.add(request)
      if (!res) return badRequest(new UserNotFoundError())
      return ok(res)
    } catch (err) {
      return serverError(err as Error)
    }
  };
}

export namespace AddCategoryController {
  export type Params = {
    userId: number
    name: string
  }
}
