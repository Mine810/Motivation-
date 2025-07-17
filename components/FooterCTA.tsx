
import React from 'react';

interface FooterCTAProps {
  onGenerateClick: () => void;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ onGenerateClick }) => {
  return (
    <section id="cta" className="py-24 bg-gradient-to-t from-[#0a0a2a] to-[#1a1a3a] text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Become a Torchbearer of Knowledge
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          His message is timeless. Share his wisdom and inspire others. Generate a beautiful poster with his words and spread the light of education.
        </p>
        <button
          onClick={onGenerateClick}
          className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 border-2 border-amber-400 rounded-full overflow-hidden group transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-2xl hover:shadow-amber-500/50"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative">Spread Knowledge</span>
        </button>
      </div>
    </section>
  );
};

export default FooterCTA;
