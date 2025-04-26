import { categories, categoriesEnglish } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import { ChangeEvent } from "react";

export default function FilterByCategory() {

const { dispatch, t, i18n } = useBudget()

const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
}

const currentLanguage = i18n.language

  return (
    <div className="bg-[#141414] shadow-lg rounded-lg p-8 border border-[#201e1e]">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category" className="text-lg font-semibold text-center text-[#F5F5F5]">{t("filterByCategory.text")}</label>
                <select 
                id="category"
                className="bg-[#101010] text-gray-400 p-3 flex-1 rounded-md"
                onChange={handleChange}
                >
                    <option value="" className="text-gray-300">-- {t("filterByCategory.allCategories")} --</option>
                    {  
                        (currentLanguage === 'es')
                        ?
                            categories.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
                                className="text-gray-400"
                                >
                                    {category.name}
                                </option>
                            ))
                        :   
                            categoriesEnglish.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
                                className="text-gray-400"
                                >
                                    {category.name}
                                </option>
                            ))
                    }
                </select>
            </div>
        </form>
    </div>
  )
}
