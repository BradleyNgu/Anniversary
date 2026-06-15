import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHOTOS_PER_PAGE = 4;
const PHOTO_BASE = "/assets/scrapbook/photoalbum";

const PHOTO_FILES = [
  "20250720_152643.jpg",
  "20250803_145931.jpg",
  "20251123_193524.jpg",
  "20251214_142501.jpg",
  "20260104_203913.jpg",
  "20260227_112439.jpg",
  "20260501_142942.jpg",
  "20260501_143720.jpg",
  "DSC00037.JPG",
  "DSC00054.JPG",
  "DSC00062.JPG",
  "DSC00110.JPG",
  "DSC09583.jpg",
  "IMG_20250926_110002_460.jpg",
  "IMG_4543.jpg",
  "IMG_5610.jpg",
];

const CAPTIONS = [
  "our beginning",
  "a favorite day",
  "little moments",
  "always us",
  "date night",
  "silly faces",
  "somewhere new",
  "home together",
];

const ROTATES = [-4, 3, -2, 5, -3, 4, -5, 2];
const TAPES = ["rose", "gold"];

/** Pages are created automatically (4 photos per spread). */
const photos = PHOTO_FILES.map((file, i) => ({
  id: i + 1,
  src: `${PHOTO_BASE}/${file}`,
  caption: CAPTIONS[i % CAPTIONS.length],
  rotate: ROTATES[i % ROTATES.length],
  tape: TAPES[i % TAPES.length],
}));

function chunkPhotos(list, size) {
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}

const pageVariants = {
  enter: (dir) => ({
    rotateY: dir > 0 ? 48 : -48,
    opacity: 0,
    x: dir > 0 ? 12 : -12,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    x: 0,
  },
  exit: (dir) => ({
    rotateY: dir > 0 ? -48 : 48,
    opacity: 0,
    x: dir > 0 ? -12 : 12,
  }),
};

function preloadPhotos(pagePhotos) {
  pagePhotos.forEach((photo) => {
    if (!photo.src) return;
    const img = new Image();
    img.src = photo.src;
  });
}

function Polaroid({ photo }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (!photo.src) return;

    const img = new Image();
    img.src = photo.src;
    if (img.complete) {
      setLoaded(true);
      return;
    }

    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, [photo.src]);

  return (
    <figure
      className="polaroid"
      style={{ "--rotate": `${photo.rotate}deg` }}
    >
      {photo.tape && (
        <span className={`polaroid-tape polaroid-tape--${photo.tape}`} />
      )}
      <div className={`polaroid-inner${loaded ? "" : " polaroid-inner--loading"}`}>
        {photo.src ? (
          <>
            {!loaded && <div className="polaroid-skeleton" aria-hidden="true" />}
            <img
              src={photo.src}
              alt={photo.caption}
              className={`polaroid-img${loaded ? " polaroid-img--ready" : " polaroid-img--loading"}`}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              decoding="async"
            />
          </>
        ) : (
          <div className="polaroid-empty">
            <span className="polaroid-empty-icon">♥</span>
            <span className="polaroid-empty-text">add photo</span>
          </div>
        )}
      </div>
      <figcaption className="polaroid-caption script">{photo.caption}</figcaption>
    </figure>
  );
}

function ScrapbookSpread({ pagePhotos, pageIndex }) {
  return (
    <div className="scrapbook-page">
      <div className="scrapbook-sticker scrapbook-sticker--a" aria-hidden="true">
        ♥
      </div>
      <div className="scrapbook-sticker scrapbook-sticker--b" aria-hidden="true">
        ✿
      </div>
      <div className="scrapbook-page-label script">page {pageIndex + 1}</div>
      <div className="scrapbook-grid">
        {pagePhotos.map((photo) => (
          <Polaroid key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}

export default function PhotoAlbum() {
  const pages = useMemo(() => chunkPhotos(photos, PHOTOS_PER_PAGE), []);
  const [[page, dir], setPage] = useState([0, 0]);
  const total = pages.length;

  useEffect(() => {
    pages.forEach(preloadPhotos);
  }, [pages]);

  useEffect(() => {
    [page - 1, page, page + 1]
      .filter((i) => i >= 0 && i < total)
      .forEach((i) => preloadPhotos(pages[i]));
  }, [page, pages, total]);

  const flip = (next) => {
    const target = Math.min(total - 1, Math.max(0, next));
    if (target === page) return;
    setPage([target, target > page ? 1 : -1]);
  };

  return (
    <div className="scrapbook" aria-label="Photo scrapbook">
      <div className="scrapbook-spread">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={page}
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="scrapbook-page-motion"
            style={{
              transformOrigin: dir > 0 ? "left center" : "right center",
            }}
          >
            <ScrapbookSpread pagePhotos={pages[page]} pageIndex={page} />
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <div className="scrapbook-nav">
          <button
            type="button"
            className="scrapbook-nav-btn"
            onClick={() => flip(page - 1)}
            disabled={page === 0}
            aria-label="Previous scrapbook page"
          >
            ‹ Prev
          </button>
          <span className="scrapbook-nav-count">
            Page {page + 1} of {total}
          </span>
          <button
            type="button"
            className="scrapbook-nav-btn"
            onClick={() => flip(page + 1)}
            disabled={page === total - 1}
            aria-label="Next scrapbook page"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
