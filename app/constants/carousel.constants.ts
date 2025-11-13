export const ARIA_LABELS = {
  CAROUSEL_REGION: "Highlighted Carousel shows",
  PREVIOUS_SLIDE: "Previous Slide",
  NEXT_SLIDE: "Next Slide",
  ROTATION_CONTROL: {
    PLAYING: "Stop Automatic Slide Show",
    PAUSED: "Start Automatic Slide Show",
  },
} as const;

export const DEFAULT_CAROUSEL_CONFIG = {
  AUTO_ROTATE: true,
  AUTO_ROTATE_INTERVAL: 5000,
} as const;

export const KEYBOARD_KEYS = {
  SPACE: " ",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
} as const;

export const CAROUSEL_ICONS = {
  PLAY: "▶",
  PAUSE: "⏸",
  PREVIOUS: "‹",
  NEXT: "›",
} as const;

export const CAROUSEL_CLASSES = {
  CONTAINER: "carousel-container",
  CONTROLS: "carousel-controls",
  ROTATION_CONTROL: "carousel-rotation-control",
  PREV_BUTTON: "carousel-prev-button",
  NEXT_BUTTON: "carousel-next-button",
  ITEMS: "carousel-items",
  SLIDE_WRAPPER: "carousel-slide-wrapper",
  ITEM: "carousel-item",
  IMAGE_CONTAINER: "carousel-image-container",
  IMAGE: "carousel-image",
  CAPTION: "carousel-caption",
  TITLE: "carousel-title",
  DESCRIPTION: "carousel-description",
} as const;

export const ARIA_ROLE_DESCRIPTIONS = {
  CAROUSEL: "carousel",
  SLIDE: "slide",
} as const;

export const ARIA_LIVE_VALUES = {
  OFF: "off",
  POLITE: "polite",
} as const;

export const DEFAULT_SLIDER_CONFIG = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  accessibility: true,
  arrows: false,
} as const;
