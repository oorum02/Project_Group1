import Alissa from "../assets/TeamAvatars/Alissa.png";
import Danni from "../assets/TeamAvatars/Danni.png";
import Gabriella from "../assets/TeamAvatars/Gabriella.png";
import Lisa from "../assets/TeamAvatars/Lisa.jpeg";
import Lizzie from "../assets/TeamAvatars/Lizzie.png";
import Osayi from "../assets/TeamAvatars/Osayi.png";
import Rima from "../assets/TeamAvatars/Rima.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/carousel.css";

function Creators() {
    const images = [
        { src: Alissa, title: "Documentary: Alissa M Herzog" },
        { src: Danni, title: "Fantasy: Danni" },
        { src: Gabriella, title: "Horror: Gabriella" },
        { src: Lisa, title: "Action: Lisa Fury" },
        { src: Lizzie, title: "Comedy: Lizzie" },
        { src: Osayi, title: "Cartoon: Osayi" },
        { src: Rima, title: "Lorem: Rima" },
     ];

    return(
      <div className="the-creators-container" id="creators">
         <h1 className="the-creators-title">The Creators</h1>
         <div className="carousel-content-container">
            <div className="carousel-container">
              <Swiper
                 modules={[Navigation, Pagination]}
                 spaceBetween={20}
                 slidesPerView={1}
                 navigation
                 pagination={{ clickable: true }}
                 breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                 }}
                 className="carousel-swiper"
              >
                 {images.map((image, i) => (
                    <SwiperSlide key={i}>
                       <div className="card">
                          <img src={image.src} alt={image.title} />
                          <div className="name-container">
                             <p>{image.title}</p>
                          </div>
                       </div>
                    </SwiperSlide>
                 ))}
              </Swiper>
           </div>
         </div>
      </div>
    )
}

export default Creators