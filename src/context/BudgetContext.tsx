import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, InitialState } from "../reducers/budget-reducer"
import { useTranslation } from "react-i18next"
import { i18n, TFunction } from "i18next"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number,
    t: TFunction<"global", undefined>,
    i18n: i18n

}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, InitialState)
    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense) => expense.amount + total, 0),[state.expenses])
    const remainingBudget = state.budget - totalExpenses
    const [t, i18n] = useTranslation("global")

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget,
                t,
                i18n
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}