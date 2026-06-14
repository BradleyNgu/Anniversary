import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { preloadGifs } from "../assets/gifs.js";
import {
  EnvelopeBack,
  EnvelopePocket,
  EnvelopeTopFlap,
  WaxSeal,
} from "./EnvelopeArt.jsx";
import Sections from "./Sections.jsx";
import "./scene.css";

function FaceContent() {
  return (
    <>
      <div className="face-monogram">Nicole &amp; Bradley</div>
      <div className="face-title">Happy Anniversary</div>
      <div className="face-sub">our story, unfolded</div>
      <div className="face-heart">&#9829;</div>
    </>
  );
}

function PaperFace() {
  return (
    <div className="paper-face">
      <div className="face-inner">
        <FaceContent />
      </div>
    </div>
  );
}

function LetterCover() {
  return (
    <div className="letter-cover">
      <div className="face-inner">
        <FaceContent />
      </div>
    </div>
  );
}

function envelopeOffset(el) {
  if (!el) return { x: 0, y: 120 };
  const r = el.getBoundingClientRect();
  const vw = window.visualViewport?.width ?? window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;
  const vleft = window.visualViewport?.offsetLeft ?? 0;
  const vtop = window.visualViewport?.offsetTop ?? 0;
  const cx = vleft + vw / 2;
  const cy = vtop + vh / 2;
  return {
    x: r.left + r.width / 2 - cx,
    y: r.top + r.height / 2 - cy,
  };
}

export default function EnvelopeScene() {
  const [step, setStep] = useState("idle"); // idle -> opening -> flipping -> open
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterUp, setLetterUp] = useState(false);
  const [scale, setScale] = useState(1);

  const envelopeRef = useRef(null);
  const flap = useAnimationControls();
  const letter = useAnimationControls();
  const envelope = useAnimationControls();
  const foldTop = useAnimationControls();
  const foldBot = useAnimationControls();
  const flip = useAnimationControls();

  useEffect(() => {
    preloadGifs();
  }, []);

  useEffect(() => {
    const fit = () => {
      const vw = window.visualViewport?.width ?? window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const pad = 32;
      const s = Math.min(1, (vw - pad) / 460, (vh - pad) / 560);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
    };
  }, []);

  const open = async () => {
    if (step !== "idle") return;
    setStep("opening");

    const origin = envelopeOffset(envelopeRef.current);
    letter.set({
      x: origin.x,
      y: origin.y + 90,
      opacity: 0,
      scale: 0.42,
    });

    // 1. flap swings open and tucks behind
    setFlapOpen(true);
    await flap.start({
      rotateX: 178,
      transition: { duration: 0.75, ease: "easeInOut" },
    });

    // 2. folded letter peeks out of the envelope (still compact)
    setLetterUp(true);
    await letter.start({
      x: origin.x,
      y: origin.y - 70,
      opacity: 1,
      scale: 0.52,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    });

    // 3. envelope sinks away while the letter glides to centre and grows
    envelope.start({
      y: 380,
      opacity: 0,
      transition: { duration: 0.95, ease: "easeIn" },
    });
    await letter.start({
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    });

    // 4. the letter unfolds at centre
    await Promise.all([
      foldTop.start({
        rotateX: 0,
        transition: { duration: 0.85, ease: "easeInOut" },
      }),
      foldBot.start({
        rotateX: 0,
        transition: { duration: 0.85, ease: "easeInOut" },
      }),
    ]);

    // Hold the unfolded letter, then flip horizontally to the first section
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStep("flipping");
  };

  useEffect(() => {
    if (step !== "flipping") return;

    let active = true;

    const runFlip = async () => {
      // Wait for the flip card to mount before driving animation controls
      await new Promise((resolve) => requestAnimationFrame(resolve));

      if (!active) return;

      flip.set({ rotateY: 0 });
      await flip.start({
        rotateY: -180,
        transition: { duration: 0.9, ease: [0.42, 0, 0.2, 1] },
      });

      if (active) setStep("open");
    };

    runFlip();

    return () => {
      active = false;
    };
  }, [step, flip]);

  const folding = step === "opening";
  const showFlipLetter = step === "flipping" || step === "open";
  const letterFlat = step === "open";

  return (
    <div className="stage-wrap">
      <div className="stage" style={{ "--stage-scale": scale }}>
        {step === "idle" && (
          <div className="env-hint-wrap">
            <motion.div
              className="env-hint script"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              click to open &#9825;
            </motion.div>
          </div>
        )}

        {/* ----- Envelope back (behind the letter) ----- */}
        <motion.div
          ref={envelopeRef}
          className="env-layer"
          animate={envelope}
          initial={{ y: 0, opacity: 1 }}
          style={{ zIndex: 1 }}
        >
          <div className="env-shadow" />
          <EnvelopeBack />
        </motion.div>

        {/* ----- Envelope front (pocket + closing flap) ----- */}
        <motion.div
          className="env-layer env-front"
          animate={envelope}
          initial={{ y: 0, opacity: 1 }}
          onClick={open}
          style={{
            zIndex: 5,
            cursor: step === "idle" ? "pointer" : "default",
          }}
          role="button"
          aria-label="Open the envelope"
        >
          <EnvelopePocket />
          <motion.div
            className="env-top-flap"
            animate={flap}
            initial={{ rotateX: 0 }}
            style={{ zIndex: flapOpen ? -1 : 4 }}
          >
            <EnvelopeTopFlap />
          </motion.div>
          {!flapOpen && <WaxSeal />}
        </motion.div>
      </div>

      {/* ----- Folding letter — viewport-centred, animates from envelope to middle ----- */}
      {folding && (
        <div
          className="letter-stage"
          style={{ zIndex: letterUp ? 30 : 1 }}
        >
          <motion.div
            className="letter-group"
            animate={letter}
            initial={{ opacity: 0 }}
          >
            <div className="fold-letter">
              <motion.div
                className="panel panel-top"
                animate={foldTop}
                initial={{ rotateX: -180 }}
              >
                <PaperFace />
              </motion.div>

              <div className="panel panel-mid">
                <PaperFace />
              </div>

              <motion.div
                className="panel panel-bot"
                animate={foldBot}
                initial={{ rotateX: 180 }}
              >
                <PaperFace />
              </motion.div>

              <motion.div
                className="crease crease-a"
                animate={{ opacity: step === "opening" ? 0 : 1 }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="crease crease-b"
                animate={{ opacity: step === "opening" ? 0 : 1 }}
                initial={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* ----- Cover flips over horizontally to reveal sections ----- */}
      {showFlipLetter && (
        <div
          className={`letter-flip-scene${letterFlat ? " letter-flip-scene--open letter-flip-scene--flat" : ""}`}
        >
          <motion.div
            className={`letter-flip${letterFlat ? " letter-flip--flat" : ""}`}
            animate={letterFlat ? false : flip}
            initial={false}
            style={letterFlat ? undefined : { transformPerspective: 1600 }}
          >
            {!letterFlat && (
              <div className="letter-flip-face letter-flip-face--front">
                <LetterCover />
              </div>
            )}
            <div className="letter-flip-face letter-flip-face--back">
              <div className="open-letter">
                <Sections />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
