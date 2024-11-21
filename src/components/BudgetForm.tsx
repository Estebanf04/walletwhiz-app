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
            <label htmlFor="budget" className="text-xl sm:text-3xl text-gray-300 font-black text-center">
                {t("budget-form.tittle")}
            </label>
        
            <input 
            id="budget"
            type="number"
            className="w-full bg-transparent border border-gray-700 p-2 rounded-md text-gray-400"
            placeholder={t("budget-form.placeholder")}
            name="budget"
            value={budget}
            onChange={handleChange}
            />

            <select 
            className="w-full bg-transparent border border-gray-700 p-2 rounded-md text-gray-400"
            value={divisa}
            onChange={handleCurrency}
            >
                <option value="">-- {t("budget-form.plcselect")} --</option>
                {divisas.map((divisa)=> (
                    <option 
                    key={divisa.id}
                    value={divisa.currency}
                    className="text-gray-800">
                        {divisa.name}
                    </option>
                ))}
            </select>
         </div>

        <div className="flex justify-center">
            <input 
            type="submit" 
            value={t("budget-form.text-button")}
            className="bg-[#5caae5] hover:bg-[#447ea9] transition-colors cursor-pointer w-full p-2 mt-3 text-white font-bold uppercase disabled:opacity-10 disabled:cursor-auto rounded-sm" 
            disabled={isValid}
            />
         </div>


    </form>
  )
}
