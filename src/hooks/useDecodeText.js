import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=<>/\\_";
const FRAME_MS = 24;
const CHARS_PER_FRAME = 0.45;

/**
 * Scramble-decode `text` once, the first time the ref'd element enters the
 * viewport. Renders plain text until then (and always, under reduced motion).
 */
export function useDecodeText(text) {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let timer = null;
    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        observer.disconnect();
        let revealed = 0;
        timer = setInterval(() => {
          revealed += CHARS_PER_FRAME;
          let out = "";
          for (let i = 0; i < text.length; i += 1) {
            if (i < revealed) out += text[i];
            else if (text[i] === " ") out += " ";
            else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          setDisplay(out);
          if (revealed >= text.length) {
            clearInterval(timer);
            timer = null;
            setDisplay(text);
          }
        }, FRAME_MS);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [text]);

  return { ref, display };
}
