export interface AddExpense {
  add: (params: AddExpense.Params) => Promise<AddExpense.Result>
}

export namespace AddExpense {
  export type Params = {
    name: string
    value: number
    date: Date
    userId: number
    installmentsAmount?: number
    categoryId?: number
  }

  export type Result = {
    name: string
    value: number
    categoryId?: number
    date: Date
  }
}
