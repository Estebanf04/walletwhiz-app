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
    <div className="bg-white shadow-lg rounded-lg p-8">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category" className="text-lg font-semibold text-center ">{t("filterByCategory.text")}</label>
                <select 
                id="category"
                className="bg-slate-50 p-3 flex-1 rounded"
                onChange={handleChange}
                >
                    <option value="">-- {t("filterByCategory.allCategories")} --</option>
                    {  
                        (currentLanguage === 'es')
                        ?
                            categories.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        :   
                            categoriesEnglish.map(category => (
                                <option 
                                value={category.id}
                                key={category.id}
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
