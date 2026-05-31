import { useEffect, useState } from "react";
import { isGifCached } from "../assets/gifs.js";

function GifFrame({ children, placeholder, label, loading }) {
  return (
    <div className="section-gif-scallop">
      <div
        className={`section-gif-frame${placeholder ? " section-gif-frame--placeholder" : ""}${loading ? " section-gif-frame--loading" : ""}`}
        role={label ? "img" : undefined}
        aria-label={label}
      >
        <div className="section-gif-inner">{children}</div>
      </div>
    </div>
  );
}

export default function SectionGif({
  src,
  position = "bottom",
  alt,
  placeholderLabel,
  fileHint,
}) {
  const [ready, setReady] = useState(() => isGifCached(src));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    setReady(isGifCached(src));
  }, [src]);

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
      <GifFrame loading={!ready} label={alt}>
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className={ready ? "section-gif-img--ready" : "section-gif-img--loading"}
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      </GifFrame>
    </div>
  );
}
