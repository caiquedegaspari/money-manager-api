import { UpdateMonthlyIncome } from '@/domain/usecases/account/update-month-income'
import { UpdateMonthlyIncomeController } from '@/presentation/controllers/account/update-monthly-income'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'
import { badRequest, forbidden } from '@/presentation/helpers'

interface SutTypes {
  UpdateMonthlyIncomeStub: UpdateMonthlyIncome
  sut: UpdateMonthlyIncomeController
}

const mockUpdateMonthlyIncome = (): UpdateMonthlyIncome => {
  class UpdateMonthlyIncomeStub implements UpdateMonthlyIncome {
    async updateMonthlyIncome (params: UpdateMonthlyIncome.Params): Promise<UpdateMonthlyIncome.Result> {
      return await Promise.resolve(2000)
    }
  }
  return new UpdateMonthlyIncomeStub()
}

const makeSut = (): SutTypes => {
  const UpdateMonthlyIncomeStub = mockUpdateMonthlyIncome()
  const sut = new UpdateMonthlyIncomeController(UpdateMonthlyIncomeStub)
  return {
    UpdateMonthlyIncomeStub,
    sut
  }
}

describe('UpdateMonthlyIncome Controller', () => {
  it('Should call UpdateMonthlyIncome with correct values', async () => {
    const { UpdateMonthlyIncomeStub, sut } = makeSut()
    const updateSpy = jest.spyOn(UpdateMonthlyIncomeStub, 'updateMonthlyIncome')
    const request: UpdateMonthlyIncome.Params = {
      userId: 1,
      value: 2000
    }
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request)
  })

  it('Should return 403 if UpdateMonthlyIncome returns null', async () => {
    const { UpdateMonthlyIncomeStub, sut } = makeSut()
    jest.spyOn(UpdateMonthlyIncomeStub, 'updateMonthlyIncome').mockReturnValueOnce(Promise.resolve(null))
    const request: UpdateMonthlyIncome.Params = {
      userId: 1,
      value: 2000
    }
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new UserNotFoundError()))
  })

  it('Should return 400 if monthlyIncome is 100', async () => {
    const { sut } = makeSut()
    const request: UpdateMonthlyIncome.Params = {
      userId: 1,
      value: 25
    }
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new InvalidParamError('monthly income must be greater than 100')))
  })
})
