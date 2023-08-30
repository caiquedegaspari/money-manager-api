import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db/account'
import { PrismaClient } from '@prisma/client'

export class AccountPrismaRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  private readonly prisma = new PrismaClient()

  async add (params: AddAccountRepository.Params): Promise<boolean> {
    const res = await this.prisma.user.create({
      data: { ...params }
    })
    return res !== null
  };

  async checkByEmail (email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })
    return user !== null
  }
}
