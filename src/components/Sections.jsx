import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { preloadGifs } from "../assets/gifs.js";
import PhotoAlbum from "./PhotoAlbum.jsx";
import TriviaGame from "./TriviaGame.jsx";
import SectionGif from "./SectionGif.jsx";

const sections = [
  {
    id: "trivia",
    type: "trivia",
    eyebrow: "Part One",
    title: "Trivia",
    body: "How well do you know us? Tap start and find out.",
    gif: {
      position: "bottom",
      src: "/assets/CatEyes.gif",
      alt: "Cat eyes animation",
      placeholderLabel: "Trivia GIF",
      fileHint: "CatEyes.gif",
    },
  },
  {
    id: "album",
    type: "scrapbook",
    eyebrow: "Part Two",
    title: "Photo Album",
    body: "Snapshots tucked into our little scrapbook.",
    gif: {
      position: "bottom",
      src: "/assets/CatTails.gif",
      alt: "Cat tails animation",
      placeholderLabel: "Photo album GIF",
      fileHint: "CatTails.gif",
    },
  },
  {
    id: "letter",
    eyebrow: "Part Three",
    title: "Love Letter",
    titleScript: true,
    body: "Words from the heart — read them when you're ready.",
    gif: {
      position: "bottom",
      src: "/assets/CatKiss.gif",
      alt: "Cat kiss animation",
      placeholderLabel: "Love letter GIF",
      fileHint: "CatKiss.gif",
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
  const [triviaPhase, setTriviaPhase] = useState("start");
  const isScrapbook = section.type === "scrapbook";
  const isTrivia = section.type === "trivia";
  const showGif = section.gif && (!isTrivia || triviaPhase === "start");
  const triviaIdle = isTrivia && (triviaPhase === "start" || triviaPhase === "finished");

  return (
    <div
      className={`section-slide${isScrapbook ? " section-slide--scrapbook" : ""}${isTrivia ? " section-slide--trivia" : ""}${triviaIdle ? " section-slide--trivia-idle" : ""}`}
    >
      <div className="section-eyebrow">{section.eyebrow}</div>
      <h1 className={`section-title${section.titleScript ? " script" : ""}`}>
        {section.title}
      </h1>
      {!isTrivia && <p className="section-body">{section.body}</p>}
      {isTrivia ? (
        <TriviaGame onPhaseChange={setTriviaPhase} />
      ) : isScrapbook ? (
        <PhotoAlbum />
      ) : (
        section.placeholder && (
          <div className="section-placeholder">{section.placeholder}</div>
        )
      )}
      {section.gif && (
        <div
          className={`section-gif-motion${showGif ? "" : " section-gif-motion--hidden"}`}
          aria-hidden={!showGif}
        >
          <SectionGif
            src={section.gif.src ?? null}
            position="bottom"
            alt={section.gif.alt}
            placeholderLabel={section.gif.placeholderLabel}
            fileHint={section.gif.fileHint}
          />
        </div>
      )}
    </div>
  );
}
export default function Sections() {
  const [[index, dir], setState] = useState([0, 0]);
  const total = sections.length;

  useEffect(() => {
    preloadGifs(
      sections.map((section) => section.gif?.src).filter(Boolean),
    );
  }, []);

  const go = (next) => {
    const target = Math.min(total - 1, Math.max(0, next));
    if (target === index) return;
    setState([target, target > index ? 1 : -1]);
  };

  const s = sections[index];

  return (
    <>
      <div
        className={`section-area${s.type === "scrapbook" ? " section-area--scrapbook" : ""}${s.type === "trivia" ? " section-area--trivia" : ""}`}
      >
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
