import { useMemo, useState } from "react"
import { ChangeEvent, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"
import { divisas } from "../data/divisas"


export default function BudgetForm() {


    const [budget, setBudget] = useState(0)
    const [divisa, setDivisa] = useState('')
    const { dispatch, t } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    const handleCurrency = (e: ChangeEvent<HTMLSelectElement> ) => {
        setDivisa(e.target.value)
    } 

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0 || divisa === ""
    }, [budget, divisa])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({type: 'add-budget', payload: {budget: budget, divisa: divisa}})
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

            <select 
            className="w-full bg-white border border-gray-200 p-2"
            value={divisa}
            onChange={handleCurrency}
            >
                <option value="">-- {t("budget-form.plcselect")} --</option>
                {divisas.map((divisa)=> (
                    <option 
                    key={divisa.id}
                    value={divisa.currency}>
                        {divisa.name}
                    </option>
                ))}
            </select>
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
