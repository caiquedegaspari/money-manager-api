export interface AddExpenseRepository {
  add: (params: AddExpenseRepository.Params) => Promise<AddExpenseRepository.Result>
}

export type AddExpenseRepositoryParam = {
  name: string
  value: number
  date: Date
  categoryId?: number
}
export namespace AddExpenseRepository {
  export type Params = AddExpenseRepositoryParam

  export type Result = {
    name: string
    value: number
    date: Date
    categoryId?: number
  }
}
