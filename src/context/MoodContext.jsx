import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ENTRIES } from '../lib/constants';

const MoodContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMood = () => useContext(MoodContext);

export const MoodProvider = ({ children }) => {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [currentMood, setCurrentMood] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addEntry = (entry) => {
    setEntries(prev => [entry, ...prev]);
  };

  return (
    <MoodContext.Provider value={{ entries, addEntry, theme, toggleTheme, currentMood, setCurrentMood }}>
      {children}
    </MoodContext.Provider>
  );
};
