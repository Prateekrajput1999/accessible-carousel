"use client";

import AccessibleCarousel from "./components/AccessibleCarousel";

const slides = [
  {
    id: "slide-1",
    image:
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&h=600&fit=crop",
    alt: "Walking Tour in Amsterdam",
    title: "Dynamic Europe: Amsterdam, Prague, Berlin",
    description: "7 pm Tuesday, March 3, on TV",
  },
  {
    id: "slide-2",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    alt: "Land's End in Cornwall",
    title: "Travel to Southwest England and Paris",
    description: "Sept. 14 to Sept. 24 or 27",
  },
  {
    id: "slide-3",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    alt: "Mom and daughter play Daniel Tiger game on notebook computer.",
    title: "Great Children's Programming on Public TV",
    description: "",
  },
  {
    id: "slide-4",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    alt: "A man in a suit and fedora and a woman with coiffed hair look sternly into the camera.",
    title: "Foyle's War Revisited",
    description: "8 pm Sunday, March 8, on TV: Sneak peek at the final season.",
  },
  {
    id: "slide-5",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop",
    alt: "British flag with WILL-TV host David Thiel.",
    title: "Great Britain Vote: 7 pm Sat.",
    description: "",
  },
  {
    id: "slide-6",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
    alt: "Mid-American Gardener panelists on the set",
    title: "Mid-American Gardener: Thursdays at 7 pm",
    description: "Watch the latest episodes.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-16 px-4 bg-white dark:bg-black">
        <div className="w-full max-w-7xl">
          <AccessibleCarousel
            slides={slides}
            autoRotate={true}
            autoRotateInterval={3000}
          />
        </div>
      </main>
    </div>
  );
}
