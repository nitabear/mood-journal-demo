import React from 'react';
import { Layout } from '../components/Layout';
import { useMood } from '../context/MoodContext';

export const AnalyticsPage = () => {
  const { theme } = useMood();
  const isDark = theme === 'dark';

  return (
    <Layout>
      <div className={`flex-1 flex flex-col items-center py-10 px-6 transition-colors duration-300 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
        <div className="w-full max-w-[960px] flex-1 flex flex-col">

            {/* Breadcrumbs & Back Button */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-wrap gap-2 py-4">
                    <a className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-analytics-blue transition-colors" href="#">Insights</a>
                    <span className="text-gray-400 text-sm font-medium leading-normal">/</span>
                    <span className="text-[#111518] dark:text-white text-sm font-medium leading-normal">Mood Trends</span>
                </div>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[#111518] dark:text-white text-4xl font-light leading-tight tracking-[-0.033em]">Mood Trends Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">A reflection on your emotional journey over the last 30 days.</p>
                </div>
            </div>

            {/* Timeframe Segmented Control */}
            <div className="flex mb-8">
                <div className="flex h-11 w-full max-w-sm items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                    {['7 Days', '30 Days', '90 Days'].map((label, idx) => (
                        <label key={label} className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all ${
                            idx === 1
                            ? "bg-white dark:bg-gray-700 shadow-sm text-analytics-blue"
                            : "text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}>
                            <span className="truncate">{label}</span>
                            <input className="hidden" name="timeframe" type="radio" defaultChecked={idx===1}/>
                        </label>
                    ))}
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8 shadow-sm">
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex min-w-72 flex-1 flex-col gap-1">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Primary Mood</p>
                        <div className="flex items-center gap-3">
                            <p className="text-[#111518] dark:text-white tracking-tight text-3xl font-light leading-tight">Mostly <span className="text-analytics-blue font-medium">Calm</span></p>
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
                                <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                                <p className="text-green-600 text-xs font-bold leading-normal">+12% vs last month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Line Chart (Static SVG from design) */}
                <div className="flex min-h-[300px] flex-1 flex-col gap-6 py-4">
                    <div className="relative w-full h-[240px]">
                        <svg className="overflow-visible" fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="chartGradient" x1="236" x2="236" y1="20" y2="150">
                                    <stop stopColor="#0688f9" stopOpacity="0.15"></stop>
                                    <stop offset="1" stopColor="#0688f9" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0 109C50 80 80 40 120 40C160 40 200 90 250 90C300 90 340 20 400 20C440 20 450 60 472 45V150H0V109Z" fill="url(#chartGradient)"></path>
                            <path className="drop-shadow-lg" d="M0 109C50 80 80 40 120 40C160 40 200 90 250 90C300 90 340 20 400 20C440 20 450 60 472 45" stroke="#0688f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                        </svg>
                        <div className="absolute top-[20px] left-[85%] size-3 bg-analytics-blue rounded-full ring-4 ring-analytics-blue/20"></div>
                    </div>
                    <div className="flex justify-between px-2">
                        {['Day 1', 'Day 10', 'Day 20', 'Today'].map(d => (
                             <p key={d} className="text-gray-400 dark:text-gray-500 text-[11px] font-bold tracking-widest uppercase">{d}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary & Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: 'lightbulb', color: 'bg-analytics-blue/10 text-analytics-blue', title: 'Key Insight', desc: <>Your mood peaks in the <span className="font-bold text-analytics-blue">mornings</span> after a full 8-hour sleep.</> },
                    { icon: 'avg_pace', color: 'bg-orange-100 text-orange-600', title: 'Avg Score', desc: <span className="text-2xl font-light">4.2<span className="text-sm text-gray-400 ml-1">/ 5.0</span></span>, sub: 'Stably trending upward' },
                    { icon: 'energy_savings_leaf', color: 'bg-green-100 text-green-600', title: 'Top Trigger', desc: <><span className="font-bold text-green-600">Nature Walks</span> consistently improve your focus score.</> }
                ].map((card, i) => (
                    <div key={i} className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className={`size-10 flex items-center justify-center rounded-xl ${card.color}`}>
                            <span className="material-symbols-outlined">{card.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{card.title}</h3>
                            <div className="text-[#111518] dark:text-white text-base font-normal leading-relaxed">
                                {card.desc}
                            </div>
                            {card.sub && <p className="text-gray-400 text-xs mt-1">{card.sub}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Content */}
            <div className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-400 dark:text-gray-500 text-sm italic font-light">
                    "The soul becomes dyed with the color of its thoughts." — Marcus Aurelius
                </p>
            </div>

        </div>
      </div>
    </Layout>
  );
};
