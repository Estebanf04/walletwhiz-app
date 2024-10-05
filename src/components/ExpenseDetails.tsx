import { useMemo } from "react"
import { categories, categoriesEnglish } from "../data/categories"
import { formatDate } from "../helpers"
import { Category, Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
 } from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({expense} : ExpenseDetailsProps) {

    const { dispatch, t, i18n, divisa } = useBudget()

    const currentLanguage = i18n.language
    let categoryInfo : Category;

    if(currentLanguage === 'es'){
        categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0],[expense, i18n.language])
    }
    else{
        categoryInfo = useMemo(() => categoriesEnglish.filter(cat => cat.id === expense.category)[0],[expense, i18n.language])
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >
                {t("swipeAction.edit")}
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type:'delete-expense', payload: {id: expense.id}})}
                destructive={true}
            >
                {t("swipeAction.delete")}
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >

                <div className="bg-white p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div className="">
                        <img 
                        src={`/icono_${categoryInfo.icon}.svg`}
                        alt="icono-gasto"
                        className="w-16"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 sm:text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                        divisa={divisa}
                    />
                </div>

            </SwipeableListItem>
        </SwipeableList>
    )
}
