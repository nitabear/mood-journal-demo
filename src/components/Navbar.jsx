import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMood } from '../context/MoodContext';

export const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme, currentMood } = useMood();
  const path = location.pathname;

  // Editor (Screen 2) Navbar
  if (path === '/editor') {
    const isLightBg = currentMood && (currentMood.sentiment === 'positive' || currentMood.sentiment === 'negative');
    const subTextColor = isLightBg ? "text-journal-text/90" : "text-off-white/90";
    const mutedTextColor = isLightBg ? "text-journal-text/70 hover:text-journal-text" : "text-off-white/70 hover:text-off-white";
    const borderColor = isLightBg ? "border-journal-text/10" : "border-off-white/10";

    return (
      <header className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-between items-center z-10 relative transition-colors duration-1500">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-editor-purple/20 rounded-lg flex items-center justify-center text-editor-purple">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <h2 className={`${subTextColor} text-sm font-semibold tracking-widest uppercase transition-colors duration-1500`}>Mood Journal</h2>
        </div>
         <div className="flex gap-4">
            <button onClick={toggleTheme} className={`${mutedTextColor} transition-colors duration-1500`}>
                <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <Link to="/" className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${borderColor} hover:border-editor-purple/50 hover:bg-editor-purple/10 transition-all duration-300 ${mutedTextColor} text-sm font-medium`}>
            <span className="material-symbols-outlined text-lg">history</span>
            <span>History</span>
            </Link>
         </div>
      </header>
    );
  }

  // Default / History (Screen 1 & 3) Navbar
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 w-full px-6 md:px-20 py-4 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
        isDark
        ? "bg-black/20 border-white/10"
        : "bg-background-light/80 border-journal-accent/30"
    }`}>
      <div className="flex items-center gap-4">
        {path !== '/' && path !== '/analytics' && path !== '/settings' ? (
            <Link to="/" className={`group flex items-center gap-2 font-semibold text-sm transition-all hover:opacity-70 ${isDark ? "text-white" : "text-journal-text"}`}>
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                <span>Back to Journal</span>
            </Link>
        ) : (
             <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className={`size-6 ${isDark ? "text-history-purple" : "text-journal-purple"}`}>
                        <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                    </div>
                    <h2 className={`text-lg font-bold leading-tight ${isDark ? "text-soft-text" : "text-journal-text"}`}>Mood Journal</h2>
                </Link>
             </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Journal</Link>
            <Link to="/editor" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/editor' ? "text-primary" : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Write</Link>
            <Link to="/analytics" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/analytics' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Stats</Link>
             <Link to="/settings" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/settings' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Settings</Link>
        </nav>

        <div className="flex items-center gap-4">
             <button onClick={toggleTheme} className={`${isDark ? "text-soft-text" : "text-journal-text"} hover:opacity-70 transition-opacity`}>
                <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className={`size-10 rounded-full border-2 bg-cover bg-center ${isDark ? "border-history-purple/20" : "border-journal-purple"}`} style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB11PswFRDTqzlQNHemW1Ly_hnaYA0hyrFbbf-SD3u3nzE7hmfAO_cYYfl_o8_Ibd7jQEhlGA1w7EJUwi4PUZjba7dD611uIiijZfNMoQVCY5JQIoM5f0K3QHkn9JOVrkbGJGO0Eg0fWtNhI8GYCDRP3ZC6YqSx831wmV7Vl7i27skZ5hAEjQLTDnzPSgFq7LOU6nfRvxKw8Texyt3TXdulTueqWc_63AMUXVzF7sDYl3CwuZf528xQjOkKzuSelOVO3jGSAEoCtkzJ')"}}></div>
        </div>
      </div>
    </header>
  );
};
