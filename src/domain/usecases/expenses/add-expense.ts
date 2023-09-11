export interface AddExpense {
  add: (params: AddExpense.Params) => Promise<AddExpense.Result>
}

export namespace AddExpense {
  export type Params = {
    name: string
    value: number
    installmentsAmount?: number
    categoryId?: number
  }

  export type Result = {
    name: string
    value: string
    categoryId?: number
  }
}
