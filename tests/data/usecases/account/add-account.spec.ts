import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'

interface SutTypes {
  sut: AddAccount
  addAccountRepositoryStub: AddAccountRepository
  hasherStub: Hasher
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository
}

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherStub()
}

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
      return await Promise.resolve(true)
    }
  }
  return new AddAccountRepositoryStub()
}

const mockCheckAccountByEmailRepository = (): CheckAccountByEmailRepository => {
  class CheckAccountByEmailRepositoryStub implements CheckAccountByEmailRepository {
    async checkByEmail (params: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
      return await Promise.resolve(false)
    }
  }
  return new CheckAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository()
  const hasherStub = mockHasher()
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository()
  const sut = new DbAddAccount(addAccountRepositoryStub, hasherStub, checkAccountByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    hasherStub,
    checkAccountByEmailRepositoryStub
  }
}

const mockAddAccountParams = (): AddAccount.Params => ({
  email: 'anyemail@mail.com',
  name: 'any name',
  password: 'any_password'
})

describe('Test Add Account usecase', () => {
  it('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(hasherSpy).toHaveBeenCalledWith(params.password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const params = mockAddAccountParams()
    const promise = sut.add(params)
    await expect(promise).rejects.toThrowError()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'anyemail@mail.com',
      name: 'any name',
      password: 'hashed_value'
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const params = mockAddAccountParams()
    const promise = sut.add(params)
    await expect(promise).rejects.toThrowError()
  })

  it('Should return true on success', async () => {
    const { sut } = makeSut()
    const res = await sut.add(mockAddAccountParams())
    expect(res).toBe(true)
  })

  it('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const res = await sut.add(mockAddAccountParams())
    expect(res).toBe(false)
  })

  it('Should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    const checkSpy = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(checkSpy).toHaveBeenCalledWith(params.email)
  })

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
    const params = mockAddAccountParams()
    const res = await sut.add(params)
    expect(res).toBe(false)
  })
})
