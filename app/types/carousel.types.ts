import { ReactNode } from 'react';

export interface Slide {
  id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
}

export interface AccessibleCarouselProps {
  slides: Slide[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

export interface SliderConfig {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  accessibility: boolean;
  arrows: boolean;
}

export interface CarouselContextType {
  shouldRespectReducedMotion: boolean;
  defaultSliderConfig: SliderConfig;
}

export interface CarouselProviderProps {
  children: ReactNode;
}

export interface CarouselState {
  isAutoRotating: boolean;
  currentSlide: number;
  isHovered: boolean;
  isFocused: boolean;
}

