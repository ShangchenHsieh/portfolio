export default function BarGraph({ name, percent, delay = 0 }) {
  return (
    <div 
      className="space-y-3"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className="text-sm font-medium text-zinc-400">{percent}%</span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${percent}%`,
            animationDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}