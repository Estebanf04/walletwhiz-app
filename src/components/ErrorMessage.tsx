import { PropsWithChildren } from "react"

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <p className="bg-red-600 p-1.5 text-white font-bold text-md text-center">
        {children}
    </p>
  )
}
