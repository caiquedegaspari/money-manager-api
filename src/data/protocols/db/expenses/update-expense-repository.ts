export interface UpdateExpenseRepository {
  update: (params: UpdateExpenseRepository.Params) => Promise<UpdateExpenseRepository.Result>
}

export namespace UpdateExpenseRepository {
  export type Params = {
    value: number
    id: number
  }

  export type Result = Promise<void>
}
