import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoodProvider } from './context/MoodContext';
import { HistoryPage } from './pages/HistoryPage';
import { EditorPage } from './pages/EditorPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <MoodProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<HistoryPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </MoodProvider>
  );
}

export default App;
