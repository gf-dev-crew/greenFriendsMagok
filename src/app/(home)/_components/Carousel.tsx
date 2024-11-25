'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  '/assets/heroImage_1.webp',
  '/assets/heroImage_2.webp',
  '/assets/heroImage_3.webp',
  '/assets/heroImage_4.webp',
];

export default function Carousel() {
  return (
    <div className="relative aspect-square w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
          horizontalClass: 'swiper-pagination-horizontal',
        }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              fill
              className="object-cover"
              alt={`메인 이벤트 슬라이드 ${index + 1}`}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
