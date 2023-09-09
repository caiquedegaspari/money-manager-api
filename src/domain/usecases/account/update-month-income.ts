export interface UpdateMonthIncome {
  updateMonthIncome: (params: UpdateMonthIncome.Params) => Promise<UpdateMonthIncome.Result>
}

export namespace UpdateMonthIncome {
  export type Params = {
    userId: number
    value: number
  }
  export type Result = number | null
}
