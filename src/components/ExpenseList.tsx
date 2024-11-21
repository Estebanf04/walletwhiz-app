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
    <div className="my-4 bg-[#021526] rounded-lg px-8 py-5 max-h-screen overflow-y-scroll">
        {isEmpty ? <p className="text-[#E2E2B6] text-lg font-semibold text-center">{t("expenseList.alert")}</p> : (
            <>
                <p className="text-[#E2E2B6] text-xl font-semibold my-3 text-center md:text-start">{t("expenseList.tittle")}</p>
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
