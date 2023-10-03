import { AddCategory } from '@/domain/usecases/category/add-category'
import { DbAddCategory } from '@/data/usecases/category/db-add-category'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account'
import { mockLoadAccountByIdRepository } from '../../mocks'

interface SutTypes {
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  sut: AddCategory
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new DbAddCategory(loadAccountByIdRepositoryStub)

  return {
    sut,
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
})
