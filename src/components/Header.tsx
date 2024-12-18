import { useBudget } from "../hooks/useBudget"

export default function Header() {

const {i18n} = useBudget()

  return (
    <header className="bg-[#021526] py-6 pl-2 pr-6 sm:pr-8 max-h-72 flex justify-between items-center">
        <img 
        src="/walletwhizlogo.jpg" alt="logo"
        className="w-[180px] sm:w-[200px] cursor-pointer"
        onClick={() => location.href = "/"}
        />
        <div className="text-white">
            {i18n.language === 'en' 
              ?
              <button onClick={() => i18n.changeLanguage("es")}><img src="/españa.png" className="w-5 sm:w-6"/></button>
              :
              <button onClick={() => i18n.changeLanguage("en")}><img src="/reino-unido.png" className="w-5 sm:w-6"/></button>
            }
        </div>
      </header>
  )
}
