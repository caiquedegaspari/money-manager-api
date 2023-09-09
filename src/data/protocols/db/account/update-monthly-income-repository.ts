export interface UpdateMonthlyIncomeRepository {
  updateMonthlyIncome: (params: UpdateMonthlyIncomeRepository.Params) => Promise<UpdateMonthlyIncomeRepository.Result>
}

export namespace UpdateMonthlyIncomeRepository {
  export type Params = {
    userId: number
    value: number
  }
  export type Result = number
}
