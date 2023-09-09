export interface UpdateMonthlyIncome {
  updateMonthlyIncome: (params: UpdateMonthlyIncome.Params) => Promise<UpdateMonthlyIncome.Result>
}

export namespace UpdateMonthlyIncome {
  export type Params = {
    userId: number
    value: number
  }
  export type Result = number | null
}
