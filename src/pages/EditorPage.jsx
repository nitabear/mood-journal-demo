import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MoodChips } from '../components/ui/MoodChips';
import { useMood } from '../context/MoodContext';

export const EditorPage = () => {
  const { setCurrentMood } = useMood();
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);

  // Sync with context for Navbar
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood, setCurrentMood]);

  // Derive bgStyle directly from mood state
  let bgStyle = {
      background: 'radial-gradient(circle, #2D3436 0%, #1A1A1A 100%)',
      transition: 'background 1.5s ease-in-out'
  };

  if (mood) {
    if (mood.sentiment === 'positive') {
        bgStyle = {
            backgroundColor: '#FFF9C4',
            backgroundImage: 'linear-gradient(to bottom right, #FFF9C4, #FFECB3)',
            transition: 'background 1.5s ease-in-out, background-color 1.5s ease-in-out'
        };
    } else if (mood.sentiment === 'negative') {
        bgStyle = {
            backgroundColor: '#E1F5FE',
            backgroundImage: 'linear-gradient(to bottom right, #E1F5FE, #B3E5FC)',
            transition: 'background 1.5s ease-in-out, background-color 1.5s ease-in-out'
        };
    }
  }

  // Word count logic
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const isLightBg = mood && (mood.sentiment === 'positive' || mood.sentiment === 'negative');

  return (
    <Layout>
      <div
        className="flex-1 flex flex-col items-center justify-start pt-20 px-6 fade-in min-h-[calc(100vh-88px)] transition-all duration-1500"
        style={bgStyle}
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
                onChange={(e) => setText(e.target.value)}
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
