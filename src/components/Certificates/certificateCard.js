export default function CertificateCard({ title, issuer, date, tags, img, downloadLink, viewLink }) {
  return (
    <article className="card card-hover card-corners h-full flex flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <img src={img} alt={issuer} loading="lazy" className="h-7 w-auto object-contain" />
        <span className="mono text-xs text-muted">{date}</span>
      </div>

      <h3 className="mt-5 text-base font-semibold text-fg">{title}</h3>
      <p className="mt-1 text-sm text-accent">{issuer}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag.name}</span>
        ))}
      </div>

      {(viewLink || downloadLink) && (
        <div className="mt-auto pt-5 flex items-center gap-5">
          {viewLink && (
            <a
              href={viewLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
            >
              <EyeIcon />
              View
            </a>
          )}
          {downloadLink && (
            <a
              href={downloadLink}
              target="_blank"
              rel="noreferrer"
              className="link-accent inline-flex items-center gap-1.5 text-sm"
            >
              <DownloadIcon />
              Certificate
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}
