import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { preloadGifs } from "../assets/gifs.js";
import PhotoAlbum from "./PhotoAlbum.jsx";
import TriviaGame from "./TriviaGame.jsx";
import LoveLetter from "./LoveLetter.jsx";
import SectionGif from "./SectionGif.jsx";
import FlowerHeart from "./FlowerHeart.jsx";

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
    type: "letter",
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
  },
  {
    id: "flower",
    type: "flower",
    eyebrow: "Part Four",
    title: "For You",
    titleScript: true,
    body: "A little something that blooms, just like us.",
  },
];
const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function SectionContent({ section }) {
  const [triviaPhase, setTriviaPhase] = useState("start");
  const isScrapbook = section.type === "scrapbook";
  const isTrivia = section.type === "trivia";
  const isLetter = section.type === "letter";
  const isFlower = section.type === "flower";
  const showGif = section.gif && (!isTrivia || triviaPhase === "start");
  const triviaIdle = isTrivia && (triviaPhase === "start" || triviaPhase === "finished");

  return (
    <div
      className={`section-slide${isScrapbook ? " section-slide--scrapbook" : ""}${isTrivia ? " section-slide--trivia" : ""}${triviaIdle ? " section-slide--trivia-idle" : ""}${isLetter ? " section-slide--letter" : ""}${isFlower ? " section-slide--flower" : ""}`}
    >
      <div className="section-eyebrow">{section.eyebrow}</div>
      <h1 className={`section-title${section.titleScript ? " script" : ""}`}>
        {section.title}
      </h1>
      {!isTrivia && !isFlower && !isLetter && <p className="section-body">{section.body}</p>}
      {isTrivia ? (
        <TriviaGame onPhaseChange={setTriviaPhase} />
      ) : isScrapbook ? (
        <PhotoAlbum />
      ) : isLetter ? (
        <LoveLetter />
      ) : isFlower ? (
        <FlowerHeart />
      ) : null}
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
  const [index, setIndex] = useState(0);
  const [areaType, setAreaType] = useState(sections[0].type);
  const total = sections.length;

  useEffect(() => {
    preloadGifs(
      sections.map((section) => section.gif?.src).filter(Boolean),
    );
  }, []);

  const go = (next) => {
    const target = Math.min(total - 1, Math.max(0, next));
    if (target === index) return;
    setIndex(target);
  };

  const s = sections[index];

  return (
    <>
      <div
        className={`section-area${areaType === "scrapbook" ? " section-area--scrapbook" : ""}${areaType === "trivia" ? " section-area--trivia" : ""}${areaType === "letter" ? " section-area--letter" : ""}`}
      >
        <div className="section-viewport">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => setAreaType(sections[index].type)}
          >
            <motion.div
              key={index}
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
