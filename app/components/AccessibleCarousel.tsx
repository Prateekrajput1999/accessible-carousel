"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AccessibleCarousel.css";
import type { AccessibleCarouselProps } from "../types/carousel.types";
import {
  ARIA_LABELS,
  ARIA_ROLE_DESCRIPTIONS,
  ARIA_LIVE_VALUES,
  CAROUSEL_CLASSES,
  DEFAULT_CAROUSEL_CONFIG,
  DEFAULT_SLIDER_CONFIG,
  KEYBOARD_KEYS,
} from "../constants/carousel.constants";
import {
  canStartRotation,
  shouldStopRotation,
  getNextSlideIndex,
  shouldRotate,
  shouldSetHovered,
  shouldClearHovered,
  isElementInCarousel,
  shouldSetFocused,
  shouldClearFocused,
  isFormElement,
  getShouldRespectReducedMotion,
} from "../utils/carousel.utils";
import { CarouselControls } from "./CarouselControls";
import { CarouselSlide } from "./CarouselSlide";

const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  slides,
  autoRotate: initialAutoRotate = DEFAULT_CAROUSEL_CONFIG.AUTO_ROTATE,
  autoRotateInterval = DEFAULT_CAROUSEL_CONFIG.AUTO_ROTATE_INTERVAL,
}) => {
  const shouldRespectReducedMotion = getShouldRespectReducedMotion();

  const [isAutoRotating, setIsAutoRotating] = useState(() => {
    if (shouldRespectReducedMotion) {
      return false;
    }
    return initialAutoRotate;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const toggleAutoRotation = useCallback(() => {
    if (shouldStopRotation(shouldRespectReducedMotion, isAutoRotating)) {
      setIsAutoRotating(false);
      return;
    }
    if (!canStartRotation(shouldRespectReducedMotion, isAutoRotating)) {
      return;
    }
    setIsAutoRotating((prev) => !prev);
    if (!isAutoRotating) {
      setIsHovered(false);
      setIsFocused(false);
    }
  }, [isAutoRotating, shouldRespectReducedMotion]);

  const goToPrevious = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  }, []);

  const goToNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }, []);

  useEffect(() => {
    if (
      shouldRotate(
        isAutoRotating,
        isHovered,
        isFocused,
        shouldRespectReducedMotion
      )
    ) {
      intervalRef.current = setInterval(() => {
        if (sliderRef.current) {
          const nextSlide = getNextSlideIndex(currentSlide, slides.length);
          sliderRef.current.slickGoTo(nextSlide);
        }
      }, autoRotateInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isAutoRotating,
    isHovered,
    isFocused,
    shouldRespectReducedMotion,
    currentSlide,
    slides.length,
    autoRotateInterval,
  ]);

  const handleMouseEnter = useCallback(() => {
    if (shouldSetHovered(isAutoRotating)) {
      setIsHovered(true);
    }
  }, [isAutoRotating]);

  const handleMouseLeave = useCallback(() => {
    if (shouldClearHovered(isAutoRotating, isFocused)) {
      setIsHovered(false);
    }
  }, [isAutoRotating, isFocused]);

  useEffect(() => {
    const checkFocus = () => {
      if (carouselRef.current) {
        const activeElement = document.activeElement;
        const hasFocus = isElementInCarousel(
          carouselRef.current,
          activeElement
        );
        if (shouldSetFocused(hasFocus, isAutoRotating)) {
          setIsFocused(true);
        } else if (shouldClearFocused(hasFocus, isAutoRotating, isHovered)) {
          setIsFocused(false);
        }
      }
    };

    document.addEventListener("focusin", checkFocus);
    document.addEventListener("focusout", checkFocus);

    return () => {
      document.removeEventListener("focusin", checkFocus);
      document.removeEventListener("focusout", checkFocus);
    };
  }, [isAutoRotating, isHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      if (!isElementInCarousel(carouselRef.current, activeElement)) {
        return;
      }

      if (isFormElement(activeElement)) {
        return;
      }

      switch (event.key) {
        case KEYBOARD_KEYS.ARROW_LEFT:
          event.preventDefault();
          goToPrevious();
          break;
        case KEYBOARD_KEYS.ARROW_RIGHT:
          event.preventDefault();
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToPrevious, goToNext]);
  const sliderSettings = useMemo(
    () => ({
      ...DEFAULT_SLIDER_CONFIG,
      beforeChange: (_: number, next: number) => handleSlideChange(next),
    }),
    [handleSlideChange]
  );

  return (
    <section
      ref={carouselRef}
      className={CAROUSEL_CLASSES.CONTAINER}
      role="region"
      aria-roledescription={ARIA_ROLE_DESCRIPTIONS.CAROUSEL}
      aria-label={ARIA_LABELS.CAROUSEL_REGION}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <CarouselControls
        isAutoRotating={isAutoRotating}
        onToggleRotation={toggleAutoRotation}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      <div
        id="carousel-items"
        className={CAROUSEL_CLASSES.ITEMS}
        aria-live={
          isFocused || !isAutoRotating
            ? ARIA_LIVE_VALUES.POLITE
            : ARIA_LIVE_VALUES.OFF
        }
        aria-atomic="true"
      >
        <Slider ref={sliderRef} {...sliderSettings}>
          {slides.map((slide, index) => (
            <CarouselSlide
              key={slide.id}
              slide={slide}
              index={index}
              totalSlides={slides.length}
              isCurrentSlide={
                (isFocused || !isAutoRotating) && index === currentSlide
              }
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default AccessibleCarousel;
