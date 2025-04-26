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
            <>
              <main className="grid grid-cols-1 md:grid-cols-2 px-4 sm:px-10 gap-4 ">
                <BudgetTracker/> 

                <div className="max-w-1/2 w-full max-h-max mx-auto my-10 md:min-h-64">
                  <FilterByCategory/>
                  <ExpenseList/>
                  <ExpenseModal/>
                </div>
                
              </main>
            </>
            : 
            <main className="grid max-w-2xl mx-auto px-5 ">
                <div className="max-w-xl w-full mx-auto rounded-md mt-10 p-10">
                  <BudgetForm/> 
                </div>
            </main>
            }
    </>
  )
}

export default App
 