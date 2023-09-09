export type DecodedToken = { id: string, iat: number, exp: number }

export interface Decrypter {
  decrypt: (value: string) => Promise<DecodedToken | null>
}
