import { Authentication } from '@/domain/usecases/account/authentication'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AuthenticationController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    try {
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
