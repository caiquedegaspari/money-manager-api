import { Authentication } from '@/domain/usecases/account/authentication'
import { mockAuthenticationParams } from '../../mocks'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
      return await Promise.resolve({
        name: 'any_name',
        password: 'password'
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    loadAccountByEmailRepositoryStub,
    sut
  }
}

describe('Authentication usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(loadSpy).toHaveBeenCalledWith(params.email)
  })
  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const params = mockAuthenticationParams()
    const response = await sut.auth(params)
    expect(response).toBeNull()
  })
})
