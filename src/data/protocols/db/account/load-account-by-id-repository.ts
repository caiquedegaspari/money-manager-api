export interface LoadAccountByIdRepository {
  loadById: (id: LoadAccountByIdRepository.Params) => Promise<LoadAccountByIdRepository.Result>
}

export namespace LoadAccountByIdRepository {
  export type Params = number
  export type Result = {
    id: number
    email: string
  } | null
}
