import { DbLoadAccountById } from '@/data/usecases/account/db-load-account-by-id'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbLoadAccountById(accountPrismaRepository)
}
