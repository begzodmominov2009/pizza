import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react"
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/category", label: "Category", icon: LayoutGrid },
    { to: "/search", label: "Search", icon: Search },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/profile", label: "Profile", icon: User },
  ]

  return (
    <>
      <div className="fixed mx-auto  bottom-0 left-0 right-0 z-50 bg-white border-t  border-[#d2cdcd95] shadow-md md:hidden">
        <div className="flex justify-between px-3 py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs transition ${isActive ? "text-[#FF7010]" : "text-gray-500"
                }`
              }
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className='container mx-auto px-2 lg:px-0 2xl:px-32'>

        footer
      </div>
    </>
  )
}
