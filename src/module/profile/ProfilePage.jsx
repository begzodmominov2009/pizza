import { useState, useEffect, useRef, useContext } from "react"
import {
    User,
    Heart,
    Settings,
    LogOut,
    ChevronRight,
    ShoppingCart,
    LayoutGrid,
    Bell,
    Info,
    HelpCircle,
    CreditCard,
    Home,
    Search,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { LanguageContext } from '../../context/ChangeLanguageContext'

export default function ProfilePage() {
    const { lang, setLang, t } = useContext(LanguageContext)
    const user = JSON.parse(localStorage.getItem("pizza-user"))

    const [scrolled, setScrolled] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false) // ✅ Logout modal
    const [selectedLang, setSelectedLang] = useState(lang)
    const dropdownRef = useRef()

    const languages = [
        { code: 'uz', name: 'UZ', flag: '/uz.png' },
        { code: 'en', name: 'EN', flag: '/en.png' },
        { code: 'ru', name: 'RU', flag: '/ru.png' },
    ]

    const navItems = [
        { to: "/", label: `${t.bottom_nav_home}`, icon: Home },
        { to: "/category", label: `${t.bottom_nav_category}`, icon: LayoutGrid },
        { to: "/search", label: `${t.bottom_nav_search}`, icon: Search },
        { to: "/cart", label: `${t.bottom_nav_cart}`, icon: ShoppingCart },
        { to: "/profile", label: `${t.bottom_nav_profile}`, icon: User },
    ]

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("pizza-user")
        window.location.reload()
    }

    return (
        <>
            {/* Header */}
            <div className={`fixed top-0 left-0 right-0 rounded-b-[15px] bg-[#FF7010] px-4 flex items-center gap-4 transition-all z-50 ${scrolled ? "py-2" : "py-5"}`}>
                <div className={`rounded-full bg-white flex items-center justify-center transition-all duration-300 ${scrolled ? "w-14 h-14" : "w-18 h-18"}`}>
                    <User size={scrolled ? 24 : 36} className="text-gray-500 transition-all duration-300" />
                </div>
                <div className={`flex flex-col items-start transition-all duration-300 ${scrolled ? "text-left" : "text-center"}`}>
                    <h2 className={`text-white font-semibold transition-all duration-300 ${scrolled ? "text-base" : "text-xl"}`}>
                        {user?.name || "Guest User"}
                    </h2>
                    <span className={`text-white text-sm transition-all duration-300 ${scrolled ? "text-[12px]" : "text-[14px]"}`}>
                        {user?.phone || "+998 XX XXX XX XX"}
                    </span>
                </div>
            </div>

            <div className="pt-[120px] min-h-screen pb-24 relative">
                {loading && (
                    <div className="fixed inset-0 z-[999] flex justify-center items-center bg-white">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}

                {!loading && (
                    <>
                        <div className="overflow-hidden bg-[white] rounded-2xl">
                            <ProfileItem icon={User} label={t.personal_Information_profile} />
                            <ProfileItem icon={Heart} label={t.saved_items_profile} />
                            <ProfileItem icon={ShoppingCart} label={t.my_orders_profile} />
                            <ProfileItem icon={LayoutGrid} label={t.categories_profile} />
                            <ProfileItem icon={Settings} label={t.settings_profile} />
                            <ProfileItem icon={Bell} label={t.notifications_profile} />
                            <ProfileItem icon={Info} label={t.about_us_profile} />
                            <ProfileItem icon={HelpCircle} label={t.help_faq_profile} />
                            <ProfileItem icon={CreditCard} label={t.payment_methods_profile} />

                            {/* Language dropdown */}
                            <div className="overflow-hidden bg-white rounded-2xl mt-4 md:max-w-[120px] md:w-full relative" ref={dropdownRef}>
                                <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
                                    onClick={() => setOpenModal(true)}>
                                    <div className="flex items-center gap-2">
                                        <img src={languages.find(l => l.code === lang)?.flag} alt="flag" className="w-4 h-4 rounded-full" />
                                        <span className="text-[12px] font-medium">{lang.toUpperCase()}</span>
                                    </div>
                                    <span className="text-[11px] font-medium">
                                        {languages.find(l => l.code === lang)?.name === 'UZ' ? "O‘zbekcha" : languages.find(l => l.code === lang)?.name}
                                    </span>
                                </div>
                            </div>

                            {/* Language modal */}
                            {openModal && (
                                <div
                                    className="fixed inset-0 z-99 flex items-end justify-center bg-black/30"
                                    onClick={() => setOpenModal(false)}>
                                    <div
                                        className="w-full max-w-md bg-white rounded-t-2xl p-4 pb-8 overflow-y-auto transform transition-all duration-300 ease-out"
                                        onClick={(e) => e.stopPropagation()}>
                                        <h2 className="text-lg font-semibold mb-3">{t.select_language_profile}</h2>
                                        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                                            {languages.map((l) => (
                                                <label key={l.code} className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100">
                                                    <input type="radio" name="language" value={l.code} checked={selectedLang === l.code} onChange={() => setSelectedLang(l.code)} className="w-4 h-4 border border-white accent-orange-500" />
                                                    <img src={l.flag} alt={l.name} className="w-5 h-5 rounded-full" />
                                                    <span>{l.code === 'uz' ? "O‘zbekcha" : l.name}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setLang(selectedLang);
                                                setOpenModal(false);
                                            }}
                                            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                                            {t.save_profile}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Logout button */}
                        {user && (
                            <div className="mt-4 bg-[#FF7010] mx-3 rounded-xl shadow-sm">
                                <button
                                    onClick={() => setLogoutModal(true)} // modalni ochish
                                    className="w-full flex items-center gap-3 px-4 py-4 text-[white] font-medium"
                                >
                                    <LogOut size={20} />
                                    <span className="text-sm font-medium">{t.exit_profile}</span>
                                </button>
                            </div>
                        )}

                        {/* Logout confirmation modal */}
                        {logoutModal && (
                            <div className="fixed inset-0 z-99 flex items-end justify-center bg-black/30" onClick={() => setLogoutModal(false)}>
                                <div className="w-full max-w-md bg-white rounded-t-2xl p-4 pb-8 transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                                    <h2 className="text-lg font-semibold mb-4 text-center">{t.exit_profile_save}</h2>
                                    <div className="flex justify-between gap-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                                            {t.yes}
                                        </button>
                                        <button
                                            onClick={() => setLogoutModal(false)}
                                            className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
                                            {t.no}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Bottom nav */}
            <div className="fixed mx-auto bottom-0 left-0 right-0 z-50 bg-white border-t border-[#d2cdcd95] shadow-md md:hidden">
                <div className="flex justify-between px-3 py-2">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 text-xs transition ${isActive ? "text-[#FF7010]" : "text-gray-500"}`
                            }
                        >
                            <Icon size={22} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}

function ProfileItem({ icon: Icon, label }) {
    return (
        <button className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-300 last:border-none">
            <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-600" />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
        </button>
    )
}
