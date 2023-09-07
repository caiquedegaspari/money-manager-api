import { Authentication } from '@/domain/usecases/account/authentication'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AuthenticationController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    try {
      if (!request.email) return badRequest(new MissingParamError('email'))
      if (!request.password) return badRequest(new MissingParamError('password'))

      const response = await this.authentication.auth(request)
      if (!response) return unauthorized()
      return ok(response)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
