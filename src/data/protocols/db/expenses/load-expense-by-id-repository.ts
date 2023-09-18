export interface LoadExpenseByIdRepository {
  loadById: (params: LoadExpenseByIdRepository.Params) => Promise<LoadExpenseByIdRepository.Result>
}

export namespace LoadExpenseByIdRepository {
  export type Params = number
  export type Result = {
    id: number
    name: string
    value: number
  } | null
}
