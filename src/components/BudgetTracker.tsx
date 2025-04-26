import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

const {state, dispatch, totalExpenses, remainingBudget, t, divisa} = useBudget()
const percentage = +((totalExpenses / state.budget) * 100).toFixed(1)

  return (
        <div className={`max-w-1/2 w-full max-h-max mx-auto bg-[#141414] shadow-md rounded-lg mt-10 p-10 ${percentage === 100 ? 'shadow-red-500' : 'shadow-cyan-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="flex justify-center p-6 2xl:p-10">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? '#ef4444' : '#06b6d4',
                            trailColor: '#354545',
                            textSize: 6,
                            textColor: percentage === 100 ? '#ef4444' : '#22d3ee',
                        })}
                        text={`${percentage}% ${t("budget-tracker.textProgressBar")}`}
                        strokeWidth={6}
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
                    className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:bg-[#447ea9] w-full p-2 text-black uppercase font-bold rounded-md transition-colors"
                    onClick={() => dispatch({type: 'restart-app'})}
                    >
                        {t("budget-tracker.buttonRestart")}
                    </button>

                </div>
            </div>
        </div>
  )
}
