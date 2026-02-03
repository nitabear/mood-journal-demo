import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-journal-purple text-white hover:bg-journal-purple/90 shadow-lg shadow-journal-purple/30",
    outline: "bg-white dark:bg-white/5 text-journal-text dark:text-history-purple border border-journal-accent dark:border-history-purple/30 hover:bg-journal-accent dark:hover:bg-history-purple/10",
    ghost: "text-journal-text dark:text-white hover:bg-black/5 dark:hover:bg-white/10",
    editor: "border border-off-white/10 bg-off-white/5 hover:bg-editor-purple/20 hover:border-editor-purple/30 text-off-white/60 hover:text-off-white",
    editorActive: "border border-editor-purple/40 bg-editor-purple/20 text-white",
    editorLight: "border border-journal-text/20 bg-journal-text/5 hover:bg-journal-text/10 hover:border-journal-text/30 text-journal-text/60 hover:text-journal-text",
    editorActiveLight: "border border-journal-text/50 bg-journal-text/10 text-journal-text",
    icon: "p-2 rounded-lg hover:bg-white/10 text-current"
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], variant !== 'icon' && "px-8 py-3", className)}
      {...props}
    >
      {children}
    </button>
  );
};
