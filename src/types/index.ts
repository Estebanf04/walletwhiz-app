export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type DraftExpense = Omit<Expense, 'id'>

export type Expense = {
    id: string,
    expenseName: string,
    amount: number,
    category: string,
    date: Value
}

export type Category = {
    id: string,
    name: string,
    icon: string
}

export type Divisa = {
    id: number,
    name: string,
    currency: string
}