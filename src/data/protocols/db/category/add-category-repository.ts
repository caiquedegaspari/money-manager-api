export interface AddCategoryRepository {
  add: (params: AddCategoryRepository.Params) => Promise<void>
}

export namespace AddCategoryRepository {
  export type Params = {
    name: string
    userId: number
  }
}
