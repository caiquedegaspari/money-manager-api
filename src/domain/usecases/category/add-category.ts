export interface AddCategory {
  add: (params: AddCategory.Params) => Promise<AddCategory.Result>
}

export namespace AddCategory {
  export type Params = {
    name: string
    userId: number
  }
  export type Result = boolean | null
}
