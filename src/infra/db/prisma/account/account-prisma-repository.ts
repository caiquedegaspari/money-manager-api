import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository } from '@/data/protocols/db/account'
import prisma from '../client'
import { UpdateMonthlyIncomeRepository } from '@/data/protocols/db/account/update-monthly-income-repository'
export class AccountPrismaRepository implements
AddAccountRepository,
CheckAccountByEmailRepository,
LoadAccountByEmailRepository,
LoadAccountByIdRepository,
UpdateMonthlyIncomeRepository {
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

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return user ?? null
  }

  async loadById (id: number): Promise<LoadAccountByIdRepository.Result> {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })
    return user ?? null
  }

  async updateMonthlyIncome (params: UpdateMonthlyIncomeRepository.Params): Promise<number> {
    await prisma.user.update({
      where: {
        id: params.userId
      },
      data: {
        monthlyIncome: params.value
      }
    })
    return params.value
  }
}
