import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError, unauthorized } from '../helpers'
import { HttpResponse, Middleware } from '../protocols'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountById: LoadAccountById
  ) { }

  async handle (httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!httpRequest.accessToken) return forbidden(new AccessDeniedError())
      const [, token] = httpRequest.accessToken.split(' ', 2)
      const decoded = await this.decrypter.decrypt(token)

      if (!decoded) return serverError({ name: 'Server Error', message: 'Error on decrypt token' })
      if (decoded.exp * 1000 < new Date().getTime()) return unauthorized()
      const user = await this.loadAccountById.loadById(+decoded.id)
      if (!user) return forbidden(new UserNotFoundError())
      return ok({ accountId: user.id })
    } catch (err) {
      return serverError(err as Error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
