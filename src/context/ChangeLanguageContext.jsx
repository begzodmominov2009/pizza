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
            header_profile: "Kirish yoki Hisobga kirish",
            bottom_nav_home: "Bosh sahifa",
            bottom_nav_category: "Kategoriyalar",
            bottom_nav_search: "Qidiruv",
            bottom_nav_cart: "Savat",
            bottom_nav_profile: "Profil",
            personal_Information_profile: "Shaxsiy ma’lumotlar",
            saved_items_profile: "Saqlanganlar",
            my_orders_profile: "Buyurtmalarim",
            categories_profile: "Kategoriyalar",
            settings_profile: "Sozlamalar",
            notifications_profile: "Bildirishnomalar",
            about_us_profile: "Biz haqimizda",
            help_faq_profile: "Yordam / FAQ",
            payment_methods_profile: "To‘lov usullari",
            select_language_profile: "Tilni tanlang",
            save_profile: "Saqlash",
            exit_profile: "Chiqish",
            cart_button_text: "Savatga",
            yes: "Ha",
            no: "Yo'q",
            exit_profile_save: "Chiqishni xohlaysizmi?",
            register_modal: "Ro'yxatan o'tish",
            name_register: "Ism",
            password_register: "Parol",
            phone_register: "Telefon",
            cancel: "Bekor qilish",
            save: "Saqlash",
        },
        en: {
            header_head: "Toshkent",
            header_region: "Check address",
            header_clock: "Average delivery time",
            header_work_time: "Working hours: 11:00 AM – 11:00 PM",
            header_profile: "Sign in",
            bottom_nav_home: "Home",
            bottom_nav_category: "Category",
            bottom_nav_search: "Search",
            bottom_nav_cart: "Cart",
            bottom_nav_profile: "Profile",
            personal_Information_profile: "Personal Information",
            saved_items_profile: "Saved Items",
            my_orders_profile: "My Orders",
            categories_profile: "Categories",
            settings_profile: "Settings",
            notifications_profile: "Notifications",
            about_us_profile: "About Us",
            help_faq_profile: "Help / FAQ",
            payment_methods_profile: "Payment Methods",
            select_language_profile: "Select Language",
            save_profile: "Save",
            exit_profile: "Exit",
            cart_button_text: "Add",
            yes: "Yes",
            no: "No",
            exit_profile_save: "Are you sure you want to logout?",
            register_modal: "Register",
            name_register: "Name",
            password_register: "Password",
            phone_register: "Phone",
            cancel: "Canel",
            save: "Save",
        },
        ru: {
            header_head: "Toshkent",
            header_region: "Проверить адрес",
            header_clock: "Среднее время доставки",
            header_work_time: "Время работы: с 11:00 до 23:00",
            header_profile: "Войти в аккаунт",
            bottom_nav_home: "Главная",
            bottom_nav_category: "Категории",
            bottom_nav_search: "Поиск",
            bottom_nav_cart: "Корзина",
            bottom_nav_profile: "Профиль",
            personal_Information_profile: "Личная информация",
            saved_items_profile: "Сохранённое",
            my_orders_profile: "Мои заказы",
            categories_profile: "Категории",
            settings_profile: "Настройки",
            notifications_profile: "Уведомления",
            about_us_profile: "О нас",
            help_faq_profile: "Помощь / FAQ",
            payment_methods_profile: "Методы оплаты",
            select_language_profile: "Выберите язык",
            save_profile: "Сохранить",
            exit_profile: "Выйти",
            cart_button_text: "Выбрать",
            yes: "Да",
            no: "Нет",
            exit_profile_save: "Вы хотите выйти?",
            register_modal: "Регистрация",
            name_register: "Имя",
            password_register: "Пароль",
            phone_register: "Телефон",
            cancel: "Отмена",
            save: "Сохранить",
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
