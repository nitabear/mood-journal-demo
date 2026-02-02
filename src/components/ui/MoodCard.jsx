import React from 'react';

export const MoodCard = ({ entry }) => {
  const dateObj = new Date(entry.date);
  const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Mapping mood to icon background colors (Screen 1 style)
  const getIconBg = (mood) => {
      // Logic from Screen 1
      if (mood === 'happy') return 'bg-journal-purple text-white shadow-lg shadow-journal-purple/30';
      if (mood === 'neutral') return 'bg-journal-accent text-journal-text';
      if (mood === 'edit_note') return 'bg-journal-purple/20 text-journal-purple';
      if (mood === 'verified') return 'bg-journal-purple text-white shadow-lg shadow-journal-purple/30';
      return 'bg-journal-accent text-journal-text';
  };

  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-6 group">
      <div className="flex flex-col items-center">
        <div className={`z-10 size-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${getIconBg(entry.mood)} dark:bg-white/10 dark:text-history-purple dark:shadow-none`}>
          <span className="material-symbols-outlined text-xl">{entry.moodIcon}</span>
        </div>
      </div>
      <div className="space-y-3 pb-12 relative">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
          <h3 className="text-journal-text dark:text-white/90 text-lg font-bold transition-colors">{entry.title}</h3>
          <span className="text-journal-text/50 dark:text-white/30 text-xs font-semibold uppercase tracking-widest transition-colors">
            {dateStr} • {timeStr}
          </span>
        </div>
        <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-journal-accent/20 dark:border-white/5 shadow-sm group-hover:shadow-md transition-all">
          <p className="text-journal-text/80 dark:text-white/70 leading-relaxed italic transition-colors">
            "{entry.content}"
          </p>
        </div>
      </div>
    </div>
  );
};
