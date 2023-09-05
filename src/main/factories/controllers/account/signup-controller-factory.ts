import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddAccount } from '../../usecases/account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount())
}
