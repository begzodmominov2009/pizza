import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (el) => {
        setCart((prev) => [...prev, { ...el, qty: 1 }])
    }
    const increase = (el) => {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id === el.id) {
                    return { ...item, qty: item.qty + 1 }
                } else {
                    return item
                }
            })
        })
    }
    const decrease = (el) => {
        setCart((prev) => {
            return prev.filter((item) => item.qty > 1).map((e) => {
                if (el.id === e.id) {
                    return { ...e, qty: e.qty - 1 }
                } else {
                    return e
                }
            })
        })
    }
    return (
        <CartContext.Provider value={{cart, setCart, addToCart, increase, decrease}}>{children}</CartContext.Provider>
    )
}

export default CartProvider