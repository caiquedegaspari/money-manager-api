import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export const mockLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById (params: number): Promise<LoadAccountById.Result> {
      return await Promise.resolve({
        id: 1,
        monthlyIncome: 200
      })
    }
  }
  return new LoadAccountByIdStub()
}
