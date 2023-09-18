export interface UpdateExpense {
  update: (params: UpdateExpense.Params) => UpdateExpense.Result
}

export namespace UpdateExpense {
  export type Params = {
    expenseId: number
    value: number
  }
  export type Result = Promise<boolean | null>
}
