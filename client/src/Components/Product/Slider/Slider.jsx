import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import Cards from "../Cards/Cards";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/lazy/lazy.scss";
import "./Slider.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const Slider = (products) => {
  return (
    <Swiper
      spaceBetween={0}
      navigation={false}
      //pagination={false}
      scrollbar={false}
      autoHeight={false}
      loop={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },

        640: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      }}
    >
      {products && console.log(products)}
      {products &&
        products.products.map((product, i) => {
          return (
            <SwiperSlide key={i}>
              <Cards
                key={product.id}
                id={product.id}
                images={product.images[0]?.url}
                title={product.name}
                stock={product.stock}
                price={product.price}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Slider;
