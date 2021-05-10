import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper'
import { CategoriesHome } from '../Categories/CategoriesHome'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/lazy/lazy.scss'
//import './SwiperSlider.scss'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade])

const SwiperSlider = ({ products, flag }) => {
  let category = []
  if (flag) {
    category = products
  }
  else {
    category = products.map((item) => item.product)

  }
  // console.log('Slider: ', category, ' Productos:')

  return (
    <Swiper
      navigation
      style={{ '--swiper-navigation-color': '#9abf15' }}
      pagination={false}
      scrollbar={false}
      autoHeight={false}
      loop={true}
      grabCursor={true}
      breakpoints={
        {
          //Solo celulares
          300: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          //Tablets medianas y Celulares grandes
          768: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          //Laptops pequeñas y tablets grandes
          992: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          //Laptops grandes y PC
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 0
          },
        }
      }
    >
      {
        category?.filter(item => item?.stock > 0).map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CategoriesHome
                key={item.id}
                id={item.id}
                stock={item.stock}
                title={item.name}
                price={item.price}
                image={item.images}
                discount={item.discount}
                reviews={item.reviews}
              />
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  )
}

export default SwiperSlider
