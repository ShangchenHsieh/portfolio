import Typewriter from "typewriter-effect";
import GraphemeSplitter from "grapheme-splitter";
import "../../App.css";

export default function Home() {
  const stringSplitter = (string) => {
    const splitter = new GraphemeSplitter();
    return splitter.splitGraphemes(string);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pb-20">
        {/* Main heading */}
        <div className="mb-8">
          <h1
            className="head text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <span className="block text-white/90 mb-2">Crafting Digital</span>
            <span className="gradient-text">Experiences</span>
          </h1>

          <div className="h-20 flex items-center justify-center">
            <div
              className="text-2xl md:text-3xl text-zinc-300 font-medium"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <Typewriter
                options={{
                  strings: [
                    "👋 I'm Sean",
                    "Software Developer",
                    "Building the Future, One Line at a Time",
                    "Keep dreaming, keep building"
                  ],
                  delay: 50,
                  pauseFor: 2000,
                  autoStart: true,
                  loop: true,
                  stringSplitter: stringSplitter,
                }}
              />
            </div>
          </div>
        </div>



        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          data-aos="fade-up"
          data-aos-delay="1200"
          data-aos-duration="800"
        >
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            <span>Let's Connect</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#projects"
            className="btn-secondary inline-flex items-center gap-2 group"
          >
            <span>View My Work</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-[20%] transform -translate-x-1/2 flex flex-col items-left"
          data-aos="fade-up"
          data-aos-delay="1600"
          data-aos-duration="800"
        >

          <a
            href="#about"
            className="flex flex-col items-center text-zinc-500 hover:text-blue-400 transition-colors group"
          >
            <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}