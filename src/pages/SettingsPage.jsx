import React from 'react';
import { Layout } from '../components/Layout';
import { useMood } from '../context/MoodContext';

export const SettingsPage = () => {
  const { theme } = useMood();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className={`flex-1 flex flex-col items-center py-10 px-6 transition-colors duration-300 ${isDark ? "bg-app-bg-dark" : "bg-app-bg-light"}`}>
        <div className="w-full max-w-[720px] flex-1 flex flex-col">

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 mb-8">
                <div className="flex min-w-72 flex-col gap-2">
                    <h1 className="text-[#111518] dark:text-white text-4xl font-black leading-tight tracking-tight">Settings</h1>
                    <p className="text-[#5f778c] dark:text-gray-400 text-base font-normal leading-normal">Customize your calm writing experience</p>
                </div>
            </div>

            {/* Appearance Section */}
            <section className="mb-10 bg-white dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="text-[#111518] dark:text-white text-[18px] font-bold leading-tight px-6 pt-6 pb-2">Appearance</h2>

                {/* Font Size Slider */}
                <div className="px-6 py-4">
                    <div className="flex w-full items-center justify-between mb-2">
                        <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Font Size</p>
                        <p className="text-[#5f778c] dark:text-gray-400 text-xs font-normal">16px</p>
                    </div>
                    <div className="flex h-6 w-full items-center gap-4">
                        <input className="flex-1 w-full" max="24" min="12" type="range" defaultValue="16"/>
                    </div>
                </div>

                {/* Line Spacing Slider */}
                <div className="px-6 py-4 border-t border-gray-50 dark:border-gray-800/50">
                    <div className="flex w-full items-center justify-between mb-2">
                        <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Line Spacing</p>
                        <p className="text-[#5f778c] dark:text-gray-400 text-xs font-normal">1.5</p>
                    </div>
                    <div className="flex h-6 w-full items-center gap-4">
                        <input className="flex-1 w-full" max="2.5" min="1" step="0.1" type="range" defaultValue="1.5"/>
                    </div>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="mb-10 bg-white dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="text-[#111518] dark:text-white text-[18px] font-bold leading-tight px-6 pt-6 pb-2">Notifications</h2>

                {/* Daily Reminders Toggle */}
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Daily Reminders</p>
                        <p className="text-[#5f778c] dark:text-gray-400 text-xs">Receive a gentle nudge to write in your journal</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-analytics-blue"></div>
                    </label>
                </div>

                {/* Reminder Time Picker */}
                <div className="px-6 py-5 border-t border-gray-50 dark:border-gray-800/50 flex items-center justify-between">
                    <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Reminder Time</p>
                    <input className="bg-background-light dark:bg-gray-800 border-none rounded-lg text-sm font-medium px-3 py-2 text-[#111518] dark:text-white focus:ring-2 focus:ring-analytics-blue/40 outline-none" type="time" defaultValue="20:00"/>
                </div>
            </section>

            {/* Data Management Section */}
            <section className="mb-10 bg-white dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <h2 className="text-[#111518] dark:text-white text-[18px] font-bold leading-tight px-6 pt-6 pb-2">Data Management</h2>

                {/* Export Button */}
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Export Journal</p>
                        <p className="text-[#5f778c] dark:text-gray-400 text-xs">Save all your entries as a high-quality PDF document</p>
                    </div>
                    <button className="px-4 py-2 bg-analytics-blue/10 dark:bg-analytics-blue/20 text-analytics-blue text-sm font-bold rounded-lg hover:bg-analytics-blue/20 dark:hover:bg-analytics-blue/30 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                        Export PDF
                    </button>
                </div>

                {/* Delete Data Button */}
                <div className="px-6 py-5 border-t border-gray-50 dark:border-gray-800/50 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-[#111518] dark:text-gray-200 text-sm font-medium">Danger Zone</p>
                        <p className="text-[#5f778c] dark:text-gray-400 text-xs">Permanently remove all your writing and history</p>
                    </div>
                    <button className="px-4 py-2 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-900/50 text-sm font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Delete All
                    </button>
                </div>
            </section>

            {/* Footer Info */}
            <div className="flex flex-col items-center justify-center pt-4 pb-12 gap-2">
                <p className="text-[#5f778c] text-xs font-normal">Version 2.4.0 • Made with care for your mind</p>
                <div className="flex gap-4">
                    <a className="text-[#5f778c] hover:text-analytics-blue text-xs underline decoration-analytics-blue/30" href="#">Privacy Policy</a>
                    <a className="text-[#5f778c] hover:text-analytics-blue text-xs underline decoration-analytics-blue/30" href="#">Terms of Service</a>
                </div>
            </div>

        </div>
      </div>
    </Layout>
  );
};
