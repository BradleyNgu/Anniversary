import { useState } from "react";
import { motion } from "framer-motion";

// Timing constants (seconds)
const T_STEM        = 0;
const T_LEAF_L      = 0.9;
const T_LEAF_R      = 1.1;
const T_PETALS      = 1.5;
const T_PETAL_GAP   = 0.07;
const T_CENTRE      = T_PETALS + 8 * T_PETAL_GAP + 0.05;
const T_HEART       = T_CENTRE + 0.5;
const T_HEART_FILL  = T_HEART + 1.1;
const T_HEART_TEXT  = T_HEART_FILL + 0.35;

const HEART_PATH =
  "M0,-110 C0,-110 -6,-122 -16,-122 C-28,-122 -36,-110 -36,-100 C-36,-80 0,-62 0,-62 C0,-62 36,-80 36,-100 C36,-110 28,-122 16,-122 C6,-122 0,-110 0,-110 Z";

const SPRING = { type: "spring", stiffness: 300, damping: 18 };

// Petal positions: angle in degrees around the centre
const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
// Petal colours alternating
const PETAL_COLORS = ["#e07898", "#d05878", "#e896a8", "#c04870",
                       "#e07898", "#d05878", "#e896a8", "#c04870"];

function Petal({ angle, color, delay }) {
  return (
    <motion.ellipse
      cx={0} cy={-22} rx={9} ry={16}
      fill={color}
      opacity={0.9}
      style={{ rotate: angle, originX: "0px", originY: "0px" }}
      initial={{ scaleY: 0, scaleX: 0, opacity: 0 }}
      animate={{ scaleY: 1, scaleX: 1, opacity: 0.9 }}
      transition={{ ...SPRING, delay }}
    />
  );
}

export default function FlowerHeart({ autoPlay = false }) {
  const [key, setKey] = useState(0);
  const [started, setStarted] = useState(autoPlay);

  const replay = () => {
    setKey(k => k + 1);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="flower-stage">
        <button className="flower-play-btn" onClick={replay} type="button">
          Watch it bloom ♥
        </button>
      </div>
    );
  }

  return (
    <div className="flower-stage" onClick={replay} title="Tap to replay">
      <motion.svg
        key={key}
        viewBox="-55 -132 110 215"
        className="flower-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`heart-clip-${key}`}>
            <path d={HEART_PATH} />
          </clipPath>
        </defs>

        {/* ── Stem ── */}
        <motion.line
          x1={0} y1={70} x2={0} y2={-20}
          stroke="#5a9c30" strokeWidth={6} strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: T_STEM, duration: 1.0, ease: "easeOut" }}
        />

        {/* ── Left leaf ── */}
        <motion.path
          d="M0,10 Q-38,0 -30,-18 Q-10,-8 0,10Z"
          fill="#5aaa28"
          initial={{ scale: 0, originX: "0px", originY: "10px", opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: T_LEAF_L }}
          style={{ originX: "0px", originY: "10px" }}
        />

        {/* ── Right leaf ── */}
        <motion.path
          d="M0,10 Q38,0 30,-18 Q10,-8 0,10Z"
          fill="#6ab830"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: T_LEAF_R }}
          style={{ originX: "0px", originY: "10px" }}
        />

        {/* ── Petals group centred at flower head (0,-20) ── */}
        <g transform="translate(0,-20)">
          {PETAL_ANGLES.map((angle, i) => (
            <Petal
              key={i}
              angle={angle}
              color={PETAL_COLORS[i]}
              delay={T_PETALS + i * T_PETAL_GAP}
            />
          ))}

          {/* ── Centre disc ── */}
          <motion.circle
            cx={0} cy={0} r={11}
            fill="#f5c842"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...SPRING, delay: T_CENTRE }}
            style={{ originX: "0px", originY: "0px" }}
          />
          <motion.circle
            cx={0} cy={0} r={6}
            fill="#f0a820"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...SPRING, delay: T_CENTRE + 0.1 }}
            style={{ originX: "0px", originY: "0px" }}
          />
        </g>

        {/* ── Heart outline above flower ── */}
        <motion.path
          d={HEART_PATH}
          fill="transparent"
          stroke="#c0445e"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: T_HEART, duration: 1.0, ease: "easeInOut" }}
        />

        {/* ── Heart fill ── */}
        <motion.path
          d={HEART_PATH}
          fill="#e06080"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.32 }}
          transition={{ delay: T_HEART_FILL, duration: 0.7, ease: "easeInOut" }}
        />

        {/* ── Text inside heart ── */}
        <motion.g
          clipPath={`url(#heart-clip-${key})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T_HEART_TEXT, duration: 0.55, ease: "easeOut" }}
        >
          <text x={0} y={-98} textAnchor="middle" className="flower-heart-text flower-heart-text--line1">
            Happy 1 Year
          </text>
          <text x={0} y={-84} textAnchor="middle" className="flower-heart-text flower-heart-text--line2">
            Anniversary
          </text>
        </motion.g>
      </motion.svg>

      <div className="flower-replay-hint">tap to replay</div>
    </div>
  );
}
