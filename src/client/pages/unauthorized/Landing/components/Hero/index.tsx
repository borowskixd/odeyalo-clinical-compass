"use client";

import { type FC, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface Slide {
  id: number;
  strongText1: string;
  strongText2: string;
  colorClass: string;
}

const slides: Slide[] = [
  {
    id: 1,
    strongText1: "Сними стресс",
    strongText2: "с нашим приложением",
    colorClass: styles.slideGreen,
  },
  {
    id: 2,
    strongText1: "Бережно приди",
    strongText2: "к решению конфликтов",
    colorClass: styles.slideRed,
  },
  {
    id: 3,
    strongText1: "Пройди экзамены",
    strongText2: "без лишней тревоги",
    colorClass: styles.slideBlue,
  },
];

export const Hero: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className={styles.heroWrapper}>
      <section className={styles.mainSection}>
        <div className={styles.carouselContainer}>
          <div
            className={styles.slidesWrapper}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`${styles.slide} ${slide.colorClass}`}
              >
                <h1 className={styles.title}>
                  <br />
                  <strong className={styles.strong}>{slide.strongText1}</strong>
                  <br />
                  <strong className={styles.strong}>{slide.strongText2}</strong>
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentSlide === index ? styles.dotActive : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
