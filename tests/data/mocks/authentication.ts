import { Authentication } from '@/domain/usecases/account/authentication'

export const mockAuthenticationParams = (): Authentication.Params => ({ email: 'any_email@mail.com', password: 'any_password' })
