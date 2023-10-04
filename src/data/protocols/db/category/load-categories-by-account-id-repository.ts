export interface LoadCategoryByAccountIdRepository {
  loadByAccountId: (params: LoadCategoryByAccountIdRepository.Params) => Promise<LoadCategoryByAccountIdRepository.Result>
}

export type Category = {
  name: string
  id: number
}

export namespace LoadCategoryByAccountIdRepository {
  export type Params = number

  export type Result = Category[]
}
