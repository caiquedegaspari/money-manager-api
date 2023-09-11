export interface AddExpenseRepository {
  add: (params: AddExpenseRepository.Params) => Promise<AddExpenseRepository.Result>
}

export namespace AddExpenseRepository {
  export type Params = {
    name: string
    value: number
    installmentsAmount?: number
    categoryId?: number
  }

  export type Result = {
    name: string
    value: number
    categoryId?: number
  }
}
