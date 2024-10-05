import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number,
    divisa: string
}

export default function AmountDisplay({label, amount, divisa} : AmountDisplayProps) {

  return (
    <p className="text-xl sm:text-2xl text-blue-600 font-semibold flex justify-between gap-8">
        {label && `${label}`}
        <span className="font-semibold text-black">{formatCurrency(amount, divisa)}</span>
    </p>
  )
}
