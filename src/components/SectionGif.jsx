import { useState } from "react";

function GifFrame({ children, placeholder, label }) {
  return (
    <div className="section-gif-scallop">
      <div
        className={`section-gif-frame${placeholder ? " section-gif-frame--placeholder" : ""}`}
        role={label ? "img" : undefined}
        aria-label={label}
      >
        <div className="section-gif-inner">{children}</div>
      </div>
    </div>
  );
}

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
      <div className={`section-gif section-gif--${position}`}>
        <GifFrame
          placeholder
          label={alt || placeholderLabel || "GIF placeholder"}
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
        </GifFrame>
      </div>
    );
  }

  return (
    <div className={`section-gif section-gif--${position}`}>
      <GifFrame>
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={() => setFailed(true)}
        />
      </GifFrame>
    </div>
  );
}
