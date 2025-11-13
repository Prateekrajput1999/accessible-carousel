import React from 'react';
import { CAROUSEL_CLASSES, CAROUSEL_ICONS, ARIA_LABELS } from '../constants/carousel.constants';

interface CarouselControlsProps {
  isAutoRotating: boolean;
  onToggleRotation: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  isAutoRotating,
  onToggleRotation,
  onPrevious,
  onNext,
}) => {
  const rotationControlLabel = isAutoRotating
    ? ARIA_LABELS.ROTATION_CONTROL.PLAYING
    : ARIA_LABELS.ROTATION_CONTROL.PAUSED;

  return (
    <div className={CAROUSEL_CLASSES.CONTROLS}>
      <button
        type="button"
        onClick={onToggleRotation}
        aria-label={rotationControlLabel}
        className={CAROUSEL_CLASSES.ROTATION_CONTROL}
        aria-controls="carousel-items"
      >
        {isAutoRotating ? (
          <span aria-hidden="true">{CAROUSEL_ICONS.PAUSE}</span>
        ) : (
          <span aria-hidden="true">{CAROUSEL_ICONS.PLAY}</span>
        )}
      </button>

      <button
        type="button"
        onClick={onPrevious}
        aria-label={ARIA_LABELS.PREVIOUS_SLIDE}
        className={CAROUSEL_CLASSES.PREV_BUTTON}
        aria-controls="carousel-items"
      >
        <span aria-hidden="true">{CAROUSEL_ICONS.PREVIOUS}</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label={ARIA_LABELS.NEXT_SLIDE}
        className={CAROUSEL_CLASSES.NEXT_BUTTON}
        aria-controls="carousel-items"
      >
        <span aria-hidden="true">{CAROUSEL_ICONS.NEXT}</span>
      </button>
    </div>
  );
};

