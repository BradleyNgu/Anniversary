/** All GIF paths used in the app — keep in sync with sections and triviaData. */
export const APP_GIFS = [
  "/assets/CatEyes.gif",
  "/assets/CatTails.gif",
  "/assets/cat-cute.gif",
  "/assets/consumed-by-hatred-kitten.gif",
];

export function preloadGifs(sources = APP_GIFS) {
  sources.filter(Boolean).forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
}
