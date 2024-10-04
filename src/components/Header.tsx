import { useBudget } from "../hooks/useBudget"

export default function Header() {

const {i18n} = useBudget()

  return (
    <header className="bg-gray-900 py-6 px-4 sm:px-8 max-h-72 flex justify-between items-center">
        <img 
        src="/logo.jpg" alt="logo"
        className="w-56 sm:w-72 cursor-pointer"
        onClick={() => location.href = "/"}
        />
        <div className="text-white">
            {i18n.language === 'en' 
              ?
              <button onClick={() => i18n.changeLanguage("es")}><img src="/españa.png" className="w-6 sm:w-7"/></button>
              :
              <button onClick={() => i18n.changeLanguage("en")}><img src="/reino-unido.png" className="w-6 sm:w-7"/></button>
            }
        </div>
      </header>
  )
}
