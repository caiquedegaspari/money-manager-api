export interface ListExpenses {
  list: (params: ListExpenses.Params) => Promise<ListExpenses.Result>
}

type Expense = {
  name: string
  value: number
  category?: string
}

export type CategoryPercentage = {
  category: string
  percent: number
  totalSpent: number
}

export namespace ListExpenses {
  export type Params = {
    startDate: Date
    endDate: Date
    userId: number
  }
  export type Result = {
    expenses: Expense[]
    percentages: CategoryPercentage[]
  }
}
