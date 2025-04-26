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

            <input 
            id="budget"
            type="number"
            className="w-full bg-[#141414] border border-gray-700 shadow-md shadow-cyan-900 hover:shadow-lg hover:shadow-cyan-800 hover:border-cyan-800 transition-all duration-500 cursor-pointer p-2 rounded-md text-gray-400 focus:outline-none"
            placeholder={t("budget-form.placeholder")}
            name="budget"
            value={budget}
            onChange={handleChange}
            />

            <select 
            className="w-full bg-[#141414] border border-gray-700 shadow-md shadow-cyan-900 hover:shadow-lg hover:shadow-cyan-800 hover:border-cyan-800 transition-all duration-500 cursor-pointer p-2 rounded-md text-gray-400 focus:outline-none"
            value={divisa}
            onChange={handleCurrency}
            >
                <option value="" className="text-gray-400">
                {t("budget-form.plcselect")}
                </option>
                {divisas.map((divisa)=> (
                    <option 
                    key={divisa.id}
                    value={divisa.currency}
                    className="text-gray-400">
                        {divisa.name}
                    </option>
                ))}
            </select>
         </div>

        <div className="flex justify-end">
            <input 
            type="submit" 
            value={t("budget-form.text-button")}
            className="bg-gradient-to-r from-cyan-400 to-cyan-600 transition-colors cursor-pointer w-full p-2 mt-3 text-gray-900 font-bold uppercase disabled:opacity-60 disabled:cursor-auto rounded-md" 
            disabled={isValid}
            />
         </div>


    </form>
  )
}
