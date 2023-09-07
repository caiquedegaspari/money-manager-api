import { AuthenticationController } from '@/presentation/controllers/account/authentication-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '../../usecases/account/db-authentication-factory'

export const makeAuthenticationController = (): Controller => {
  return new AuthenticationController(makeDbAuthentication())
}
