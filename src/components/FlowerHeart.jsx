import { useState } from "react";
import { motion } from "framer-motion";

const T_PETAL_GAP = 0.07;
const SPRING = { type: "spring", stiffness: 300, damping: 18 };

const HEART_PATH =
  "M0,-110 C0,-110 -6,-122 -16,-122 C-28,-122 -36,-110 -36,-100 C-36,-80 0,-62 0,-62 C0,-62 36,-80 36,-100 C36,-110 28,-122 16,-122 C6,-122 0,-110 0,-110 Z";

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const BOUQUET = [
  {
    id: "left",
    x: -46,
    y: 10,
    rotate: -10,
    scale: 0.76,
    delay: 0.45,
    stemWidth: 5,
    petalColors: [
      "#ffc8d8", "#f8a0b8", "#ffb8cc", "#f088a8",
      "#ffc8d8", "#f8a0b8", "#ffb8cc", "#f088a8",
    ],
    centerOuter: "#ffd8a8",
    centerInner: "#f0b060",
  },
  {
    id: "center",
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    delay: 0,
    stemWidth: 6,
    petalColors: [
      "#e07898", "#d05878", "#e896a8", "#c04870",
      "#e07898", "#d05878", "#e896a8", "#c04870",
    ],
    centerOuter: "#f5c842",
    centerInner: "#f0a820",
  },
  {
    id: "right",
    x: 46,
    y: 10,
    rotate: 10,
    scale: 0.76,
    delay: 0.6,
    stemWidth: 5,
    petalColors: [
      "#d8c0f0", "#b898e0", "#e8d8f8", "#a078c8",
      "#d8c0f0", "#b898e0", "#e8d8f8", "#a078c8",
    ],
    centerOuter: "#f0e8ff",
    centerInner: "#c8b0e8",
  },
];

function getFlowerTiming(delay) {
  const tStem = delay;
  const tLeafL = delay + 0.9;
  const tLeafR = delay + 1.1;
  const tPetals = delay + 1.5;
  const tCentre = tPetals + 8 * T_PETAL_GAP + 0.05;
  return { tStem, tLeafL, tLeafR, tPetals, tCentre };
}

const CENTER_TIMING = getFlowerTiming(0);
const T_HEART = CENTER_TIMING.tCentre + 0.5;
const T_HEART_FILL = T_HEART + 1.1;
const T_HEART_TEXT = T_HEART_FILL + 0.35;

function Petal({ angle, color, delay }) {
  return (
    <motion.ellipse
      cx={0}
      cy={-22}
      rx={9}
      ry={16}
      fill={color}
      initial={{ scaleY: 0, scaleX: 0, opacity: 0 }}
      animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
      transition={{ ...SPRING, delay }}
      style={{ rotate: angle, originX: "0px", originY: "0px" }}
    />
  );
}

function BloomFlower({ flower }) {
  const {
    x, y, rotate, scale, stemWidth, petalColors,
    centerOuter, centerInner, delay,
  } = flower;
  const { tStem, tLeafL, tLeafR, tPetals, tCentre } = getFlowerTiming(delay);

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
      <motion.line
        x1={0}
        y1={70}
        x2={0}
        y2={-20}
        stroke="#5a9c30"
        strokeWidth={stemWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: tStem, duration: 1.0, ease: "easeOut" }}
      />

      <motion.path
        d="M0,10 Q-38,0 -30,-18 Q-10,-8 0,10Z"
        fill="#5aaa28"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING, delay: tLeafL }}
        style={{ originX: "0px", originY: "10px" }}
      />

      <motion.path
        d="M0,10 Q38,0 30,-18 Q10,-8 0,10Z"
        fill="#6ab830"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING, delay: tLeafR }}
        style={{ originX: "0px", originY: "10px" }}
      />

      <g transform="translate(0,-20)">
        {PETAL_ANGLES.map((angle, i) => (
          <Petal
            key={i}
            angle={angle}
            color={petalColors[i]}
            delay={tPetals + i * T_PETAL_GAP}
          />
        ))}

        <motion.circle
          cx={0}
          cy={0}
          r={11}
          fill={centerOuter}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: tCentre }}
          style={{ originX: "0px", originY: "0px" }}
        />
        <motion.circle
          cx={0}
          cy={0}
          r={6}
          fill={centerInner}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: tCentre + 0.1 }}
          style={{ originX: "0px", originY: "0px" }}
        />
      </g>
    </g>
  );
}

export default function FlowerHeart({ autoPlay = false }) {
  const [key, setKey] = useState(0);
  const [started, setStarted] = useState(autoPlay);

  const replay = () => {
    setKey((k) => k + 1);
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
        viewBox="-100 -132 200 225"
        className="flower-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={`heart-clip-${key}`}>
            <path d={HEART_PATH} />
          </clipPath>
        </defs>

        {BOUQUET.map((flower) => (
          <BloomFlower key={flower.id} flower={flower} />
        ))}

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

        <motion.path
          d={HEART_PATH}
          fill="#e06080"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.32 }}
          transition={{ delay: T_HEART_FILL, duration: 0.7, ease: "easeInOut" }}
        />

        <motion.g
          clipPath={`url(#heart-clip-${key})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: T_HEART_TEXT, duration: 0.55, ease: "easeOut" }}
        >
          <text
            x={0}
            y={-98}
            textAnchor="middle"
            className="flower-heart-text flower-heart-text--line1"
          >
            Happy 1 Year
          </text>
          <text
            x={0}
            y={-84}
            textAnchor="middle"
            className="flower-heart-text flower-heart-text--line2"
          >
            Anniversary
          </text>
        </motion.g>
      </motion.svg>

      <div className="flower-replay-hint">tap to replay</div>
    </div>
  );
}
