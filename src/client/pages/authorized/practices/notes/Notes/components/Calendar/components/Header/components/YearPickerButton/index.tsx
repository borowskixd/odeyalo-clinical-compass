"use client";

import { type FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "@/client/assets/icons";
import { Button } from "@/client/components";

interface YearPickerButtonProps {
  currentYear: number;
  onYearSelect: (year: number) => void;
  onClose: () => void;
}

export const YearPickerButton: FC<YearPickerButtonProps> = ({
  currentYear,
  onYearSelect,
  onClose,
}) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);
  const yearsContainerRef = useRef<HTMLDivElement>(null);

  const currentYearNow = new Date().getFullYear();
  const startYear = 1970;

  const allYears = useMemo(() => {
    const years = [];
    for (let i = startYear; i <= currentYearNow; i++) {
      years.push(i);
    }
    return years;
  }, [currentYearNow]);

  const yearsPerPage = 12;
  const totalPages = Math.ceil(allYears.length / yearsPerPage);

  const displayedYears = useMemo(() => {
    const start = scrollIndex * yearsPerPage;
    const end = start + yearsPerPage;
    return allYears.slice(start, end);
  }, [scrollIndex, allYears]);

  const handlePrevPage = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (scrollIndex < totalPages - 1) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handleYearClick = (year: number) => {
    onYearSelect(year);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const yearIndex = allYears.findIndex((year) => year === currentYear);
    if (yearIndex !== -1) {
      const pageIndex = Math.floor(yearIndex / yearsPerPage);
      setScrollIndex(pageIndex);
    }
  }, [currentYear, allYears]);

  const isPrevDisabled = scrollIndex === 0;
  const isNextDisabled = scrollIndex === totalPages - 1;

  return (
    <div
      className={styles.yearPicker}
      ref={pickerRef}
    >
      <div className={styles.header}>
        <Button
          className={styles.navButton}
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
        >
          <ArrowLeft />
        </Button>
        <span className={styles.title}>
          {displayedYears[0]} - {displayedYears[displayedYears.length - 1]}
        </span>
        <Button
          className={styles.navButton}
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          <ArrowRight />
        </Button>
      </div>
      <div
        className={styles.grid}
        ref={yearsContainerRef}
      >
        {displayedYears.map((year) => (
          <button
            key={year}
            className={`${styles.yearOption} ${year === currentYear ? styles.activeYear : ""}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};
