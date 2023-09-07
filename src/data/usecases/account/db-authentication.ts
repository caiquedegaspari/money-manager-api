import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { Authentication } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: Authentication.Params): Promise<Authentication.Result | null> {
    const user = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!user) return null
    const isValidPassword = await this.hashComparer.compare(authentication.password, user.password)
    if (!isValidPassword) return null
    const accessToken = await this.encrypter.encrypt(String(user.id))
    return { accessToken, name: user.name }
  }
}
