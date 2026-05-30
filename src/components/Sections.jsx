import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  {
    eyebrow: "Open me first",
    title: "Happy Anniversary",
    titleScript: true,
    body: "Here begins our little keepsake. Tap through each page — there's something waiting on every one of them.",
    placeholder: null,
  },
  {
    eyebrow: "Chapter One",
    title: "How It All Started",
    body: "A space saved for the story of our beginning.",
    placeholder: "Section coming soon — photos, words, and the day it all began.",
  },
  {
    eyebrow: "Chapter Two",
    title: "Our Favorite Moments",
    body: "A space saved for the memories we keep coming back to.",
    placeholder: "Section coming soon — a gallery of moments will live here.",
  },
  {
    eyebrow: "Chapter Three",
    title: "Here's To Us",
    body: "A space saved for everything still ahead of us.",
    placeholder: "Section coming soon — a note about the years to come.",
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Sections() {
  const [[index, dir], setState] = useState([0, 0]);
  const total = sections.length;

  const go = (next) => {
    const target = Math.min(total - 1, Math.max(0, next));
    if (target === index) return;
    setState([target, target > index ? 1 : -1]);
  };

  const s = sections[index];

  return (
    <>
      <div className="section-area">
        <div className="section-viewport">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ width: "100%" }}
            >
              <div className="section-eyebrow">{s.eyebrow}</div>
              <h1 className={`section-title${s.titleScript ? " script" : ""}`}>
                {s.title}
              </h1>
              <p className="section-body">{s.body}</p>
              {s.placeholder && (
                <div className="section-placeholder">{s.placeholder}</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="nav-bar">
        <button
          className="nav-btn"
          onClick={() => go(index - 1)}
          disabled={index === 0}
        >
          ‹ Back
        </button>

        <div className="nav-dots">
          {sections.map((_, i) => (
            <span key={i} className={`dot${i === index ? " active" : ""}`} />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
        >
          Next ›
        </button>
      </div>
    </>
  );
}
