import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'

export const makeDbAddAccount = (): AddAccount => {
  const accountPrismaRepository = new AccountPrismaRepository()
  const hasher = new BcryptAdapter()
  return new DbAddAccount(accountPrismaRepository, hasher, accountPrismaRepository)
}
