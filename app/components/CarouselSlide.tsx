import React from 'react';
import Image from 'next/image';
import type { Slide } from '../types/carousel.types';
import {
  CAROUSEL_CLASSES,
  ARIA_ROLE_DESCRIPTIONS,
} from '../constants/carousel.constants';
import { getSlideAriaLabel } from '../utils/carousel.utils';

interface CarouselSlideProps {
  slide: Slide;
  index: number;
  totalSlides: number;
  isCurrentSlide?: boolean;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  slide,
  index,
  totalSlides,
  isCurrentSlide = false,
}) => {
  const altText = isCurrentSlide
    ? `${slide.alt}. ${slide.title}${slide.description ? `, ${slide.description}` : ''}`
    : slide.alt;

  return (
    <div className={CAROUSEL_CLASSES.SLIDE_WRAPPER}>
      <div
        role="group"
        aria-roledescription={ARIA_ROLE_DESCRIPTIONS.SLIDE}
        aria-label={getSlideAriaLabel(index, totalSlides)}
        className={CAROUSEL_CLASSES.ITEM}
      >
        <div className={CAROUSEL_CLASSES.IMAGE_CONTAINER}>
          <Image
            width={1000}
            height={1000}
            src={slide.image}
            alt={altText}
            className={CAROUSEL_CLASSES.IMAGE}
          />
        </div>
        <div className={CAROUSEL_CLASSES.CAPTION}>
          <h3 className={CAROUSEL_CLASSES.TITLE}>{slide.title}</h3>
          {slide.description && (
            <p className={CAROUSEL_CLASSES.DESCRIPTION}>{slide.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

