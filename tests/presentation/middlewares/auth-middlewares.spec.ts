import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { forbidden, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { DecodedToken, Decrypter } from '@/data/protocols/criptography/decrypter'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'

const mockFakeRequest = (): AuthMiddleware.Request => ({
  accessToken: 'bearer any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByIdStub: LoadAccountById
  decrypterStub: Decrypter
}

const mockLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById (params: number): Promise<LoadAccountById.Result> {
      return await Promise.resolve({
        id: 1
      })
    }
  }
  return new LoadAccountByIdStub()
}

const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<DecodedToken> {
      return { iat: 123, exp: new Date().getTime() + 225, id: '1' }
    }
  }
  return new DecrypterStub()
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByIdStub = mockLoadAccountById()
  const decrypterStub = mockDecrypter()
  const sut = new AuthMiddleware(decrypterStub, loadAccountByIdStub)
  return {
    sut,
    loadAccountByIdStub,
    decrypterStub
  }
}

describe('Auth Middlewares', () => {
  it('Should return 403 if token is not provided in Authorization header', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call Decrypt with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.handle(mockFakeRequest())
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should call LoadAccountById with correct values', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdStub, 'loadById')
    await sut.handle(mockFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith(1)
  })

  it('Should return 403 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest.spyOn(loadAccountByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(forbidden(new UserNotFoundError()))
  })

  it('Should return 403 if token is expired', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve({
      exp: 0,
      iat: 123,
      id: '1'
    }))
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(unauthorized())
  })

  it('Should return 200 if LoadAccountById returns an account', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(ok({ accountId: 1 }))
  })
})
