import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number,
    divisa: string
}

export default function AmountDisplay({label, amount, divisa} : AmountDisplayProps) {

  return (
    <p className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-300 to-cyan-600 bg-clip-text text-transparent font-semibold flex justify-between gap-8">
        {label && `${label}`}
        <span className="font-semibold text-[#E2E2B6]">{formatCurrency(amount, divisa)}</span>
    </p>
  )
}
