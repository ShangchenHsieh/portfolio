import { Reveal } from "../motion/variants";
import { useDecodeText } from "../hooks/useDecodeText";
import "../App.css";

export default function SectionHeader({ index, eyebrow, title, lede }) {
  const { ref, display } = useDecodeText(title);

  return (
    <header className="mb-12 max-w-2xl">
      <Reveal as="p" className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {eyebrow}
        <span className="cursor-blink" aria-hidden="true" />
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        aria-label={title}
        className="mt-4 font-semibold tracking-[-0.02em] text-[clamp(1.9rem,4vw,2.75rem)]"
      >
        <span ref={ref} aria-hidden="true">
          {display}
        </span>
      </Reveal>
      {lede && (
        <Reveal as="p" delay={0.1} className="mt-4 text-muted leading-relaxed">
          {lede}
        </Reveal>
      )}
    </header>
  );
}
