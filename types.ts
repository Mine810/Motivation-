
import React from 'react';

export interface Quote {
  id: number;
  hindi: string;
  english: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
