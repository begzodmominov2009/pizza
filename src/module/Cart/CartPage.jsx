import { Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/ChangeLanguageContext";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { lang, setLang, t } = useContext(LanguageContext)
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = Array.isArray(carts) ? carts : [carts];
  const { cart, addToCart, increase, decrease } = useContext(CartContext)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.basePrice * item.qty;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <div className="relative w-24 h-24 animate-spin-slow flex items-center justify-center">
          {/* Pizza slice */}
          <div className="absolute w-24 h-24 rounded-full border-t-4 border-l-4 border-yellow-400 border-r-4 border-b-0 border-solid"></div>

          {/* Cheese melting effect */}
          <div className="absolute w-4 h-4 bg-orange-400 rounded-full top-1/2 left-1/3 animate-bounce delay-150"></div>
          <div className="absolute w-4 h-4 bg-orange-400 rounded-full top-2/3 left-2/3 animate-bounce delay-300"></div>
          <div className="absolute w-4 h-4 bg-orange-400 rounded-full top-1/3 left-2/3 animate-bounce delay-450"></div>
        </div>
      </div>

    )
  }


  return (
    <div className="w-full container mx-auto  px-0 2xl:px-33">
      {carts.lenght ? (
        <div
          className="w-full w-full bg-white rounded-[12px] p-4 md:p-6
        "
        >
          {/* Header */}
          <h1 className="text-[18px] font-semibold mb-4">{t.your_order_cart}</h1>

          {/* Order Items */}
          {cartItems.map((item, i) => (
            <div
              key={item.id || i}
              className="flex items-center justify-between mb-3 p-3 border border-gray-300 rounded-[10px]"
            >
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[48px] sm:w-[52px] h-[58px] sm:h-[58px] rounded-full object-cover"
                />

                <div>
                  <p className="text-[14px] font-medium">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-gray-400">
                    {item.weight} г
                  </p>
                </div>
              </div>

              <div className="flex items-center w-[145px] gap-2">
                <div className="w-[50px] px-1 sm:px-1 flex items-center justify-center gap-3 sm:w-[111px] w-full h-[28px] sm:h-[38px] bg-[#FF7010] rounded-lg text-white flex items-center justify-between">
                  <button onClick={() => decrease(item)} className="w-full h-full flex items-center cursor-pointer justify-center hover:bg-black/10 rounded-l-lg">
                    <Minus className="w-3 sm:w-5 h-3 sm:h-5" />
                  </button>

                  <span className="text-[14px] flex items-center justify-center w-full sm:text-[18px] select-none">
                    {cart?.find((el) => el?.id === item?.id)?.qty}
                  </span>

                  <button onClick={() => increase(item)} className="w-full h-full flex items-center cursor-pointer justify-center hover:bg-black/10 rounded-r-lg">
                    <Plus className="w-3 sm:w-5 h-3 sm:h-5" />
                  </button>
                </div>

                <p className="text-[14px]  w-[75px] font-semibold whitespace-nowrap">
                  {item.basePrice.toLocaleString()} ₽
                </p>
              </div>
            </div>
          ))}


          {/* Promo */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder={t.promo_code_cart}
              className="flex-1 border border-gray-300 outline-none rounded-[8px] px-3 py-2 text-[14px]"
            />
            <button
              className="
           w-[40px] h-[40px]
         bg-orange-500 text-white
           rounded-[8px]
           cursor-pointer
           flex items-center justify-center
           group"
            >
              <span
                className="
              inline-block
              transition-transform
              duration-500
              ease-in-out
              group-hover:rotate-[360deg]"
              >
                ➜
              </span>
            </button>
          </div>

          {/* Add to order */}
          <h2 className="text-[16px] font-semibold mb-2">
            {t.add_to_order_cart}
          </h2>

          <div className="flex gap-3 overflow-x-auto scrollbar  [&::-webkit-scrollbar]:w-0 mb-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="min-w-[120px] md:min-w-[150px] border border-gray-300 rounded-[12px] p-2 text-center"
              >
                <img
                  src="/item.png"
                  className="w-full h-[70px] object-contain"
                  alt=""
                />
                <p className="text-[13px] mt-1">Картофель фри</p>
                <button className="mt-2 w-full cursor-pointer bg-orange-500 text-white rounded-[8px] py-1 text-[13px]">
                  179 ₽
                </button>
              </div>
            ))}
          </div>

          {/* Sauces */}
          <h2 className="text-[16px] font-semibold mb-2">{t.sauces_cart}</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="border border-gray-300 rounded-[10px] p-2 text-center">
                <img
                  src="/sauce.png"
                  className="w-full h-[40px] object-contain"
                  alt=""
                />
                <p className="text-[12px]">Соус</p>
                <button className="mt-2 w-full cursor-pointer bg-orange-500 text-white rounded-[8px] py-1 text-[13px]">
                  179 ₽
                </button>
              </div>
            ))}
          </div>

          {/* About You */}
          <h2 className="text-[16px] font-semibold mb-2">{t.about_you_cart}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            <input
              className="border border-gray-300 outline-none rounded-[8px] px-3 py-2 text-[14px]"
              placeholder={t.name_register}
            />
            <input
              className="border border-gray-300 outline-none rounded-[8px] px-3 py-2 text-[14px]"
              placeholder={t.phone_register}
            />
            <input
              className="md:col-span-2 border border-gray-300 outline-none rounded-[8px] px-3 py-2 text-[14px]"
              placeholder={t.email_cart}
            />
          </div>

          {/* Delivery */}
          <h2 className="text-[16px] font-semibold mb-2">{t.delivery_cart}</h2>
          <div className="flex gap-2 mb-4 max-w-[420px]">
            <button className="flex-1 cursor-pointer bg-orange-500 text-white rounded-[8px] py-2">
              {t.delivery_cart}
            </button>
            <button className="flex-1 border cursor-pointer rounded-[8px] py-2">
              {t.pickup_cart}
            </button>
          </div>

          {/* Comment */}
          <textarea
            placeholder={t.any_notes_cart}
            className="w-full max-w-[600px] outline-none border-gray-300 border rounded-[10px] p-3 text-[14px] mb-6"
          />

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <p className="text-[16px] font-semibold">
              {t.total_cart} {totalPrice.toLocaleString()} ₽
            </p>
            <button className="bg-orange-500 cursor-pointer text-white rounded-[10px] px-6 py-3">
              {t.place_order_cart}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          {/* Rasm va matn */}
          <div className="flex items-center gap-3 sm:gap-5  mb-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8250/8250566.png"
              alt="Empty cart"
              className="w-22 sm:w-32 h-22 sm:h-32 mx-auto"
            />
            <p className="text-[24px] sm:text-[28px] font-semibold text-gray-600">
              {t.fill_your_cart}
            </p>
          </div>

          {/* Button */}
          <Link
            to={"/"}
            className="bg-orange-500 cursor-pointer hover:bg-orange-600 transition-colors duration-300 rounded-lg px-6 py-3 text-white font-medium shadow-lg shadow-orange-200"
          >
            {t.home}
          </Link>
        </div>

      )}
    </div>
  );
}
