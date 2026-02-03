import React from 'react';
import { useMood } from '../context/MoodContext';
import { Layout } from '../components/Layout';
import { MoodCard } from '../components/ui/MoodCard';
import { Button } from '../components/ui/Button';

export const HistoryPage = () => {
  const { entries, theme } = useMood();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className={`flex-1 flex flex-col items-center px-4 py-8 md:py-16 transition-colors duration-300 ${isDark ? 'bg-app-bg-dark' : 'bg-app-bg-light'}`}>
        <div className="w-full max-w-[720px] space-y-8">

          {/* Headline Section */}
          <div className="text-center space-y-2">
            <h1 className="text-journal-text dark:text-white text-4xl md:text-5xl font-extrabold tracking-tight transition-colors">
              {isDark ? "Entry History" : "Your Journey"}
            </h1>
            <p className="text-journal-text/60 dark:text-white/40 text-lg transition-colors">
              {isDark ? "Your past reflections, kept in a safe space." : "Revisiting your path to clarity and peace."}
            </p>
          </div>

          {/* Search Bar */}
          <div className={`w-full pt-4 sticky top-20 z-40`}>
            <label className={`relative flex items-center w-full h-14 rounded-xl shadow-sm border transition-all group focus-within:ring-2 focus-within:ring-journal-purple/20 ${
                isDark
                ? "bg-white/5 border-white/10 hover:border-history-purple/50"
                : "bg-white border-journal-accent/50"
            }`}>
              <span className={`material-symbols-outlined absolute left-4 transition-colors ${
                  isDark ? "text-soft-text/40" : "text-journal-text/40 group-focus-within:text-journal-purple"
              }`}>search</span>
              <input
                className={`w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 text-base transition-colors placeholder:text-opacity-50 outline-none ${
                    isDark ? "text-white placeholder:text-soft-text/30" : "text-journal-text placeholder:text-journal-text/30"
                }`}
                placeholder={isDark ? "Search your thoughts, moods, or memories..." : "Search past reflections..."}
                type="text"
                aria-label="Search entries"
              />
              {isDark && (
                <div className="flex items-center px-4">
                    <span className="text-xs font-mono text-soft-text/20 bg-white/5 px-2 py-1 rounded">⌘K</span>
                </div>
              )}
            </label>
          </div>

          {/* Timeline Entries */}
          <div className="relative pt-6">
            {/* Vertical Timeline Line */}
            <div className={`absolute left-[20px] top-10 bottom-0 w-0.5 transition-colors ${isDark ? "bg-white/5" : "bg-journal-accent"}`}></div>

            <div className="space-y-12 relative">
                {isDark && (
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-history-purple font-bold text-sm uppercase tracking-widest">October 2023</h3>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                )}

                {entries.map(entry => (
                    <MoodCard key={entry.id} entry={entry} />
                ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-8 pb-16">
            <Button variant="outline">
                {isDark ? "Load older entries" : "Load Older Reflections"}
            </Button>
          </div>
        </div>
      </div>

       {/* Footer / Simple Branding (Screen 1) */}
       {!isDark && (
         <footer className="w-full py-8 text-center text-journal-text/40 text-xs uppercase tracking-[0.2em] bg-app-bg-light">
            © 2024 Mood Journal • Premium Minimalist Experience
         </footer>
       )}
       {isDark && (
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
       )}
    </Layout>
  );
};
