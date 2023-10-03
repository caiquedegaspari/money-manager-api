export interface AddCategory {
  add: (params: AddCategory.Params) => Promise<void>
}

export namespace AddCategory {
  export type Params = {
    name: string
    userId: number
  }
}
