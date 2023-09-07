import { Authentication } from '@/domain/usecases/account/authentication'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class AuthenticationController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    await this.authentication.auth(request)
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
