
import React from 'react';

const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a href={href} className="group relative flex items-center justify-center h-12 w-12 my-2 rounded-full bg-blue-900/50 hover:bg-amber-500 transition-colors duration-300 shadow-lg">
        {icon}
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {label}
        </span>
    </a>
);

const SidebarNav: React.FC = () => {
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 left-0 ml-2 md:ml-4 z-50">
        <div className="flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm p-2 rounded-full border border-white/10">
            <NavLink href="#home" label="Home" icon={<HomeIcon />} />
            <NavLink href="#quotes" label="Quotes" icon={<QuoteIcon />} />
            <NavLink href="#timeline" label="Timeline" icon={<TimelineIcon />} />
            <NavLink href="#cta" label="Share" icon={<ShareIcon />} />
        </div>
    </nav>
  );
};

// SVG Icons
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const TimelineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.846 13.654 9 14.004 9 14.373c0 .692-.32 1.32-.832 1.732C7.65 16.563 7 17.22 7 18c0 .779.622 1.408 1.386 1.831a2.002 2.002 0 002.168 0C11.378 19.408 12 18.779 12 18c0-.78-.65-1.437-1.168-1.895-.512-.412-.832-1.04-.832-1.732 0-.369.154-.72.316-1.031l4.156-4.156a2.473 2.473 0 013.393 0 2.473 2.473 0 010 3.393L13.342 15.32c-.312.312-.662.468-1.031.468-.369 0-.72-.156-1.031-.468a2.473 2.473 0 010-3.393L15.435 7.77a.625.625 0 10-.884-.884L10.4 11.043a2.473 2.473 0 01-3.393 0 2.473 2.473 0 010-3.393L11.16 3.5a.625.625 0 00.884.884l-4.157 4.157z" />
    </svg>
);

export default SidebarNav;
