import { AddCategory } from '@/domain/usecases/category/add-category'
import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { UserNotFoundError } from '@/presentation/errors/user-not-found-error'
import { badRequest, ok, serverError } from '@/presentation/helpers'

interface SutTypes {
  addCategoryStub: AddCategory
  sut: AddCategoryController
}

const mockAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add (params: AddCategory.Params): Promise<AddCategory.Result> {
      return await Promise.resolve(true)
    }
  }
  return new AddCategoryStub()
}

const makeSut = (): SutTypes => {
  const addCategoryStub = mockAddCategory()
  const sut = new AddCategoryController(addCategoryStub)
  return {
    sut,
    addCategoryStub
  }
}

describe('Add Category Controller', () => {
  it('Should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    await sut.handle({ userId: 1, name: 'expense ' })
    expect(addSpy).toHaveBeenCalledWith({ userId: 1, name: 'expense ' })
  })
  it('Should return 400 if AddCategory returns null', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const res = await sut.handle({ userId: 1, name: 'expense' })
    expect(res).toEqual(badRequest(new UserNotFoundError()))
  })
  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({ userId: 1, name: 'expense' })
    expect(res).toEqual(ok(true))
  })
  it('Should return 500 if addCategory throws', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const res = await sut.handle({ userId: 1, name: 'expense' })
    expect(res).toEqual(serverError(new Error()))
  })
})
