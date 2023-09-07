import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { Authentication } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth (authentication: Authentication.Params): Promise<Authentication.Result | null> {
    const user = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!user) return null
    return await Promise.resolve({
      accessToken: 'access',
      name: 'name'
    })
  }
}
