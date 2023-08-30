import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { AddAccount } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (params: AddAccount.Params): Promise<boolean> {
    const existentUser = await this.checkAccountByEmailRepository.checkByEmail(params.email)
    if (existentUser) return false
    const { password, ...data } = params
    const hashedPassword = await this.hasher.hash(params.password)
    return await this.addAccountRepository.add({ ...data, password: hashedPassword })
  };
}
