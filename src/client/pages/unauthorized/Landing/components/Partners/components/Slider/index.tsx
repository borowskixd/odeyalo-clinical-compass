"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface SliderProps {
  children: ReactNode[];
}

export const Slider = ({ children }: SliderProps) => {
  const swiperRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const totalSlides = children.length;

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      setProgress((swiper.activeIndex / (swiper.slides.length - 1)) * 100);

      swiper.on("slideChange", () => {
        setProgress((swiper.activeIndex / (swiper.slides.length - 1)) * 100);
      });
    }
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setProgress(value);

    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const slideIndex = Math.round(
        (value / 100) * (swiper.slides.length - swiper.params.slidesPerView),
      );

      swiper.slideTo(slideIndex);
    }
  };

  const thumbWidth = Math.max(20, 60 - totalSlides * 2);

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className={styles.swiper}
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={6}
        pagination={false}
        breakpoints={{
          0: { slidesPerView: 1 },
          360: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 6 },
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide
            key={index}
            className={styles.slide}
          >
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.sliderContainer}>
        <div className={styles.track} />
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSliderChange}
          className={styles.rangeSlider}
          style={
            {
              "--thumb-width": `${thumbWidth}px`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};
