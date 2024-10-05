import { Category, DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'

export type BudgetActions = 
{ type: 'add-budget', payload: {budget: number, divisa: string } } |
{ type: 'show-modal'} |
{ type: 'close-modal'} |
{ type: 'add-expense', payload: {expense: DraftExpense}} |
{ type: 'delete-expense', payload: {id: Expense['id']} } |
{type: 'get-expense-by-id', payload: {id: Expense['id']}} |
{type: 'update-expense', payload: {expense: Expense}} |
{type: 'restart-app'} |
{type: 'add-filter-category', payload: {id: Category['id']}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id'],
    divisa: string
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = () : Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

const initialDivisa = () : string => {
    const localStorageDivisa = localStorage.getItem('divisa')
    return localStorageDivisa ? localStorageDivisa : ''
}

export const InitialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: '',
    divisa: initialDivisa()
}

const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
        state: BudgetState = InitialState,
        action: BudgetActions
    ) => {

    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget,
            divisa: action.payload.divisa
        }
    }

    if(action.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload.expense)
    
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'delete-expense'){
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
            modal: false
        }
    }

    if(action.type === 'get-expense-by-id'){
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'update-expense'){
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal:false,
            editingId: ''
        }
    }

    if(action.type === 'restart-app'){
        return {
            ...state,
            budget: 0,
            divisa: '',
            expenses: []
        }
    }

    if(action.type === 'add-filter-category'){
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}