import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  EnvelopeBack,
  EnvelopePocket,
  EnvelopeTopFlap,
  WaxSeal,
} from "./EnvelopeArt.jsx";
import Sections from "./Sections.jsx";
import "./scene.css";

function PaperFace({ offset }) {
  return (
    <div className="paper-face" style={{ top: offset }}>
      <div className="face-inner">
        <div className="face-monogram">A &amp; B</div>
        <div className="face-title">Happy Anniversary</div>
        <div className="face-sub">our story, unfolded</div>
        <div className="face-heart">&#9829;</div>
      </div>
    </div>
  );
}

function envelopeOffset(el) {
  if (!el) return { x: 0, y: 120 };
  const r = el.getBoundingClientRect();
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  return {
    x: r.left + r.width / 2 - cx,
    y: r.top + r.height / 2 - cy,
  };
}

export default function EnvelopeScene() {
  const [step, setStep] = useState("idle"); // idle -> opening -> open
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterUp, setLetterUp] = useState(false);
  const [scale, setScale] = useState(1);

  const envelopeRef = useRef(null);
  const flap = useAnimationControls();
  const letter = useAnimationControls();
  const envelope = useAnimationControls();
  const foldTop = useAnimationControls();
  const foldBot = useAnimationControls();

  useEffect(() => {
    const fit = () => {
      const s = Math.min(
        1,
        (window.innerWidth - 32) / 460,
        (window.innerHeight - 32) / 560
      );
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const open = async () => {
    if (step !== "idle") return;
    setStep("opening");

    const origin = envelopeOffset(envelopeRef.current);
    letter.set({
      x: origin.x,
      y: origin.y + 90,
      opacity: 0,
      scale: 0.88,
    });

    // 1. flap swings open and tucks behind
    setFlapOpen(true);
    await flap.start({
      rotateX: 178,
      transition: { duration: 0.75, ease: "easeInOut" },
    });

    // 2. folded letter peeks out of the envelope
    setLetterUp(true);
    await letter.start({
      x: origin.x,
      y: origin.y - 70,
      opacity: 1,
      scale: 0.92,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    });

    // 3. envelope sinks away while the letter glides to screen centre
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

    setStep("open");
  };

  const folding = step !== "open";

  return (
    <div className="stage-wrap">
      <div className="stage" style={{ "--stage-scale": scale }}>
        {step === "idle" && (
          <motion.div
            className="env-hint script"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            click to open &#9825;
          </motion.div>
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
                <PaperFace offset={0} />
              </motion.div>

              <div className="panel panel-mid">
                <PaperFace offset={-154} />
              </div>

              <motion.div
                className="panel panel-bot"
                animate={foldBot}
                initial={{ rotateX: 180 }}
              >
                <PaperFace offset={-308} />
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

      {/* ----- Opened, interactive letter (full size, outside scaled stage) ----- */}
      <AnimatePresence>
        {step === "open" && (
          <div className="open-letter-wrap">
            <motion.div
              className="open-letter"
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Sections />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
