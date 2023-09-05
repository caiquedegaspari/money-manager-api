import { AddAccount } from '@/domain/usecases/account/add-account'
import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { ServerError } from '@/presentation/errors/server-error'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { mockAddAccountParams } from '@/tests/data/mocks'

interface SutTypes {
  addAccountStub: AddAccount
  sut: SignUpController
}

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (params: AddAccount.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addAccountStub)
  return {
    addAccountStub,
    sut
  }
}

describe('SignUp Controller', () => {
  it('Should call Add Account with correct values', async () => {
    const { addAccountStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const request = mockAddAccountParams()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request)
  })
  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const res = await sut.handle(mockAddAccountParams())
    expect(res).toEqual(ok(true))
  })
  it('Should return 403 if AddAccount returns false', async () => {
    const { addAccountStub, sut } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(false))

    const res = await sut.handle(mockAddAccountParams())
    expect(res).toEqual(forbidden(new EmailInUseError()))
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAddAccountParams())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
