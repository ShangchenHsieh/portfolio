import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./lightbox.css";

/**
 * A small row of photo thumbnails that open a full-screen lightbox.
 * `photos` = [{ src, caption }]. Renders nothing when empty.
 */
export default function PhotoThumbs({ photos = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!photos.length) return null;

  return (
    <>
      <div className="photo-thumbs">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={photo.src}
            className="photo-thumb"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${photo.caption || "image"}`}
          >
            <img src={photo.src} alt={photo.caption || ""} loading="lazy" decoding="async" />
            <span className="photo-thumb__hint" aria-hidden="true">
              <ExpandIcon />
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

function Lightbox({ photos, index, onIndex, onClose }) {
  const closeRef = useRef(null);
  const multiple = photos.length > 1;

  const prev = useCallback(
    () => onIndex((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndex]
  );
  const next = useCallback(
    () => onIndex((index + 1) % photos.length),
    [index, photos.length, onIndex]
  );

  // Keyboard control + body scroll lock while open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && multiple) prev();
      else if (e.key === "ArrowRight" && multiple) next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next, multiple]);

  const photo = photos[index];

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || "Photo viewer"}
      onClick={onClose}
    >
      <button
        type="button"
        ref={closeRef}
        className="lightbox__btn lightbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      {multiple && (
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
        >
          <ArrowIcon dir="left" />
        </button>
      )}

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox__img" src={photo.src} alt={photo.caption || ""} />
        {photo.caption && <figcaption className="lightbox__cap">{photo.caption}</figcaption>}
      </figure>

      {multiple && (
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
        >
          <ArrowIcon dir="right" />
        </button>
      )}
    </div>,
    document.body
  );
}

function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ArrowIcon({ dir }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: dir === "right" ? "rotate(180deg)" : "none" }}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
