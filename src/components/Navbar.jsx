import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMood } from '../context/MoodContext';

export const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useMood();
  const path = location.pathname;

  // Default / History (Screen 1 & 3) Navbar
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 w-full px-6 md:px-20 py-4 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
        isDark
        ? "bg-app-bg-dark/80 border-white/10"
        : "bg-app-bg-light/80 border-journal-accent/30"
    }`}>
      <div className="flex items-center gap-4">
        {path !== '/' && path !== '/analytics' && path !== '/settings' && path !== '/editor' ? (
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
            <Link to="/editor" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/editor' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Write</Link>
            <Link to="/analytics" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/analytics' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Stats</Link>
             <Link to="/settings" className={`text-sm font-medium hover:text-journal-purple dark:hover:text-history-purple transition-colors ${path === '/settings' ? (isDark ? "text-white border-b-2 border-history-purple pb-1" : "text-journal-text font-bold") : (isDark ? "text-soft-text/60" : "text-journal-text")}`}>Settings</Link>
        </nav>

        <div className="flex items-center gap-4">
             <button
               onClick={toggleTheme}
               className={`${isDark ? "text-soft-text" : "text-journal-text"} hover:opacity-70 transition-opacity`}
               aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
             >
                <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className={`size-10 rounded-full border-2 bg-cover bg-center ${isDark ? "border-history-purple/20" : "border-journal-purple"}`} style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB11PswFRDTqzlQNHemW1Ly_hnaYA0hyrFbbf-SD3u3nzE7hmfAO_cYYfl_o8_Ibd7jQEhlGA1w7EJUwi4PUZjba7dD611uIiijZfNMoQVCY5JQIoM5f0K3QHkn9JOVrkbGJGO0Eg0fWtNhI8GYCDRP3ZC6YqSx831wmV7Vl7i27skZ5hAEjQLTDnzPSgFq7LOU6nfRvxKw8Texyt3TXdulTueqWc_63AMUXVzF7sDYl3CwuZf528xQjOkKzuSelOVO3jGSAEoCtkzJ')"}}></div>
        </div>
      </div>
    </header>
  );
};
