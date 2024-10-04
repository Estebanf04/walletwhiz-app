import { categories, categoriesEnglish } from "../data/categories";
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { DraftExpense } from "../types";
import { ChangeEvent, FormEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {

    const initialState : DraftExpense = {
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    }

    const [expense, setExpense] = useState<DraftExpense>(initialState)
    const [error, setError] = useState('')
    const [previosAmount, setPreviousAmount] = useState(0)
    const {state, dispatch, remainingBudget, t, i18n} = useBudget()

    const currentLanguage = i18n.language

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? Number(value) : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        
        if(Object.values(expense).includes('') || Object.values(expense).includes(0) ){
            setError(t("error.all-fields"))
            return
        }

        if((expense.amount - previosAmount) > remainingBudget){
            setError(t("error.broke-limit-budge"))
            return
        }

        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {...expense, id: state.editingId}}})
        }
        else{
            dispatch({type: 'add-expense', payload: {expense: expense}})
        }

        setExpense(initialState)
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend 
            className="uppercase mx-auto text-center text-2xl font-bold border-b-4 border-blue-800 py-2">
                {state.editingId ? t("modalEdit.tittle") : t("modalCreate.tittle")}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label 
                htmlFor="expenseName"
                className="text-xl"
                >
                    {t("modalCreate.expenseName")}
                </label>

                <input 
                type="text"
                className="bg-slate-100 p-2" 
                id="expenseName" 
                placeholder={t("modalCreate.placeholderName")}
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                htmlFor="amount"
                className="text-xl"
                >
                    {t("modalCreate.quantity")}
                </label>

                <input 
                type="number"
                className="bg-slate-100 p-2" 
                id="amount" 
                placeholder="Añade la cantidad del gasto. Ej. 250"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label 
                htmlFor="category"
                className="text-xl"
                >
                    {t("modalCreate.category")}
                </label>

                <select 
                className="bg-slate-100 p-2" 
                id="category" 
                name="category"
                value={expense.category}
                onChange={handleChange}
                >
                <option value="">-- {t("modalCreate.option")} --</option>
                    {
                        (currentLanguage === 'es')
                        ?
                            categories.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        :   
                            categoriesEnglish.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                    }
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label 
                htmlFor="date"
                className="text-xl"
                >
                    {t("modalCreate.date")}
                </label>

                <DatePicker
                className="bg-slate-100 p-2 border-0 border-none"
                value={expense.date}
                onChange={handleChangeDate}
                />
            </div>

            <input 
            type="submit" 
            value={state.editingId ? t("modalEdit.button") : t("modalCreate.button")}
            className="bg-blue-950 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-900" 
            />
        </form>
    )
}
