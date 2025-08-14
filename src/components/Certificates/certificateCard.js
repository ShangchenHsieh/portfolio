export default function CertificateCard({ title, issuer, date, tags, img, downloadLink, viewLink }) {
    return (
        <div className="group">
            <div className="modern-card h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 p-6">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        {viewLink && (
                            <button
                                onClick={() => window.open(viewLink, "_blank")}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 group/btn"
                                title="View Certificate"
                            >
                                <svg
                                    className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        )}

                        {downloadLink && (
                            <button
                                onClick={() => window.open(downloadLink, "_blank")}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 group/btn"
                                title="Download Certificate"
                            >
                                <svg
                                    className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {title}
                    </h3>

                    <div className="text-zinc-400 text-sm mb-3">
                        <p className="font-medium text-blue-400">{issuer}</p>
                        <p className="text-zinc-500">{date}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700 rounded-full text-zinc-300 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500 pointer-events-none"></div>
            </div>
        </div>
    );
}
