export interface ListExpensesRepository {
  list: (params: ListExpensesRepository.Params) => Promise<ListExpensesRepository.Result>
}

type Expense = {
  name: string
  value: number
  category?: string
}

export namespace ListExpensesRepository {
  export type Params = {
    startDate: Date
    endDate: Date
    userId: number
  }
  export type Result = Expense[]

}
