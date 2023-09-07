import { Authentication } from '@/domain/usecases/account/authentication'
import { mockAuthenticationParams } from '../../mocks'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
      return await Promise.resolve({
        id: 1,
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

const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('encrypted_value')
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub)
  return {
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
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
    const { hashComparerStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(compareSpy).toHaveBeenCalledWith(params.password, 'hashed_password')
  })
  it('Should return null if HashComparer returns false', async () => {
    const { hashComparerStub, sut } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const params = mockAuthenticationParams()
    const response = await sut.auth(params)
    expect(response).toBeNull()
  })
  it('Should call Encrypter with correct values', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(encryptSpy).toHaveBeenCalledWith(String(1))
  })
  it('Should return accessToken and name o success', async () => {
    const { sut } = makeSut()
    const res = await sut.auth(mockAuthenticationParams())
    expect(res?.accessToken).toBeDefined()
    expect(res?.name).toBe('any_name')
  })
})
