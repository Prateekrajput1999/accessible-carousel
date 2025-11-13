export const getNextSlideIndex = (currentIndex: number, totalSlides: number): number => {
  return (currentIndex + 1) % totalSlides;
};

export const getPreviousSlideIndex = (currentIndex: number, totalSlides: number): number => {
  return (currentIndex - 1 + totalSlides) % totalSlides;
};

export const shouldPauseRotation = (
  isAutoRotating: boolean,
  isHovered: boolean,
  isFocused: boolean,
  shouldRespectReducedMotion: boolean
): boolean => {
  return !isAutoRotating || isHovered || isFocused || shouldRespectReducedMotion;
};

export const shouldRotate = (
  isAutoRotating: boolean,
  isHovered: boolean,
  isFocused: boolean,
  shouldRespectReducedMotion: boolean
): boolean => {
  return isAutoRotating && !isHovered && !isFocused && !shouldRespectReducedMotion;
};

export const isFormElement = (element: Element | null): boolean => {
  return (
    element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
  );
};

export const isElementInCarousel = (
  carouselElement: HTMLElement | null,
  targetElement: Element | null
): boolean => {
  if (!carouselElement || !targetElement) {
    return false;
  }
  return carouselElement.contains(targetElement);
};

export const getSlideAriaLabel = (index: number, total: number): string => {
  return `${index + 1} of ${total}`;
};

export const canStartRotation = (
  shouldRespectReducedMotion: boolean,
  isAutoRotating: boolean
): boolean => {
  if (shouldRespectReducedMotion && isAutoRotating) {
    return false;
  }
  return !shouldRespectReducedMotion;
};

export const shouldStopRotation = (
  shouldRespectReducedMotion: boolean,
  isAutoRotating: boolean
): boolean => {
  return shouldRespectReducedMotion && isAutoRotating;
};

export const shouldSetFocused = (hasFocus: boolean, isAutoRotating: boolean): boolean => {
  return hasFocus && isAutoRotating;
};

export const shouldClearFocused = (
  hasFocus: boolean,
  isAutoRotating: boolean,
  isHovered: boolean
): boolean => {
  return !hasFocus && isAutoRotating && !isHovered;
};

export const shouldSetHovered = (isAutoRotating: boolean): boolean => {
  return isAutoRotating;
};

export const shouldClearHovered = (isAutoRotating: boolean, isFocused: boolean): boolean => {
  return isAutoRotating && !isFocused;
};

export const getShouldRespectReducedMotion = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};
