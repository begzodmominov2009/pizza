import { MapPinned, ReceiptRussianRuble, ShoppingCart, User } from 'lucide-react'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { CartContext } from '../../context/CartContext'
import { LanguageContext } from '../../context/ChangeLanguageContext'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [sum, setSum] = useState(0)
    const { cart } = useContext(CartContext)
    // const [langs, setLangs] = useState('UZ')
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)
    const { lang, setLang, t } = useContext(LanguageContext)

    const languages = [
        { code: 'uz', name: 'UZ', flag: '/uz.png' },
        { code: 'en', name: 'EN', flag: '/en.png' },
        { code: 'ru', name: 'RU', flag: '/ru.png' },
    ]

    useEffect(() => {
        const total = cart?.reduce(
            (acc, el) => acc + el.basePrice * (el.qty || 1),
            0
        ) || 0
        setSum(total)
    }, [cart])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > 25 && currentScrollY > lastScrollY) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
            <div
                className={`transition-all duration-300 ease-in-out ${isScrolled
                    ? 'max-h-0 opacity-0 -translate-y-full'
                    : 'max-h-16 opacity-100 translate-y-0'
                    }`}
            >
                <div className="flex items-center justify-between container mx-auto pt-2 px-2 sm:px-0 2xl:px-32">
                    <div className="flex items-center gap-6 lg:gap-12">
                        <div className="flex items-center gap-1">
                            <MapPinned className="text-[#FF7010] w-5 h-4" />
                            <p className="text-[14px]">{t.header_head}</p>
                        </div>
                        <p className="text-[14px] hidden sm:flex">{t.header_region}</p>
                        <p className="text-[14px] hidden lg:flex">
                            {t.header_clock} <span className="font-medium">00:24:19</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-[14px] hidden lg:flex">{t.header_work_time}</p>

                        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                            <div className="flex cursor-pointer items-center gap-1">
                                <User className="text-[#FF7010] w-5 h-5" />
                                <p className="text-[14px] whitespace-nowrap">{t.header_profile}</p>
                            </div>

                            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                                <div
                                    className="flex items-center gap-1 justify-between border border-gray-300 rounded px-2 py-1 cursor-pointer bg-white"
                                    onClick={() => setOpen((prev) => !prev)}>
                                    <div className="flex items-center gap-1">
                                        <img
                                            src={languages.find((l) => l.code === lang)?.flag}
                                            alt="flag"
                                            className="w-4 h-4 rounded-full"
                                        />
                                        <span className="text-[12px]">{lang.toUpperCase()}</span>
                                    </div>
                                    <span className="text-[11px]">▼</span>
                                </div>

                                {open && (
                                    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
                                        {languages.map((l) => (
                                            <div
                                                key={l.code}
                                                onClick={() => {
                                                    setLang(l.code)
                                                    setOpen(false)
                                                }}
                                                className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-100">
                                                <img src={l.flag} alt={l.name} className="w-5 h-5 rounded-full" />
                                                <span className="text-[12px]">{l.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-[#F0F0F0] mt-2" />
            </div>

            <div className="container mx-auto px-2 lg:px-0 2xl:px-32 flex items-center justify-between py-3">
                <img src="/logo.svg" alt="logo" />
                <div className="flex items-center gap-2">
                    <button className="flex items-center cursor-pointer w-[89px] h-[40px] justify-center gap-2 bg-[#FF7010] text-white px-3 py-1 rounded">
                        <ShoppingCart className="w-5 h-5" />
                        <span>{cart.length}</span>
                    </button>
                    <button className="flex items-center cursor-pointer max-w-[129px] w-full h-[40px] justify-center gap-[2px] bg-[#FF7010] text-white px-3 py-1 rounded">
                        <ReceiptRussianRuble className="w-5 h-5" />
                        <span className="flex items-center">{Math.ceil(sum)}</span>
                    </button>
                </div>
            </div>

            <hr className="border-[#F0F0F0]" />
        </header>
    )
}

export default Header
