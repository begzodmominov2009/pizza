import axios from 'axios'
import { Minus, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Autoplay } from 'swiper/modules'

const HomePage = () => {
  const [categoryData, setCategoryData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, increase, decrease } = useContext(CartContext)
  const DEFAULT_CATEGORY_ID = "6";

  async function getCategories() {
    try {
      const res = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/categories")
      setCategoryData(res.data)
      setActiveCategory(res.data[0]?.id) // default: birinchi category
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
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <section>
      <div className="container mx-auto px-2 sm:px-0 2xl:px-32">
        <div className='grid grid-cols-8 gap-35 sm:gap-40 xl:gap-2 2xl:gap-2 scrollbar  [&::-webkit-scrollbar]:w-0 overflow-x-scroll'>
          {categoryData.map((el) => (
            <div
              key={el.id}
              className={`w-[130px] sm:w-[150px] h-[84px] sm:h-[104px] flex items-center justify-center border rounded-lg cursor-pointer 
                ${activeCategory === el.id ? 'bg-white border-[#E23535]' : 'bg-white border-gray-300'}`}
              onClick={() => {
                setActiveCategory(el.id)
                setSelectedCategoryId(el.id)
              }}
            >
              <div className='flex flex-col items-center'>
                <img className='w-10 h-10' src={el.icon} alt={el.title} />
                <p className={`pt-0 sm:pt-1 ${activeCategory === el.id ? 'text-[#E23535]' : 'text-black'}`}>
                  {el.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 sm:gap-5 overflow-x-scroll scrollbar  [&::-webkit-scrollbar]:w-0 w-full py-3">
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            className="w-full py-3"
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            breakpoints={{
              0: {
                slidesPerView: 1.1,   // juda kichik ekran
              },
              480: {
                slidesPerView: 1.5,
              },
              640: {
                slidesPerView: 2.2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 2,
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
                <div className='flex items-center gap-3 p-3 bg-white border-gray-200 rounded-lg overflow-hidden border min-w[330px] sm:min-w-[270px]'>

                  <div>
                    <img
                      className='w-[100px] h-auto sm:h-[120px]'
                      src={pro.image}
                      alt={pro.title}
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
                        <div className="max-w-[60px] sm:max-w-[111px] w-full h-[30px] sm:h-[38px] bg-[#FF7010] rounded-lg text-white flex items-center justify-between">
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
                          onClick={() => addToCart(pro)}
                          className='max-w-[60px] sm:max-w-[111px] cursor-pointer w-full h-[30px] sm:h-[38px] bg-[#FF7010] rounded-lg text-white font-medium text-[14px] sm:text-[18px]'
                        >
                          Выбрать
                        </button>
                      )}

                      <h2 className='font-medium whitespace-nowrap bg-orange-100 sm:bg-transparent p-2 sm:p-0 rounded text-[#FF7010] text-[16px] xl:text-[18px]'>
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
            <h1 className='text-[24px] font-medium mt-5'>
              {
                productsData.find((e) => e.categoryId === el.id) ? el.title : ""
              }
            </h1>
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {productsData
                .filter((el1) => el1.categoryId === el.id)
                .map((item) => (
                  <div className='w-full sm:max-w-[310px] flex sm:flex-col items-center justify-between gap-5 p-2 sm:p-3 w-full bg-white border-gray-200 rounded-lg overflow-hidden border'>
                    <img className='w-[140px] sm:w-full h-auto sm:h-[250px]' src={item.image} alt="image" />
                    <div>
                      <div>
                        <h1 className='font-medium text-[18px]'>{item.title}</h1>
                        <p className='line-clamp-2'>Бекон, Ветчина, Грибы, Курица, Лук, Маслины, Огурцы мари...</p>
                      </div>
                      <div className='mt-4 flex items-center gap-2 justify-between'>
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
                            <button onClick={() => addToCart(item)} className='max-w-[80px] sm:max-w-[131px] w-full h-[40px] sm:h-[48px] bg-[#FF7010] rounded-lg text-[white] font-medium cursor-pointer text-[14px] sm:text-[18px]'>
                              Выбрать
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
    </section>
  )
}

export default HomePage
