import { AddExpenseRepositoryParam } from './add-expense-repository'

export interface AddManyExpensesRepository {
  addMany: (params: AddManyExpensesRepository.Params) => Promise<AddManyExpensesRepository.Result>
}

export namespace AddManyExpensesRepository {
  export type Params = AddExpenseRepositoryParam[]

  export type Result = {
    name: string
    value: number
    date: Date
    categoryId?: number
  }
}
