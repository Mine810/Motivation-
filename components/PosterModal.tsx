
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateAmbedkarQuoteForPoster } from '../services/geminiService.ts';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icons for UI elements
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const RegenerateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm10 10a1 1 0 011-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101z" clipRule="evenodd" />
    </svg>
);
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWrappedText = (
    context: CanvasRenderingContext2D, text: string, x: number, y: number,
    maxWidth: number, lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const generatePoster = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setIsFallback(false);

    try {
      // Ensure custom fonts are ready to prevent rendering with default fonts
      await document.fonts.ready;

      // Use a more thematic background image
      const [quoteResult, bgImage] = await Promise.all([
          generateAmbedkarQuoteForPoster(),
          loadImage('https://images.unsplash.com/photo-1543285193-214a790514a2?q=80&w=1080&auto=format&fit=crop')
      ]);

      if (quoteResult.isFallback) {
        setIsFallback(true);
      }
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Draw background
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      // Add a dark overlay for text readability
      ctx.fillStyle = 'rgba(10, 10, 42, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Style and draw text
      ctx.textAlign = 'center';

      // Hindi Quote
      ctx.font = "bold 64px 'Tiro Devanagari Hindi', serif";
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.textBaseline = 'bottom';
      const hindiY = drawWrappedText(ctx, `"${quoteResult.hindi}"`, canvas.width / 2, canvas.height / 2 - 80, canvas.width - 120, 80);

      // English Quote
      ctx.font = "italic 34px 'Poppins', sans-serif";
      ctx.fillStyle = '#FFFFFF'; // White
      ctx.textBaseline = 'top';
      drawWrappedText(ctx, `"${quoteResult.english}"`, canvas.width / 2, hindiY - 20, canvas.width - 150, 45);

      // Author
      ctx.font = "bold 42px 'Poppins', sans-serif";
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'bottom';
      ctx.fillText('- Dr. B.R. Ambedkar', canvas.width / 2, canvas.height - 80);
      
      setGeneratedImage(canvas.toDataURL('image/png'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the poster.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      generatePoster();
    }
  }, [isOpen, generatePoster]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#1a1a3a] border border-amber-500/20 rounded-lg shadow-2xl p-4 sm:p-6 w-full max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-10">
            <CloseIcon />
        </button>
        <h3 className="text-2xl font-bold text-amber-400 text-center mb-4">Your Poster is Ready!</h3>

        {isFallback && !isLoading && (
          <div className="my-2 bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-3 rounded-md shadow-inner" role="alert">
              <p className="font-semibold text-sm">Couldn't generate a new quote.</p>
              <p className="text-xs">Displaying a timeless classic instead.</p>
          </div>
        )}

        <div className="aspect-square w-full bg-blue-900/50 rounded-md flex items-center justify-center overflow-hidden">
            {isLoading && (
                <div className="text-white text-center">
                    <p>Generating with AI...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto mt-4"></div>
                </div>
            )}
            {error && !isLoading && (
                <div className="text-red-400 text-center p-4 bg-red-900/20 rounded-md w-full h-full flex flex-col justify-center">
                    <h4 className="font-bold mb-2 text-red-300">Oops! Something went wrong.</h4>
                    <p className="text-sm text-red-400/80">{error}</p>
                </div>
            )}
            {generatedImage && !isLoading && <img src={generatedImage} alt="Generated Ambedkar Quote Poster" className="w-full h-full object-contain rounded-md" />}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
                onClick={generatePoster}
                disabled={isLoading}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-semibold"
            >
                <RegenerateIcon />
                {isLoading ? 'Regenerating...' : 'Regenerate'}
            </button>
            <a
                href={generatedImage || '#'}
                download="ambedkar_quote_poster.png"
                aria-disabled={!generatedImage || isLoading}
                onClick={(e) => (!generatedImage || isLoading) && e.preventDefault()}
                className={`flex-1 inline-flex items-center justify-center px-4 py-3 bg-amber-500 text-blue-900 font-bold rounded-md hover:bg-amber-400 transition-colors text-center ${!generatedImage || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <DownloadIcon />
                Download Poster
            </a>
        </div>
        
        <canvas ref={canvasRef} width="1080" height="1080" className="hidden"></canvas>
      </div>
    </div>
  );
};

export default PosterModal;