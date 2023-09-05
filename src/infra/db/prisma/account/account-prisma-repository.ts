import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db/account'
import prisma from '../client'
export class AccountPrismaRepository implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (params: AddAccountRepository.Params): Promise<boolean> {
    const res = await prisma.user.create({
      data: { ...params }
    })
    return res !== null
  };

  async checkByEmail (email: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return user !== null
  }
}
