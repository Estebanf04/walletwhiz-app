import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"


export default function ExpenseList() {

  const { state, t } = useBudget()

  const filteredExpenses = state.currentCategory 
  ? state.expenses.filter(expense => expense.category === state.currentCategory)
  : state.expenses

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="my-8 bg-white shadow-lg rounded-lg p-10">
        {isEmpty ? <p className="text-gray-600 text-xl font-semibold text-center">{t("expenseList.alert")}</p> : (
            <>
                <p className="text-gray-600 text-2xl font-semibold my-5 text-center md:text-start">{t("expenseList.tittle")}</p>
                {filteredExpenses.map((expense) => (
                    <ExpenseDetails
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
    </div>
  )
}
