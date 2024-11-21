import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

const {state, dispatch, totalExpenses, remainingBudget, t, divisa} = useBudget()
const percentage = +((totalExpenses / state.budget) * 100).toFixed(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textSize: 7,
                    textColor: percentage === 100 ? '#DC2626' : '#5caae5'
                })}
                text={`${percentage}% ${t("budget-tracker.textProgressBar")}`}
            />
        </div>

        <div className="flex flex-col mx-auto md:justify-center items-start  md:items-start gap-8">
            <div className="space-y-4">
            <AmountDisplay
                label={t("budget-tracker.budget")}
                amount={state.budget}
                divisa={divisa}
            />

            <AmountDisplay
                label={t("budget-tracker.spent")}
                amount={totalExpenses}
                divisa={divisa}
            />

            <AmountDisplay
                label={t("budget-tracker.remainingBudget")}
                amount={remainingBudget}
                divisa={divisa}
            />
            </div>

            <button
            type="button"
            className="bg-[#5caae5] hover:bg-[#447ea9] w-full p-2 text-white uppercase font-bold rounded transition-colors"
            onClick={() => dispatch({type: 'restart-app'})}
            >
                {t("budget-tracker.buttonRestart")}
            </button>

        </div>
    </div>
  )
}
