import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountById } from '../usecases/account/db-load-account-by-id-factory'
import env from '@/main/config/env'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(new JwtAdapter(env.jwtSecret), makeDbLoadAccountById())
}
