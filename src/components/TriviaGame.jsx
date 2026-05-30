import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { preloadGifs } from "../assets/gifs.js";
import { correctAnswerGif, triviaIntro, triviaQuestions, wrongAnswerGif } from "./triviaData.js";

const FEEDBACK_MIN_MS = 700;
const GIF_DURATION_MS = 2000;
const GIF_LOAD_TIMEOUT_MS = 5000;

const fadeTransition = { duration: 0.32, ease: [0.4, 0, 0.2, 1] };

function findCorrectIndex(answers) {
  return answers.findIndex((a) => a.correct);
}

function getReactionGifSrc(question, gifType) {
  if (!question || !gifType) return null;
  return gifType === "correct"
    ? (question.correctReactionGif ?? correctAnswerGif)
    : (question.reactionGif ?? wrongAnswerGif);
}

function preloadImages(sources) {
  preloadGifs(sources);
}

function isImageCached(src) {
  if (!src) return false;
  const img = new Image();
  img.src = src;
  return img.complete && img.naturalWidth > 0;
}

export default function TriviaGame({ onPhaseChange }) {
  const [phase, setPhase] = useState("start");
  const [showStart, setShowStart] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [gifType, setGifType] = useState(null);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [feedbackMinDone, setFeedbackMinDone] = useState(false);
  const gifTimer = useRef(null);
  const feedbackTimer = useRef(null);
  const loadTimeout = useRef(null);
  const leavingStartRef = useRef(false);

  const total = triviaQuestions.length;
  const current = triviaQuestions[qIndex];
  const correctIndex = findCorrectIndex(current?.answers ?? []);
  const inRound = phase === "question" || phase === "feedback" || phase === "gif";
  const reactionGifSrc = getReactionGifSrc(current, gifType);

  const reset = () => {
    clearTimeout(gifTimer.current);
    clearTimeout(feedbackTimer.current);
    clearTimeout(loadTimeout.current);
    leavingStartRef.current = false;
    setPhase("start");
    setShowStart(true);
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setGifType(null);
    setGifLoaded(false);
    setFeedbackMinDone(false);
  };

  const beginRound = () => {
    preloadImages([correctAnswerGif, wrongAnswerGif]);
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setGifType(null);
    setGifLoaded(false);
    setFeedbackMinDone(false);
    setPhase("question");
  };

  const handlePanelExit = () => {
    if (!leavingStartRef.current) return;
    leavingStartRef.current = false;
    beginRound();
  };

  const advance = useCallback(() => {
    clearTimeout(gifTimer.current);
    clearTimeout(feedbackTimer.current);
    clearTimeout(loadTimeout.current);
    setSelected(null);
    setLocked(false);
    setGifType(null);
    setGifLoaded(false);
    setFeedbackMinDone(false);

    if (qIndex >= total - 1) {
      setPhase("finished");
      return;
    }

    setQIndex((i) => i + 1);
    setPhase("question");
  }, [qIndex, total]);

  useEffect(() => {
    preloadGifs();
  }, []);

  useEffect(() => {
    if (phase !== "question" || !current) return;
    preloadImages([
      getReactionGifSrc(current, "correct"),
      getReactionGifSrc(current, "wrong"),
    ]);
  }, [phase, qIndex, current]);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase !== "gif") return;
    gifTimer.current = setTimeout(advance, GIF_DURATION_MS);
    return () => clearTimeout(gifTimer.current);
  }, [phase, qIndex, advance]);

  useEffect(() => {
    if (phase !== "feedback" || !feedbackMinDone || !gifLoaded) return;
    setPhase("gif");
  }, [phase, feedbackMinDone, gifLoaded]);

  useEffect(() => {
    if (phase !== "feedback") return;

    loadTimeout.current = setTimeout(() => {
      setGifLoaded(true);
      setFeedbackMinDone(true);
    }, GIF_LOAD_TIMEOUT_MS);

    return () => clearTimeout(loadTimeout.current);
  }, [phase, qIndex]);

  const startGame = () => {
    if (!showStart) return;
    leavingStartRef.current = true;
    setShowStart(false);
  };

  const pickAnswer = (index) => {
    if (locked || phase !== "question" || !current) return;

    const isCorrect = current.answers[index].correct;
    const nextGifType = isCorrect ? "correct" : "wrong";
    const nextGifSrc = getReactionGifSrc(current, nextGifType);

    preloadImages([nextGifSrc]);
    setSelected(index);
    setLocked(true);
    setGifType(nextGifType);
    setGifLoaded(isImageCached(nextGifSrc));
    setFeedbackMinDone(false);
    setPhase("feedback");

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedbackMinDone(true), FEEDBACK_MIN_MS);
  };

  const answerClass = (index) => {
    if (!locked) return "";
    if (index === selected && current.answers[index].correct) return "trivia-answer--correct";
    if (index === selected && !current.answers[index].correct) return "trivia-answer--wrong";
    if (index === correctIndex && selected !== correctIndex) {
      return "trivia-answer--reveal";
    }
    return "trivia-answer--muted";
  };

  return (
    <div className={`trivia${phase === "gif" ? " trivia--gif-active" : ""}`}>
      <AnimatePresence mode="wait" onExitComplete={handlePanelExit}>
        {showStart && (
          <motion.div
            key="start"
            className="trivia-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={fadeTransition}
          >
            <h2 className="trivia-intro-title script">{triviaIntro.title}</h2>
            <p className="trivia-intro-body">{triviaIntro.body}</p>
            <button type="button" className="trivia-btn trivia-btn--primary" onClick={startGame}>
              Start game
            </button>
          </motion.div>
        )}

        {inRound && current && (
          <motion.div
            key={`q-${current.id}`}
            className="trivia-panel trivia-panel--round"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={fadeTransition}
          >
            <div className="trivia-progress">
              Question {qIndex + 1} of {total}
            </div>
            <p className="trivia-question">{current.question}</p>
            <div className="trivia-answers">
              {current.answers.map((answer, index) => (
                <button
                  key={index}
                  type="button"
                  className={`trivia-answer ${answerClass(index)}`}
                  onClick={() => pickAnswer(index)}
                  disabled={locked}
                >
                  {answer.text}
                </button>
              ))}
            </div>

            {phase === "feedback" && reactionGifSrc && (
              <img
                src={reactionGifSrc}
                alt=""
                className="trivia-gif-preload"
                aria-hidden="true"
                decoding="async"
                onLoad={() => setGifLoaded(true)}
                onError={() => setGifLoaded(true)}
              />
            )}

            <AnimatePresence>
              {phase === "gif" && reactionGifSrc && (
                <motion.div
                  className="trivia-gif-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="trivia-gif-popup">
                    <img
                      src={reactionGifSrc}
                      alt=""
                      className="trivia-gif-img"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "finished" && (
          <motion.div
            key="finished"
            className="trivia-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={fadeTransition}
          >
            <h2 className="trivia-score-title script">All done!</h2>
            <p className="trivia-score">
              You scored{" "}
              <strong>
                {score} / {total}
              </strong>
            </p>
            <p className="trivia-score-note">
              {score === total
                ? "Perfect — you know us by heart."
                : "Every answer is a little piece of our story."}
            </p>
            <button type="button" className="trivia-btn trivia-btn--primary" onClick={reset}>
              Play again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
