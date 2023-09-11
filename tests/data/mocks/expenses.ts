import { AddExpense } from '@/domain/usecases/expenses/add-expense'

export const mockAddExpenseParams = (): AddExpense.Params => ({ name: 'name', value: 123, date: new Date() })
