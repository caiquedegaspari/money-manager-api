export interface LoadAccountById {
  loadById: (params: LoadAccountById.Params) => Promise<LoadAccountById.Result>
}

export namespace LoadAccountById {
  export type Params = number

  export type Result = {
    id: number
  } | null
}
