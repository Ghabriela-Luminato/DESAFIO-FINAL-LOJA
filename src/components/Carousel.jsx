import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { memo } from "react";

import img1 from "../assets/carrosel1.svg";
import img2 from "../assets/carrosel2.svg";
import img3 from "../assets/carrosel3.svg";
import img4 from "../assets/carrosel4.svg";
import "swiper/css";
import "swiper/css/pagination";

function Carrossel() {
  const imagens = [img1, img4, img2, img3];

  return (
    <div style={{ margin: "20px 0" }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        pagination={{ clickable: true }}
      >
        {imagens.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} style={imgStyle} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(Carrossel);

const imgStyle = {
  width: "100%",
  height: "500px",
  objectFit: "cover",
  borderRadius: "5px",
};