import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionGif from "./SectionGif.jsx";

const sections = [
  {
    eyebrow: "Part One",
    title: "Trivia",
    body: "Little questions about us — answers and surprises will live here.",
    gif: {
      position: "bottom",
      src: "/assets/CatEyes.gif",
      alt: "Cat eyes animation",
      placeholderLabel: "Trivia GIF",
      fileHint: "CatEyes.gif",
    },
    placeholder: "Your trivia game or quiz content goes here.",
  },
  {
    eyebrow: "Part Two",
    title: "Photo Album",
    body: "Our favorite snapshots, one scroll at a time.",
    gif: {
      position: "bottom",
      src: "/assets/CatTails.gif",
      alt: "Cat tails animation",
      placeholderLabel: "Photo album GIF",
      fileHint: "CatTails.gif",
    },
    placeholder: "Your photo gallery will go here.",
  },
  {
    eyebrow: "Part Three",
    title: "Love Letter",
    titleScript: true,
    body: "Words from the heart — read them when you're ready.",
    gif: {
      position: "bottom",
      src: null,
      alt: "Love letter animation",
      placeholderLabel: "Love letter GIF",
      fileHint: "love-letter.gif",
    },
    placeholder: "Your love letter text will go here.",
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

function SectionContent({ section }) {
  return (
    <div className="section-slide">
      <div className="section-eyebrow">{section.eyebrow}</div>
      <h1 className={`section-title${section.titleScript ? " script" : ""}`}>
        {section.title}
      </h1>
      <p className="section-body">{section.body}</p>
      {section.placeholder && (
        <div className="section-placeholder">{section.placeholder}</div>
      )}
      {section.gif && (
        <SectionGif
          src={section.gif.src ?? null}
          position="bottom"
          alt={section.gif.alt}
          placeholderLabel={section.gif.placeholderLabel}
          fileHint={section.gif.fileHint}
        />
      )}
    </div>
  );
}

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
              className="section-motion"
            >
              <SectionContent section={s} />
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
