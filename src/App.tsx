import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"
import Header from "./components/Header"

function App() {

  const { state, i18n, divisa } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])
  
  useEffect(() => {
    localStorage.setItem('defaultlanguage', i18n.language)
  }, [i18n.language])

  useEffect(() => {
    localStorage.setItem('divisa', divisa)
  }, [divisa])


  return (
    <>
        <Header/>

            { isValidBudget 
            ? 
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
              <BudgetTracker/> 
            </div>
            : 
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
              <BudgetForm/> 
            </div>
            }

            { 
              isValidBudget && (
                  <main className="max-w-4xl mx-auto py-10 sm:min-h-64">
                    <FilterByCategory/>
                    <ExpenseList/>
                    <ExpenseModal/>
                  </main>
              ) 
            }   
    </>
  )
}

export default App
 