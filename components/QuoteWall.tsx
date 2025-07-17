
import React from 'react';
import { QUOTES } from '../constants';
import { Quote } from '../types';

const Sparkle: React.FC = () => (
    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute w-2 h-2 bg-amber-200 rounded-full animate-ping" style={{top: '10%', left: '20%', animationDelay: '0.1s'}}></div>
        <div className="absolute w-1 h-1 bg-amber-100 rounded-full animate-ping" style={{top: '80%', left: '90%', animationDelay: '0.3s'}}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full animate-ping" style={{top: '50%', left: '50%', animationDelay: '0.5s'}}></div>
        <div className="absolute w-2 h-2 bg-amber-200 rounded-full animate-ping" style={{top: '30%', left: '85%', animationDelay: '0.7s'}}></div>
    </div>
);

const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => (
  <div className="group relative bg-[#fff8e1] rounded-lg shadow-lg p-6 m-4 transform-style-3d transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30"
       style={{ transform: 'rotateY(-5deg) rotateX(3deg)' }}>
    <div className="absolute inset-0 bg-black/5 rounded-lg"></div>
    <Sparkle />
    <div className="relative z-10">
      <p className="font-devanagari text-xl text-stone-800 mb-4 leading-relaxed">
        "{quote.hindi}"
      </p>
      <hr className="border-t-2 border-amber-600/30 my-4" />
      <p className="text-md text-stone-600 italic">
        "{quote.english}"
      </p>
    </div>
  </div>
);

const QuoteWall: React.FC = () => {
  return (
    <section id="quotes" className="py-20 bg-gradient-to-b from-[#0a0a2a] to-[#1a1a3a] px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-400" style={{textShadow: '0 0 10px rgba(251, 191, 36, 0.5)'}}>Words of Wisdom</h2>
        <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">Inspiring quotes that encapsulate his vision for a just and equal society.</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1200">
        {QUOTES.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </section>
  );
};

export default QuoteWall;
