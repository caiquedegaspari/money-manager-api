import { ListExpensesRepository } from '@/data/protocols/db/expenses'
import { CategoryPercentage, ListExpenses } from '@/domain/usecases/expenses/list-expenses'

export class DbListExpenses implements ListExpenses {
  constructor (private readonly listExpensesRepository: ListExpensesRepository) {}
  async list (params: ListExpenses.Params): Promise<ListExpenses.Result> {
    const expenses = await this.listExpensesRepository.list(params)
    if (!expenses.length) {
      return {
        expenses: [{ name: 'Sem Gastos', value: 0 }],
        percentages: [{ category: 'Sem Categoria', percent: 0, totalSpent: 0 }]
      }
    }
    const totalExpensesValue = expenses.reduce((acc, currentValue) => {
      return acc + currentValue.value
    }, 0)

    const percentages = expenses.reduce<CategoryPercentage[]>((acc, currentValue) => {
      const existentCategory = acc.find((item) => item.category === currentValue.category)
      if (existentCategory) {
        const index = acc.indexOf(existentCategory)
        acc[index].totalSpent += currentValue.value
        return acc
      }
      if (!currentValue.category) {
        acc.push({ category: 'Sem Categoria', totalSpent: currentValue.value, percent: 0 })
        return acc
      }
      acc.push({ category: currentValue.category, totalSpent: currentValue.value, percent: 0 })
      return acc
    }, [])
    percentages.forEach((percentage) => {
      percentage.percent = Math.round(percentage.totalSpent / totalExpensesValue * 100)
    })

    return {
      expenses,
      percentages
    }
  };
}
