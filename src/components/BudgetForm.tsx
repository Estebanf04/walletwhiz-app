import { useMemo, useState } from "react"
import { ChangeEvent, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {


    const [budget, setBudget] = useState(0)
    const { dispatch, t } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({type: 'add-budget', payload: {budget: budget}})
    }

    
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-2xl sm:text-3xl text-blue-950 font-semibold text-center ">
                {t("budget-form.tittle")}
            </label>
        
            <input 
            id="budget"
            type="number"
            className="w-full bg-white border border-gray-200 p-2"
            placeholder={t("budget-form.placeholder")}
            name="budget"
            value={budget}
            onChange={handleChange}
            />
         </div>

         <input 
         type="submit" 
         value={t("budget-form.text-button")}
         className="bg-blue-950 hover:bg-blue-900 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-10 disabled:cursor-auto" 
         disabled={isValid}
         />


    </form>
  )
}
