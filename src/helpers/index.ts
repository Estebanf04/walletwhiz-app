import { useBudget } from "../hooks/useBudget"

export function formatCurrency(amount: number){
    return new Intl.NumberFormat('es-EU', {style: 'currency', currency: 'EUR'}).format(amount)
}

export function formatDate(dateStr: string) : string {
    const { i18n } = useBudget()
    const country = (i18n.language === 'es') ? 'es-ES' : 'en-US'

    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    return new Intl.DateTimeFormat(country, options).format(dateObj)
}