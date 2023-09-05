import { AddAccount } from '@/domain/usecases/account/add-account'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const res = await this.addAccount.add(request)
      if (!res) return forbidden(new EmailInUseError())
      return ok(res)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    name: string
    password: string
  }
}
