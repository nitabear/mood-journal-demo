/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Screen 1: History Light
        "journal-purple": "#59019d",
        "journal-bg": "#E1F5FE",
        "journal-accent": "#B3E5FC",
        "journal-text": "#01579B",

        // Screen 2: Editor Dark
        "editor-purple": "#810bda",
        "editor-bg-start": "#1A1A1A",
        "editor-bg-end": "#2D3436",
        "off-white": "#DFE6E9",

        // Screen 3: History Dark
        "history-purple": "#9001fe",
        "journal-dark": "#1A1A1A",
        "soft-text": "#DFE6E9",

        // Screen 4/5: Analytics & Settings
        "analytics-blue": "#0688f9",
        "app-bg-light": "#f5f7f8",
        "app-bg-dark": "#0f1a23",

        // Agents.md Logic
        "positive-bg": "#FFF9C4",
        "positive-accent": "#FFECB3",
        "negative-bg": "#E1F5FE",
        "negative-accent": "#B3E5FC",
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      transitionDuration: {
        '1500': '1500ms',
      }
    },
  },
  plugins: [],
}
