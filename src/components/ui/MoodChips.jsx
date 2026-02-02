import React from 'react';
import { Button } from './Button';
import { MOODS } from '../../lib/constants';

export const MoodChips = ({ selectedMood, onSelect, isLightBg }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h4 className={`${isLightBg ? "text-journal-text/40" : "text-off-white/40"} text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-1500`}>Current Mood</h4>
      <div className="flex gap-2 p-2 flex-wrap justify-center max-w-xl">
        {MOODS.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMood === mood.value ? 'editorActive' : 'editor'}
            onClick={() => onSelect(mood)}
            className="h-10 px-6 text-sm font-medium transition-all duration-300"
          >
            {mood.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
