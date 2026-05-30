import { useState } from "react";

/**
 * Drop GIFs into public/assets/gifs/ and set `src` on each section.
 * Example: src: "/assets/gifs/trivia.gif"
 */
export default function SectionGif({
  src,
  position = "bottom",
  alt,
  placeholderLabel,
  fileHint,
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={`section-gif section-gif--${position} section-gif--placeholder`}
        role="img"
        aria-label={alt || placeholderLabel || "GIF placeholder"}
      >
        <span className="section-gif-icon" aria-hidden="true">
          ♥
        </span>
        <span className="section-gif-label">
          {placeholderLabel || "GIF coming soon"}
        </span>
        {fileHint && (
          <span className="section-gif-path">
            public/assets/gifs/{fileHint}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`section-gif section-gif--${position}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
}
