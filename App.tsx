
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.tsx';
import QuoteWall from './components/QuoteWall.tsx';
import Timeline from './components/Timeline.tsx';
import FooterCTA from './components/FooterCTA.tsx';
import SidebarNav from './components/SidebarNav.tsx';
import PosterModal from './components/PosterModal.tsx';

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const openPosterModal = () => setIsPosterModalOpen(true);
  const closePosterModal = () => setIsPosterModalOpen(false);

  return (
    <div className="bg-[#0a0a2a] relative overflow-x-hidden">
      <SidebarNav />
      <Header scrollPosition={scrollPosition} />
      <main className="relative z-10">
        <QuoteWall />
        <Timeline />
        <FooterCTA onGenerateClick={openPosterModal} />
      </main>
      <PosterModal isOpen={isPosterModalOpen} onClose={closePosterModal} />
    </div>
  );
};

export default App;