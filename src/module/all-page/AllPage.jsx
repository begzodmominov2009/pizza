import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { LanguageContext } from "../../context/ChangeLanguageContext";
import MyImage from "../../components/loading-image/LoadingImage";
import { Minus, Plus } from "lucide-react";

const AllPage = () => {
  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useContext(LanguageContext);
  const { cart, addToCart, increase, decrease } = useContext(CartContext);

  // 🔹 PRODUCTS FETCH
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          `https://693d1ae6f55f1be79301e90f.mockapi.io/categories/${id}/products`
        );
        setAllProducts(res.data);
        setCategoryTitle(res.data.title);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [id]);

  // 🔹 LOGIN + ADD PENDING PRODUCT
  const handleSubmit = () => {
    if (!name || !phone || !password) return;

    const userData = { name, phone, password };
    localStorage.setItem("pizza-user", JSON.stringify(userData));

    if (pendingProduct) {
      addToCart(pendingProduct);
      setPendingProduct(null);
    }

    setUserLoginModal(false);
    setName("");
    setPhone("");
    setPassword("");
  };

  return (
    <div>
      <h1 className="text-[22px] font-semibold mb-4">
        {categoryTitle}
      </h1>

      {/* PRODUCTS */}
      <div className="mt-5 container mx-auto px-2 md:px-0 2xl:px-33 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allProducts.map((item) => {
          const cartItem = cart.find((el) => el.id === item.id);

          return (
            <div
              key={item.id}
              className="w-full bg-white border border-gray-200 rounded-lg p-3 flex sm:flex-col gap-4"
            >
              <div className="w-[180px] mx-auto">
                <MyImage
                  alt="product"
                  src={item.image}
                  width="w-full"
                  height="h-[180px]"
                />
              </div>

              <div className="flex flex-col justify-between w-full">
                <div>
                  <h1 className="font-medium text-[18px]">
                    {item.title}
                  </h1>
                  <p className="line-clamp-2 text-[14px] text-gray-500">
                    Бекон, Ветчина, Грибы, Курица, Лук, Маслины...
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  {cartItem ? (
                    <div className="flex  items-center justify-between w-[110px] h-[40px] bg-[#FF7010] rounded-lg text-white">
                      <button
                        onClick={() => decrease(item)}
                        className="w-[36px] cursor-pointer h-full flex items-center justify-center"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="font-medium">
                        {cartItem.qty}
                      </span>

                      <button
                        onClick={() => increase(item)}
                        className="w-[36px] cursor-pointer h-full flex items-center justify-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const user = localStorage.getItem("pizza-user");
                        if (user) {
                          addToCart(item);
                        } else {
                          setPendingProduct(item);
                          setUserLoginModal(true);
                        }
                      }}
                      className="w-[110px] h-[40px] cursor-pointer bg-[#FF7010] rounded-lg text-white font-medium"
                    >
                      {t.cart_button_text}
                    </button>
                  )}

                  <span className="text-[#FF7010] font-medium whitespace-nowrap">
                    от {item.basePrice} ₽
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOGIN MODAL */}
      {userLoginModal && (
        <div
          onClick={() => setUserLoginModal(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-4 max-w-[420px] w-full"
          >
            <h1 className="text-center font-medium text-[18px] mb-3">
              {t.register_modal}
            </h1>

            <div className="flex flex-col gap-2">
              <input
                className="border rounded px-2 py-2"
                placeholder={t.name_register}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border rounded px-2 py-2"
                placeholder={t.phone_register}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="password"
                className="border rounded px-2 py-2"
                placeholder={t.password_register}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setUserLoginModal(false)}
                className="w-full bg-red-500 text-white rounded py-2"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSubmit}
                className="w-full bg-[#FF7010] text-white rounded py-2"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPage;
