import { Authentication } from '@/domain/usecases/account/authentication'
import { mockAuthenticationParams } from '../../mocks'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparer: HashComparer
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
      return await Promise.resolve({
        name: 'any_name',
        password: 'hashed_password'
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparer = mockHashComparer()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparer)
  return {
    loadAccountByEmailRepositoryStub,
    hashComparer,
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
  it('Should call HashComparer with correct values', async () => {
    const { hashComparer, sut } = makeSut()
    const compareSpy = jest.spyOn(hashComparer, 'compare')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(compareSpy).toHaveBeenCalledWith(params.password, 'hashed_password')
  })
  it('Should return null if HashComparer returns false', async () => {
    const { hashComparer, sut } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const params = mockAuthenticationParams()
    const response = await sut.auth(params)
    expect(response).toBeNull()
  })
})
