import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MoodChips } from '../components/ui/MoodChips';
import { useMood } from '../context/MoodContext';
import { analyzeSentiment } from '../lib/sentiment';

export const EditorPage = () => {
  const { setCurrentMood } = useMood();
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);

  // Sync with context for Navbar
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood, setCurrentMood]);

  // Handle Text Change & Sentiment Analysis
  const handleTextChange = (e) => {
      const newText = e.target.value;
      setText(newText);

      const sentiment = analyzeSentiment(newText);
      if (sentiment !== 'neutral') {
          // Find a mood object that matches the sentiment (just for background logic)
          // Or we can create a transient mood object.
          // For simplicity, we'll map 'positive' to 'joyful' logic and 'negative' to 'anxious' logic
          // UNLESS the user has explicitly selected a mood?
          // The prompt says "Automatically updates...".
          // So text overrides or sets the mood.

          if (sentiment === 'positive') {
              setMood({ value: 'text-positive', sentiment: 'positive' });
          } else if (sentiment === 'negative') {
              setMood({ value: 'text-negative', sentiment: 'negative' });
          }
      } else {
          // If neutral, do we reset? Maybe only if text is empty?
          if (newText.length === 0) setMood(null);
      }
  };

  // Determine colors based on mood (defaulting to dark gradient if null)
  let color1 = '#2D3436';
  let color2 = '#1A1A1A';
  let isRadial = true;

  if (mood) {
    if (mood.sentiment === 'positive') {
        color1 = '#FFF9C4';
        color2 = '#FFECB3';
        isRadial = false;
    } else if (mood.sentiment === 'negative') {
        color1 = '#E1F5FE';
        color2 = '#B3E5FC';
        isRadial = false;
    }
  }

  // Define style using CSS variables
  const containerStyle = {
      '--bg-color-1': color1,
      '--bg-color-2': color2,
      backgroundImage: isRadial
        ? 'radial-gradient(circle, var(--bg-color-1) 0%, var(--bg-color-2) 100%)'
        : 'linear-gradient(to bottom right, var(--bg-color-1), var(--bg-color-2))',
      transition: 'background-image 1.5s ease-in-out'
  };

  // Word count logic
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const isLightBg = mood && (mood.sentiment === 'positive' || mood.sentiment === 'negative');

  return (
    <Layout>
      <div
        className="flex-1 flex flex-col items-center justify-start pt-20 px-6 fade-in min-h-[calc(100vh-88px)] transition-all duration-1500"
        style={containerStyle}
      >
        <div className="w-full max-w-3xl flex-1 flex flex-col">
          {/* Headline */}
          <h1 className={`tracking-tight text-3xl md:text-4xl font-light leading-tight text-center pb-12 opacity-80 transition-colors duration-1500 ${isLightBg ? "text-journal-text" : "text-off-white"}`}>
            How are you feeling today?
          </h1>

          {/* Writing Interface */}
          <div className="relative w-full flex-1">
            <textarea
                className={`w-full h-full min-h-[400px] bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-light leading-relaxed resize-none focus:outline-none transition-colors duration-1500 ${isLightBg ? "text-journal-text placeholder:text-journal-text/40" : "text-off-white/90 placeholder:text-off-white/20"}`}
                placeholder="Begin your reflection here..."
                spellCheck="false"
                value={text}
                onChange={handleTextChange}
                aria-label="Daily reflection entry"
            ></textarea>
          </div>
        </div>

        {/* Footer Controls */}
        <footer className="w-full max-w-5xl mx-auto py-12 flex flex-col gap-8 mt-auto">
            {/* Emotion Chips */}
            <MoodChips selectedMood={mood?.value} onSelect={setMood} isLightBg={isLightBg} />

            {/* Status & Stats Bar */}
            <div className={`flex items-center justify-between border-t pt-6 opacity-40 hover:opacity-100 transition-all duration-500 ${isLightBg ? "border-journal-text/20 text-journal-text" : "border-off-white/5 text-off-white"}`}>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
                        <span className="material-symbols-outlined text-sm">edit_note</span>
                        <span>{wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>{readTime} min read</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <span className="material-symbols-outlined text-sm">cloud_done</span>
                    <span className="tracking-widest uppercase">Saved to cloud</span>
                </div>
            </div>
        </footer>

        {/* Background Decorative Elements (Only show in Dark Mode / Default) */}
        {!isLightBg && (
            <>
                <div className="fixed top-1/4 -left-20 w-96 h-96 bg-editor-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-editor-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
            </>
        )}
      </div>
    </Layout>
  );
};
