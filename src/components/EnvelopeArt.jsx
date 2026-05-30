const W = 460;
const H = 300;
const CX = W / 2;
const CY = H / 2;

export const envelopeSize = { w: W, h: H };

/** Back of the envelope — flat body + subtle inner fold lines */
export function EnvelopeBack() {
  return (
    <svg
      className="env-svg"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="env-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d48494" />
          <stop offset="55%" stopColor="#c56b7e" />
          <stop offset="100%" stopColor="#b85f72" />
        </linearGradient>
        <filter id="env-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#7a3040" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx="14"
        fill="url(#env-body)"
        filter="url(#env-soft-shadow)"
      />
      {/* fold creases on the back */}
      <g stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none">
        <line x1="0" y1="0" x2={CX} y2={CY} />
        <line x1={W} y1="0" x2={CX} y2={CY} />
        <line x1="0" y1={H} x2={CX} y2={CY} />
        <line x1={W} y1={H} x2={CX} y2={CY} />
      </g>
    </svg>
  );
}

/** Side + bottom pocket flaps (in front of the letter) */
export function EnvelopePocket() {
  return (
    <svg
      className="env-svg"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flap-left" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#c96a7d" />
          <stop offset="100%" stopColor="#d07a8c" />
        </linearGradient>
        <linearGradient id="flap-right" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#c96a7d" />
          <stop offset="100%" stopColor="#d07a8c" />
        </linearGradient>
        <linearGradient id="flap-bottom" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#d88a9a" />
          <stop offset="100%" stopColor="#cf7588" />
        </linearGradient>
      </defs>
      <polygon points={`0,0 0,${H} ${CX},${CY}`} fill="url(#flap-left)" />
      <polygon points={`${W},0 ${W},${H} ${CX},${CY}`} fill="url(#flap-right)" />
      <polygon points={`0,${H} ${W},${H} ${CX},${CY}`} fill="url(#flap-bottom)" />
      {/* pocket lip highlight */}
      <polyline
        points={`0,${H} ${CX},${CY} ${W},${H}`}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Top closing flap — rendered separately so it can rotate in 3D */
export function EnvelopeTopFlap() {
  return (
    <svg
      className="env-svg env-svg-top"
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flap-top" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e094a4" />
          <stop offset="100%" stopColor="#d0788c" />
        </linearGradient>
      </defs>
      <polygon points={`0,0 ${W},0 ${CX},${CY}`} fill="url(#flap-top)" />
      <line
        x1="0"
        y1="0"
        x2={CX}
        y2={CY}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.2"
      />
      <line
        x1={W}
        y1="0"
        x2={CX}
        y2={CY}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Wax seal — sits at the envelope center */
export function WaxSeal() {
  return (
    <div className="wax-seal" aria-hidden="true">
      <span>N&amp;B</span>
    </div>
  );
}
