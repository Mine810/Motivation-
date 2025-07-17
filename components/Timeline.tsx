import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { TimelineEvent } from '../types';

interface TimelineCardProps {
  event: TimelineEvent;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, isLeft }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const alignmentClass = isLeft ? 'md:text-right md:pr-16' : 'md:pl-16';
  const transformClass = isLeft 
    ? (isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0')
    : (isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0');

  return (
    <div ref={cardRef} className={`mb-8 flex md:justify-between items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      <div className="hidden md:block w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-blue-900 shadow-xl w-14 h-14 rounded-full">
         <div className={`mx-auto transition-transform duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
            {event.icon}
         </div>
      </div>
      <div className={`order-1 bg-indigo-800 rounded-lg shadow-xl w-full md:w-5/12 p-6 transition-all duration-700 ease-out ${alignmentClass} ${transformClass}`}>
        <h3 className="mb-3 font-bold text-amber-400 text-2xl">{event.year}</h3>
        <h4 className="mb-2 font-semibold text-white text-xl">{event.title}</h4>
        <p className="text-md leading-snug tracking-wide text-white/80">
          {event.description}
        </p>
      </div>
    </div>
  );
};


const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 bg-[#1a1a3a] px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-400" style={{textShadow: '0 0 10px rgba(251, 191, 36, 0.5)'}}>A Revolutionary Journey</h2>
        <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">Key milestones in the life of a visionary leader.</p>
      </div>
      <div className="relative container mx-auto px-6 flex flex-col space-y-8">
        <div className="absolute z-0 w-1 h-full bg-amber-400/30 shadow-md left-1/2 -translate-x-1/2"></div>
        {TIMELINE_EVENTS.map((event, index) => (
          <TimelineCard key={event.year} event={event} isLeft={index % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;