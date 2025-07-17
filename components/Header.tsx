import React, { useState, useMemo, useRef } from 'react';

interface HeaderProps {
  scrollPosition: number;
}

const Particle: React.FC = () => {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `scale(${Math.random() * 0.5 + 0.2})`,
    }), []);

    return (
        <div 
            className="absolute rounded-full bg-amber-300/50 animate-pulse"
            style={style}
        ></div>
    );
};

const Header: React.FC<HeaderProps> = ({ scrollPosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasRoared, setHasRoared] = useState(false);
  const isScrolled = scrollPosition > 100;
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasRoared && audioRef.current) {
      audioRef.current.volume = 0.1; // Subtle volume
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setHasRoared(true);
    }
  };
  
  const handleMouseLeave = () => setIsHovered(false);

  const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => <Particle key={i} />), []);

  return (
    <header id="home" className="h-screen w-full relative flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-[#0a0a2a] z-0"></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop')"}}></div>
      <div className="absolute inset-0 z-1">{particles}</div>
      <div className="absolute inset-0 bg-black/30 z-2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 text-white">

        {/* Left Side Quote */}
        <div className={`w-full md:w-1/2 flex justify-center md:justify-start transition-all duration-1000 ${isScrolled ? 'opacity-0 -translate-x-full' : 'opacity-100'}`}>
          <div className="text-center md:text-left p-4">
            <h1 className="font-devanagari text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ textShadow: '0 0 5px #d4af37, 0 0 10px #d4af37, 0 0 15px #d4af37, 1px 1px 2px black' }}>
              शिक्षा शेरनी का दूध है,
            </h1>
            <h2 className="font-devanagari text-3xl md:text-4xl lg:text-5xl font-bold mt-4"
                style={{ textShadow: '0 0 5px #d4af37, 0 0 10px #d4af37, 1px 1px 2px black' }}>
              जो पिएगा वो दहाड़ेगा।
            </h2>
          </div>
        </div>

        {/* Right Side Image/Statue */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 transform-style-3d">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                className="relative transition-transform duration-500 ease-out cursor-pointer"
                style={{ transform: `rotateY(${isHovered ? 15 : 0}deg) rotateX(${isHovered ? -5 : 0}deg) scale(${isHovered ? 1.05 : 1})` }}
                role="button"
                aria-label="Dr. Ambedkar's Portrait, hover or focus to interact"
                tabIndex={0}
            >
                <div className={`transition-opacity duration-1000 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <img 
                      src="/person.png"
                      alt="Dr. B.R. Ambedkar Portrait"
                      className="w-64 md:w-80 lg:w-96 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                    />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="animate-spin" style={{animationDuration: '30s', animationTimingFunction: 'linear', animationIterationCount: 'infinite'}}>
                       <img 
                         src="https://i.imgur.com/wP0M5Jg.png"
                         alt="Ashoka Chakra, a symbol from India's national flag"
                         className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                       />
                    </div>
                </div>
            </div>
        </div>
      </div>
      
       <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_5834b64f93.mp3" preload="auto"></audio>
    </header>
  );
};

export default Header;