import axios from 'axios'
import { Minus, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Autoplay } from 'swiper/modules'
import MyImage from '../../components/loading-image/LoadingImage'
import { LanguageContext } from '../../context/ChangeLanguageContext'

const HomePage = () => {
  const [categoryData, setCategoryData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [pendingProduct, setPendingProduct] = useState(null);
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, increase, decrease } = useContext(CartContext)
  const { lang, setLang, t } = useContext(LanguageContext)
  const [userLoginModal, SetUserLoginModal] = useState(false)
  const DEFAULT_CATEGORY_ID = "6";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");



  async function getCategories() {
    try {
      const res = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/categories")
      setCategoryData(res.data)
      setActiveCategory(res.data[0]?.id) 
    } catch (err) {
      console.log(err);
    }
  }
  async function getProdcuts() {
    try {
      const resProdcust = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/products")
      setProductsData(resProdcust.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("pizza-user");
    if (user) {
      // agar user allaqachon mavjud bo‘lsa, modal ochilmasin
      SetUserLoginModal(false);
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getCategories()
      await getProdcuts()
      setLoading(false)
    }
    fetchData()
  }, [])

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

  function handleSubmit() {
    const userData = { name, phone, password };
    localStorage.setItem("pizza-user", JSON.stringify(userData));

    if (pendingProduct) {
      addToCart(pendingProduct);
      setPendingProduct(null);
    }

    SetUserLoginModal(false);
  }


  return (
    <section>
      <div className="container mx-auto px-2 sm:px-0 2xl:px-32">
        <div className='grid grid-cols-8 gap-35 sm:gap-45 xl:gap-[185px] 2xl:gap-46 scrollbar  [&::-webkit-scrollbar]:w-0 overflow-x-scroll'>
          {categoryData.map((el) => (
            <div
              key={el.id}
              className={`w-[130px] sm:w-[170px] h-[84px] sm:h-[104px] flex items-center justify-center border rounded-lg cursor-pointer 
                ${activeCategory === el.id ? 'bg-white border-[#E23535]' : 'bg-white border-gray-300'}`}
              onClick={() => {
                setActiveCategory(el.id)
                setSelectedCategoryId(el.id)
              }}
            >
              <div className='flex flex-col items-center'>
                <MyImage
                  alt={"Category"}
                  height={"h-10"}
                  width={"w-10"}
                  src={el.icon}
                />
                <p className={`pt-0 sm:pt-1 ${activeCategory === el.id ? 'text-[#E23535]' : 'text-black'}`}>
                  {el.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 sm:gap-5 overflow-x-scroll scrollbar  [&::-webkit-scrollbar]:w-0 w-full py-3">
          <Swiper
            spaceBetween={12}
            className="w-full py-3"
            loop={false}
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              640: {
                slidesPerView: 2.1,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 4.2,
              },
            }}
          >
            {(selectedCategoryId
              ? productsData.filter(item => item.categoryId === selectedCategoryId)
              : productsData.filter(item => item.categoryId === DEFAULT_CATEGORY_ID)
            ).map((pro) => (
              <SwiperSlide
                key={pro.id}
                className="!w-auto"
              >
                {/* CARD – O‘ZGARMAGAN */}
                <div className='flex items-center gap-3 p-3 bg-white border-gray-200 rounded-lg justify-center overflow-hidden border w-[320px] sm:w-[370px]'>
                  <div className='w-[160px]'>
                    <MyImage
                      alt={pro.title}
                      src={pro.image}
                      width={"w-full"}
                      height={"h-10"}
                    />
                  </div>

                  <div>
                    <h1 className='font-medium text-[18px] whitespace-nowrap'>
                      {pro.title}
                    </h1>

                    <p className='line-clamp-2'>
                      Бекон, Ветчина, Грибы, Курица, Лук, Маслины, Огурцы мари...
                    </p>

                    <div className='mt-4 flex items-center justify-end gap-2'>
                      {cart.find((el) => el.id === pro.id) ? (
                        <div className="w-[40px] sm:max-w-[111px] w-full h-[38px] sm:h-[38px] bg-[#FF7010] rounded-lg text-white flex items-center justify-between">
                          <button
                            onClick={() => decrease(pro)}
                            className="w-full h-full flex items-center cursor-pointer justify-center hover:bg-black/10 rounded-l-lg"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="text-[14px] flex items-center justify-center w-full sm:text-[18px] select-none">
                            {cart.find((el) => el.id === pro.id).qty}
                          </span>

                          <button
                            onClick={() => increase(pro)}
                            className="w-full h-full flex items-center cursor-pointer justify-center hover:bg-black/10 rounded-r-lg"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const user = localStorage.getItem("pizza-user");
                            if (user) {
                              addToCart(pro);
                            } else {
                              setPendingProduct(pro);
                              SetUserLoginModal(true);
                            }
                          }}
                          className='w-[40px] sm:max-w-[131px] px-2 w-full h-[38px] sm:h-[38px] bg-[#FF7010] rounded-lg text-[white] font-medium cursor-pointer text-[14px] sm:text-[18px]'
                        >
                          {t.cart_button_text}
                        </button>

                      )}

                      <h2 className='font-medium whitespace-nowrap  bg-orange-100 sm:bg-transparent p-2 sm:p-0 rounded-lg text-[#FF7010] text-[16px] xl:text-[18px]'>
                        от <span className='font-medium'>{pro.basePrice}</span> ₽
                      </h2>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex items-center justify-between bg-[white] rounded-lg gap-5 p-3'>
          <h1 className='font-medium hidden sm:flex text-[16px] md:text-[18px] whitespace-nowrap'>Проверить адрес доставки</h1>
          <input className='border border-gray-200 px-2 py-2   rounded w-full outline-none' placeholder='Адрес' type="text" />
          <button className='rounded-lg text-[white] cursor-pointer bg-[#FF7010] px-3 py-2'>
            Проверить
          </button>
        </div>

        {categoryData.map((el) => (
          <div className='text-left'>
            <div className='flex items-center justify-between'>
              <h1 className='text-[24px] font-medium mt-5'>
                {
                  productsData.find((e) => e.categoryId === el.id) ? el.title : ""
                }
              </h1>
              <a href={`all/${el.id}`} className='bg-orange-500 px-3 py-1 rounded-lg text-[white] font-medium cursor-pointer'>
                All {""}
                {productsData.find((item) => item.categoryId === el.id) ? el.title : ""}
              </a>
            </div>
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {productsData
                .filter((el1) => el1.categoryId === el.id)
                .map((item) => (
                  <div className='w-full sm:max-w-[310px] flex sm:flex-col items-center justify-between gap-5 p-2 sm:p-3 w-full bg-white border-gray-200 rounded-lg overflow-hidden border'>
                    <div className='w-[180px]'>
                      <MyImage
                        alt={"image"}
                        src={item.image}
                        width={"w-full"}
                        height={"h-[180px]"}
                      />
                    </div>
                    <div>
                      <div>
                        <h1 className='font-medium text-[18px]'>{item.title}</h1>
                        <p className='line-clamp-2'>Бекон, Ветчина, Грибы, Курица, Лук, Маслины, Огурцы мари...</p>
                      </div>
                      <div className='mt-4 flex items-center gap-2 justify-end'>
                        {
                          cart.find((el) => el.id === item.id) ? (
                            <div className="flex items-center justify-between max-w-[80px] sm:max-w-[131px] w-full h-[40px] sm:h-[48px] bg-[#FF7010] rounded-lg text-white">
                              <button
                                onClick={() => decrease(item)}
                                className="flex cursor-pointer items-center justify-center w-[32px] sm:w-[40px] h-full hover:bg-black/10 rounded-l-lg"
                              >
                                <Minus size={18} strokeWidth={2} />
                              </button>

                              <span className="font-medium text-[14px] sm:text-[18px] select-none">
                                {cart.find((el) => el.id === item.id).qty}
                              </span>

                              <button
                                onClick={() => increase(item)}
                                className="flex cursor-pointer items-center justify-center w-[32px] sm:w-[40px] h-full hover:bg-black/10 rounded-r-lg"
                              >
                                <Plus size={18} strokeWidth={2} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                const user = localStorage.getItem("pizza-user");
                                if (user) {
                                  // user bor bo‘lsa, darhol cartga qo‘shamiz
                                  addToCart(item);
                                } else {
                                  // user yo‘q bo‘lsa, modal ochamiz va productni pendingga qo‘shamiz
                                  setPendingProduct(item);
                                  SetUserLoginModal(true);
                                }
                              }}
                              className='max-w-[80px] sm:max-w-[131px] px-2 w-full h-[40px] sm:h-[48px] bg-[#FF7010] rounded-lg text-[white] font-medium cursor-pointer text-[14px] sm:text-[18px]'
                            >
                              {t.cart_button_text}
                            </button>

                          )
                        }
                        <h2 className='font-medium whitespace-nowrap bg-orange-100 sm:bg-transparent p-2 sm:p-0 rounded text-[#FF7010] text-[16px] xl:text-[18px]'>от <span className='font-medium'>{item.basePrice}</span> ₽</h2>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {userLoginModal ? (
        <div onClick={() => SetUserLoginModal(false)} className='bg-[black]/40 px-2  flex items-center justify-center fixed h-screen top-0 w-full z-109'>
          <div onClick={(e) => e.stopPropagation()} className='bg-[white] rounded-lg border p-3 border-gray-300 shadow-2xl max-w-[450px] w-full'>
            <h1 className='text-center font-medium text-[18px] mb-2'>{t.register_modal}</h1>
            <div className='flex flex-col gap-2'>
              <input
                required
                className='border py-2 px-2 border-gray-300 rounded outline-none w-full'
                type="text"
                placeholder={t.name_register}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                className='border py-2 px-2 border-gray-300 rounded outline-none w-full'
                type="tel"
                placeholder={t.phone_register}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                required
                className='border py-2 px-2 border-gray-300 rounded outline-none w-full'
                type="password"
                placeholder={t.password_register}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            <div className='flex items-center w-full mt-3 gap-2'>
              <button onClick={() => SetUserLoginModal(false)} className='w-full bg-[red] hover:bg-[#ff0000dc] rounded-lg cursor-pointer py-2 text-[white] font-medium'>{t.cancel}</button>
              <button onClick={() => handleSubmit()} className='w-full bg-[#FF7010] hover:bg-[#ff7010d6] rounded-lg cursor-pointer py-2 text-[white] font-medium'>{t.save}</button>
            </div>
          </div>
        </div>
      ) : ""}

    </section>
  )
}

export default HomePage
