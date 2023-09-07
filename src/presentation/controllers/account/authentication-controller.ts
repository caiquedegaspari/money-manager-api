import { Authentication } from '@/domain/usecases/account/authentication'
import { unauthorized } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AuthenticationController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    const response = await this.authentication.auth(request)
    if (!response) return unauthorized()
    return await Promise.resolve({
      body: '',
      statusCode: 200
    })
  }
}

export namespace AuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
