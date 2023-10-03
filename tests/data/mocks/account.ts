import { AddAccount } from '@/domain/usecases/account/add-account'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account'

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: 'anyemail@mail.com',
  name: 'any name',
  password: 'any_password'
})

export const mockLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
      return await Promise.resolve({
        id: 1,
        email: 'any_mail@mail.com',
        monthlyIncome: 200
      })
    }
  }
  return new LoadAccountByIdRepositoryStub()
}
