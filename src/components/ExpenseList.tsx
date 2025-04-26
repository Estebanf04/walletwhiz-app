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
    <div id="expenselist" className={`my-4 bg-[#141414] border border-[#201e1e] rounded-lg px-8 py-5 md:max-h-[55vh] 2xl:max-h-[65vh] ${!isEmpty && 'overflow-y-scroll'}`}>
        {isEmpty ? <p className="text-[#F5F5F5] text-lg font-semibold text-center">{t("expenseList.alert")}</p> : (
            <>
                <p className="text-[#F5F5F5] text-xl font-semibold my-3 text-center md:text-start">{t("expenseList.tittle")}</p>
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
