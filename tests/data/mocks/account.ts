import { AddAccount } from '@/domain/usecases/account/add-account'

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: 'anyemail@mail.com',
  name: 'any name',
  password: 'any_password'
})
