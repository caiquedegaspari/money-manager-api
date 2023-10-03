import { AddCategory } from '@/domain/usecases/category/add-category'
import { DbAddCategory } from '@/data/usecases/category/db-add-category'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { mockLoadAccountByIdRepository } from '../../mocks'
import { AddCategoryRepository } from '@/data/protocols/db/category/add-category-repository'

interface SutTypes {
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  addCategoryRepositoryStub: AddCategoryRepository
  sut: AddCategory
}

const mockAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (params: AddCategoryRepository.Params): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddCategoryRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const addCategoryRepositoryStub = mockAddCategoryRepository()
  const sut = new DbAddCategory(loadAccountByIdRepositoryStub, addCategoryRepositoryStub)

  return {
    sut,
    addCategoryRepositoryStub,
    loadAccountByIdRepositoryStub
  }
}

describe('Add Category', () => {
  it('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.add({ name: 'category', userId: 1 })
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  it('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.add({ name: 'category', userId: 1 })
    expect(response).toBeNull()
  })
  it('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    await sut.add({ name: 'category', userId: 1 })
    expect(addSpy).toHaveBeenCalledWith({ name: 'category', userId: 1 })
  })
  it('Should return true on success', async () => {
    const { sut } = makeSut()
    const res = await sut.add({ name: 'category', userId: 1 })
    expect(res).toBe(true)
  })
})
