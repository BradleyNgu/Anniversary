/** All GIF paths used in the app — keep in sync with sections and triviaData. */
export const APP_GIFS = [
  "/assets/CatEyes.gif",
  "/assets/CatTails.gif",
  "/assets/CatKiss.gif",
  "/assets/cat-cute.gif",
  "/assets/consumed-by-hatred-kitten.gif",
];

export function isGifCached(src) {
  if (!src) return false;
  const img = new Image();
  img.src = src;
  return img.complete && img.naturalWidth > 0;
}

export function preloadGifs(sources = APP_GIFS) {
  const list = sources.filter(Boolean);
  list.forEach((src) => {
    const img = new Image();
    img.decoding = "sync";
    img.src = src;
  });
  list.forEach((src) => {
    fetch(src).catch(() => {});
  });
}
