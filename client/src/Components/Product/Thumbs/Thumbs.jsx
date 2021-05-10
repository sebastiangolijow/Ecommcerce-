import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import styles from "./Thumbs.module.scss";
SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

const Thumbs = (images) => {
  return (
    <>
      <Swiper
        style={{ "--swiper-navigation-color": "#9abf15" }}
        navigation={true}
        pagination={true}
        autoHeight={false}
        loop={true}
        effect={"fade"}
        grabCursor={true}
      >
        {images.images?.map((image, i) => {
          return (
            <SwiperSlide key={i} className={styles.container}>
              <img
                src={image?.url}
                alt="This should be something graphic, but we can't find it. Sorry!"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Thumbs;
