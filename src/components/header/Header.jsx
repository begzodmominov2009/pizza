import { MapPinned, ShoppingCart, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > 25 && currentScrollY > lastScrollY) {
                // Pastga scroll qilinsa → yashir
                setIsScrolled(true)
            } else {
                // Tepaga scroll qilinsa → chiqadi
                setIsScrolled(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <header className="fixed top-0 w-full bg-white z-50">
            {/* TOP BAR */}
            <div
                className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isScrolled
                        ? 'max-h-0 opacity-0 -translate-y-full'
                        : 'max-h-16 opacity-100 translate-y-0'
                    }
        `}
            >
                <div className="flex items-center justify-between container mx-auto pt-2 px-2 sm:px-0 2xl:px-32">
                    <div className="flex items-center gap-6 lg:gap-12">
                        <div className="flex items-center gap-1">
                            <MapPinned className="text-[#FF7010] w-5 h-4" />
                            <p className="text-[14px]">Москва</p>
                        </div>
                        <p className="text-[14px] hidden sm:flex">Проверить адрес</p>
                        <p className="text-[14px] hidden lg:flex">
                            Среднее время доставки*: <span className="font-medium">00:24:19</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-[14px] hidden lg:flex">Время работы: с 11:00 до 23:00</p>
                        <div className="flex cursor-pointer items-center gap-1">
                            <User className="text-[#FF7010] w-5 h-5" />
                            <p className="text-[14px]">Войти в аккаунт</p>
                        </div>
                    </div>
                </div>
                <hr className="border-[#F0F0F0] mt-2" />
            </div>

            {/* MAIN HEADER */}
            <div className="container mx-auto px-2 lg:px-0 2xl:px-32 flex items-center justify-between py-3">
                <img src="/logo.svg" alt="logo" />
                <button className="flex items-center cursor-pointer w-[89px] h-[40px] justify-center  gap-2 bg-[#FF7010] text-white px-3 py-1 rounded">
                    <ShoppingCart className='w-5 h-5' />
                    0 ₽
                </button>
            </div>

            <hr className="border-[#F0F0F0]" />
        </header>
    )
}

export default Header
