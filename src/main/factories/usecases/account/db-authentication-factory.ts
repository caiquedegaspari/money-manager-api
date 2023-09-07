import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountPrismaRepository = new AccountPrismaRepository()
  const hashComparer = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountPrismaRepository, hashComparer, jwtAdapter)
}
