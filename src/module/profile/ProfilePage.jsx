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
} from "lucide-react"
import { useState, useEffect, useRef, useContext } from "react"
import { NavLink } from "react-router-dom"
import { LanguageContext } from '../../context/ChangeLanguageContext'

export default function ProfilePage() {
    const { lang, setLang, t } = useContext(LanguageContext)
    const languages = [
        { code: 'uz', name: 'UZ', flag: '/uz.png' },
        { code: 'en', name: 'EN', flag: '/en.png' },
        { code: 'ru', name: 'RU', flag: '/ru.png' },
    ]
    const navItems = [
        { to: "/", label: `${t.bottom_nav_home}`, icon: User },
        { to: "/category", label: `${t.bottom_nav_category}`, icon: LayoutGrid },
        { to: "/search", label: `${t.bottom_nav_search}`, icon: User },
        { to: "/cart", label: `${t.bottom_nav_cart}`, icon: ShoppingCart },
        { to: "/profile", label: `${t.bottom_nav_profile}`, icon: User },
    ]

    const [scrolled, setScrolled] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [selectedLang, setSelectedLang] = useState(lang)
    const [loadingFlag, setLoadingFlag] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])


    const handleToggleModal = () => {
        setLoadingFlag(true)
        setOpenModal(true)
        setTimeout(() => setLoadingFlag(false), 500)
    }

    const handleSaveLang = () => {
        setLang(selectedLang)
        setOpenModal(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            // 20px scroll bo‘lsa header kichrayadi
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ===== SCROLL HEADER ===== */}
            <div
                className={`fixed top-0 left-0 right-0 rounded-b-[15px] bg-[#FF7010] px-4 flex items-center gap-4 transition-all z-50 ${scrolled ? "py-2" : "py-5"}`}>
                <div className={`rounded-full bg-white flex items-center justify-center transition-all duration-300 ${scrolled ? "w-14 h-14" : "w-18 h-18"}`}>
                    <User size={scrolled ? 24 : 36} className="text-gray-500 transition-all duration-300" />
                </div>
                <div
                    className={`flex flex-col items-start transition-all duration-300 ${scrolled ? "text-left" : "text-center"}`}>
                    <h2
                        className={`text-white font-semibold transition-all duration-300 ${scrolled ? "text-base" : "text-xl"}`}>
                        Boss Developer
                    </h2>
                    <span
                        className={`text-white text-sm transition-all duration-300 ${scrolled ? "text-[12px]" : "text-[14px]"}`}>
                        +998 90 123 45 67
                    </span>
                </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="pt-[120px] min-h-screen pb-24 relative">
                {loading && (
                    <div className="fixed inset-0 z-[999] flex justify-center items-center bg-white">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* ===== MENU LIST ===== */}
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

                            <div
                                className="overflow-hidden bg-white rounded-2xl mt-4 md:max-w-[120px] md:w-full relative"
                                ref={dropdownRef}
                            >
                                <div
                                    className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
                                    onClick={() => {
                                        setSelectedLang(lang); // joriy tilni radio ga o‘rnatish
                                        setOpenModal(true);
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={languages.find(l => l.code === lang)?.flag}
                                            alt="flag"
                                            className="w-4 h-4 rounded-full"
                                        />
                                        <span className="text-[12px] font-medium">{lang.toUpperCase()}</span>
                                    </div>
                                    <span className="text-[11px] font-medium">
                                        {languages.find(l => l.code === lang)?.name === 'UZ' ? "O‘zbekcha" : languages.find(l => l.code === lang)?.name}
                                    </span>
                                </div>
                            </div>

                            {openModal && (
                                <div
                                    className="fixed inset-0 z-99 flex items-end justify-center bg-black/30"
                                    onClick={() => setOpenModal(false)}
                                >
                                    <div
                                        className="w-full max-w-md bg-white rounded-t-2xl p-4 pb-8 overflow-y-auto transform transition-all duration-300 ease-out"
                                        onClick={(e) => e.stopPropagation()} // bu juda muhim!
                                    >
                                        <h2 className="text-lg font-semibold mb-3">{t.select_language_profile}</h2>
                                        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                                            {languages.map((l) => (
                                                <label
                                                    key={l.code}
                                                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="language"
                                                        value={l.code}
                                                        checked={selectedLang === l.code}
                                                        onChange={() => setSelectedLang(l.code)}
                                                        className="w-4 h-4 border border-white accent-orange-500"
                                                    />
                                                    <img src={l.flag} alt={l.name} className="w-5 h-5 rounded-full" />
                                                    <span>{l.code === 'uz' ? "O‘zbekcha" : l.name}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setLang(selectedLang); // faqat saqlashda yangilanadi
                                                setOpenModal(false);
                                            }}
                                            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                                        >
                                            {t.save_profile}
                                        </button>
                                    </div>
                                </div>
                            )}




                        </div>

                        {/* ===== LOGOUT ===== */}
                        <div className="mt-4 bg-[#FF7010] mx-3 rounded-xl shadow-sm">
                            <button className="w-full flex items-center gap-3 px-4 py-4 text-[white] font-medium">
                                <LogOut size={20} />
                                <span className="text-sm font-medium">{t.exit_profile}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ===== BOTTOM NAV ===== */}
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

/* ===== ITEM COMPONENT ===== */
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
