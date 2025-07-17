
import React from 'react';
import { Quote, TimelineEvent } from './types.ts';

// Icons for the timeline
const PenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.25 1A2.25 2.25 0 001 3.25v13.5A2.25 2.25 0 003.25 19h13.5A2.25 2.25 0 0019 16.75V3.25A2.25 2.25 0 0016.75 1H3.25zM2.5 3.25a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H3.25a.75.75 0 01-.75-.75V3.25zM6 14a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0zm4 6a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0zm4 6a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
  </svg>
);
const CourtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.732 4.056A9 9 0 1016.268 4.056m-2.288 15.032A9 9 0 018.02 19.088" />
  </svg>
);
const PeopleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
);


// Static Quotes Data
export const QUOTES: Quote[] = [
  {
    id: 1,
    hindi: "जीवन लम्बा होने की बजाय महान होना चाहिए।",
    english: "Life should be great rather than long."
  },
  {
    id: 2,
    hindi: "मनुष्य नश्वर है। उसी तरह विचार भी नश्वर हैं। एक विचार को प्रचार-प्रसार की जरूरत होती है, जैसे कि एक पौधे को पानी की, नहीं तो दोनों मुरझाकर मर जाते हैं।",
    english: "Man is mortal. So are ideas. An idea needs propagation as much as a plant needs watering. Otherwise, both will wither and die."
  },
  {
    id: 3,
    hindi: "मैं ऐसे धर्म को मानता हूँ जो स्वतंत्रता, समानता और भाईचारा सिखाता है।",
    english: "I like the religion that teaches liberty, equality, and fraternity."
  },
  {
    id: 4,
    hindi: "बुद्धि का विकास मानव के अस्तित्व का अंतिम लक्ष्य होना चाहिए।",
    english: "The development of the mind should be the ultimate goal of human existence."
  }
];

// Static Timeline Data
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1891',
    title: 'Birth and Early Life',
    description: 'Born in Mhow, Central Provinces, British India. Faced social discrimination from a young age, which shaped his future endeavors.',
    icon: <PeopleIcon />,
  },
  {
    year: '1913',
    title: 'Education Abroad',
    description: 'Enrolled at Columbia University in New York City, becoming the first Indian to pursue a doctorate in economics abroad.',
    icon: <PenIcon />,
  },
  {
    year: '1947',
    title: 'Architect of the Constitution',
    description: 'Appointed as the chairman of the Constitution Drafting Committee, he became the principal architect of the Constitution of India.',
    icon: <BookIcon />,
  },
  {
    year: '1956',
    title: 'Conversion to Buddhism',
    description: 'Converted to Buddhism along with hundreds of thousands of his supporters, rejecting the caste system and inspiring the Dalit Buddhist movement.',
    icon: <CourtIcon />,
  },
];