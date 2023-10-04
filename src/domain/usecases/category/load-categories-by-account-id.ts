export interface LoadCategoryByAccountId {
  loadByAccountId: (params: LoadCategoryByAccountId.Params) => Promise<LoadCategoryByAccountId.Result>
}

type Category = {
  name: string
  id: number
}

export namespace LoadCategoryByAccountId {
  export type Params = {
    userId: number
  }
  export type Result = Category[]
}
