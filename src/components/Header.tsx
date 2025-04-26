import { useBudget } from "../hooks/useBudget"

export default function Header() {

const {i18n} = useBudget()

  return (
    <header className="bg-[#141414] py-6 px-6 sm:px-8 max-h-72 flex justify-between items-center border-b border-[#202020]">
        <a className="text-2xl text-white" href="/">Wallet <span className="text-cyan-400 font-medium">Whiz</span></a>

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
