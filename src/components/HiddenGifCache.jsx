import { APP_GIFS } from "../assets/gifs.js";

/** Keeps GIFs decoded in memory from first paint — avoids mobile reload delay. */
export default function HiddenGifCache() {
  return (
    <div className="gif-cache" aria-hidden="true">
      {APP_GIFS.map((src) => (
        <img key={src} src={src} alt="" width={340} height={168} decoding="sync" />
      ))}
    </div>
  );
}
