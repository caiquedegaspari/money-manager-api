import { Authentication } from '@/domain/usecases/account/authentication'
import { AuthenticationController } from '@/presentation/controllers/account/authentication-controller'
import { ServerError } from '@/presentation/errors/server-error'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { mockAuthenticationParams } from '@/tests/data/mocks'

interface SutTypes {
  authenticationStub: Authentication
  sut: AuthenticationController
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
      return await Promise.resolve({ accessToken: 'any_token', name: 'any name' })
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const sut = new AuthenticationController(authenticationStub)

  return {
    authenticationStub,
    sut
  }
}

describe('Authentication Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { authenticationStub, sut } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const params = mockAuthenticationParams()
    await sut.handle(params)
    expect(authSpy).toHaveBeenCalledWith(params)
  })
  it('Should return 401 if invalid credentials are provided', async () => {
    const { authenticationStub, sut } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const params = mockAuthenticationParams()
    const res = await sut.handle(params)
    expect(res).toEqual(unauthorized())
  })
  it('Should return 200 om success', async () => {
    const { sut } = makeSut()
    const res = await sut.handle(mockAuthenticationParams())
    expect(res).toEqual(ok({ accessToken: 'any_token', name: 'any name' }))
  })
  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
