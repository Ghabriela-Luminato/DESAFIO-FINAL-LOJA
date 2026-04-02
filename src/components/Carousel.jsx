import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { memo } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';

function Carrossel() {
  return (
    <div style={{ margin: "20px 0" }}>
      <Swiper
        modules={[Autoplay, Pagination]} 
        slidesPerView={1}
        loop={true}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}

        speed={800}

        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img src="/carrosel1.svg" style={imgStyle} />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/carrosel2.svg" style={imgStyle} />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/carrosel3.svg" style={imgStyle} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default memo(Carrossel);

const imgStyle = {
  width: "100%",
  height: "500px",
  objectFit: "cover",
  borderRadius: "15px"
};