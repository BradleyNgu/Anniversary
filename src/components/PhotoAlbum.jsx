import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHOTOS_PER_PAGE = 4;

/** Add photos here — pages are created automatically (4 per spread). */
const photos = [
  { id: 1, src: null, caption: "our beginning", rotate: -4, tape: "rose" },
  { id: 2, src: null, caption: "a favorite day", rotate: 3, tape: "gold" },
  { id: 3, src: null, caption: "little moments", rotate: -2, tape: "gold" },
  { id: 4, src: null, caption: "always us", rotate: 5, tape: "rose" },
  { id: 5, src: null, caption: "date night", rotate: -3, tape: "gold" },
  { id: 6, src: null, caption: "silly faces", rotate: 4, tape: "rose" },
  { id: 7, src: null, caption: "somewhere new", rotate: -5, tape: "gold" },
  { id: 8, src: null, caption: "home together", rotate: 2, tape: "rose" },
];

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

function Polaroid({ photo }) {
  return (
    <figure
      className="polaroid"
      style={{ "--rotate": `${photo.rotate}deg` }}
    >
      {photo.tape && (
        <span className={`polaroid-tape polaroid-tape--${photo.tape}`} />
      )}
      <div className="polaroid-inner">
        {photo.src ? (
          <img src={photo.src} alt={photo.caption} className="polaroid-img" />
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
