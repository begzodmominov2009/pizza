import React, { createContext, useEffect, useState } from 'react'

export const LanguageContext = createContext()

const ChangeLanguageContext = ({ children }) => {
    const [lang, setLang] = useState(() => {
        const savedLang = localStorage.getItem("lang")
        return savedLang ? savedLang : "uz"
    })

    useEffect(() => {
        localStorage.setItem("lang", lang)
    }, [lang])

    const translations = {
        uz: {
            header_head: "Toshkent",
            header_region: "Manzilni tekshirish",
            header_clock: "O‘rtacha yetkazib berish vaqti",
            header_work_time: "Ish vaqti: 11:00 dan 23:00 gacha",
            header_profile: "Kirish yoki Hisobga kirish"
        },
        en: {
            header_head: "Toshkent",
            header_region: "Check address",
            header_clock: "Average delivery time",
            header_work_time: "Working hours: 11:00 AM – 11:00 PM",
            header_profile: "Sign in"
        },
        ru: {
            header_head: "Toshkent",
            header_region: "Проверить адрес",
            header_clock: "Среднее время доставки",
            header_work_time: "Время работы: с 11:00 до 23:00",
            header_profile: "Войти в аккаунт"
        }
    }
    const t = translations[lang]
    
    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default ChangeLanguageContext
