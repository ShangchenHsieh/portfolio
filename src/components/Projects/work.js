export default function Work({ title, desc, tags, link, code, img }) {
  const hasLive = link && link.startsWith("http");
  const hasCode = code && code.startsWith("http") && code !== link;

  return (
    <article className="card card-hover h-full flex flex-col overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-elevated">
        <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-fg">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted flex-1">{desc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag.name}</span>
          ))}
        </div>

        {(hasLive || hasCode) && (
          <div className="mt-5 pt-4 border-t border-line flex items-center gap-5">
            {hasLive && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="link-accent inline-flex items-center gap-1.5 text-sm"
              >
                <ExternalIcon />
                Live
              </a>
            )}
            {hasCode && (
              <a
                href={code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
              >
                <CodeIcon />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
    </svg>
  );
}
