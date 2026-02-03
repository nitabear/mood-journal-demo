import React, { useMemo } from 'react';
import { Layout } from '../components/Layout';
import { useMood } from '../context/MoodContext';

export const AnalyticsPage = () => {
  const { theme, entries } = useMood();
  const isDark = theme === 'dark';

  const stats = useMemo(() => {
    if (!entries || entries.length === 0) return null;

    // Filter last 30 days
    const now = new Date();
    // Reset time to end of day for accurate day diff
    now.setHours(23, 59, 59, 999);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29); // 30 days including today
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const recentEntries = entries.filter(e => new Date(e.date) >= thirtyDaysAgo);

    if (recentEntries.length === 0) return null;

    // Helper for score
    const getScore = (sentiment) => {
      if (sentiment === 'positive') return 5;
      if (sentiment === 'neutral') return 3;
      return 1;
    };

    // Primary Mood (Most frequent category)
    const counts = {};
    recentEntries.forEach(e => {
      const cat = e.category || 'Neutral';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const primaryMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    // Avg Score
    const totalScore = recentEntries.reduce((acc, e) => acc + getScore(e.sentiment), 0);
    const avgScore = (totalScore / recentEntries.length).toFixed(1);

    // Chart Data (Daily Averages)
    const dailyData = new Array(30).fill(null);

    recentEntries.forEach(e => {
        const entryDate = new Date(e.date);
        const dayDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));

        if (dayDiff >= 0 && dayDiff < 30) {
            const index = 29 - dayDiff;
            if (!dailyData[index]) dailyData[index] = [];
            dailyData[index].push(getScore(e.sentiment));
        }
    });

    // Interpolate / Fill gaps
    let points = [];
    let lastVal = 3; // Default start

    // First pass: Calculate averages where data exists
    const averages = dailyData.map(scores =>
        scores ? scores.reduce((a, b) => a + b, 0) / scores.length : null
    );

    // Find first valid data point to start "lastVal" correctly if possible
    const firstValid = averages.find(v => v !== null);
    if (firstValid !== undefined) lastVal = firstValid;

    for (let i = 0; i < 30; i++) {
        if (averages[i] !== null) {
            lastVal = averages[i];
        }
        points.push({ x: i, y: lastVal });
    }

    return {
        primaryMood: primaryMood ? primaryMood[0] : 'Neutral',
        primaryMoodCount: primaryMood ? primaryMood[1] : 0,
        avgScore,
        chartData: points,
        totalEntries: recentEntries.length
    };
  }, [entries]);

  // Chart Rendering Helpers
  const width = 472;
  const height = 150;
  const padding = 20; // Top/Bottom padding

  // y ranges from 1 to 5. Map to height-padding .. padding
  const mapY = (y) => height - padding - ((y - 1) / 4) * (height - 2 * padding);
  const mapX = (x) => (x / 29) * width;

  const chartPath = useMemo(() => {
      if (!stats || !stats.chartData) return "";
      return stats.chartData.map((p, i) =>
          `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`
      ).join(" ");
  }, [stats]);

  const areaPath = useMemo(() => {
      if (!stats || !stats.chartData) return "";
      const line = chartPath;
      return `${line} L ${width} ${height} L 0 ${height} Z`;
  }, [chartPath, stats]);

  if (!stats) {
       return (
         <Layout>
            <div className={`flex-1 flex items-center justify-center ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
                <p className="text-gray-500">Not enough data to generate insights yet.</p>
            </div>
         </Layout>
       )
  }

  return (
    <Layout>
      <div className={`flex-1 flex flex-col items-center py-10 px-6 transition-colors duration-300 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
        <div className="w-full max-w-[960px] flex-1 flex flex-col">

            {/* Breadcrumbs */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-wrap gap-2 py-4">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Insights</span>
                    <span className="text-gray-400 text-sm font-medium leading-normal">/</span>
                    <span className="text-[#111518] dark:text-white text-sm font-medium leading-normal">Mood Trends</span>
                </div>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-[#111518] dark:text-white text-4xl font-light leading-tight tracking-[-0.033em]">Mood Trends Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                    A reflection on your emotional journey over the last 30 days.
                </p>
            </div>

            {/* Timeframe Control (Visual only for now) */}
            <div className="flex mb-8">
                <div className="flex h-11 w-full max-w-sm items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                    {['7 Days', '30 Days', '90 Days'].map((label, idx) => (
                        <div key={label} className={`flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-sm font-medium leading-normal transition-all ${
                            idx === 1
                            ? "bg-white dark:bg-gray-700 shadow-sm text-analytics-blue"
                            : "text-gray-500 dark:text-gray-400"
                        }`}>
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8 shadow-sm">
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex min-w-72 flex-1 flex-col gap-1">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Primary Mood</p>
                        <div className="flex items-center gap-3">
                            <p className="text-[#111518] dark:text-white tracking-tight text-3xl font-light leading-tight">
                                Mostly <span className="text-analytics-blue font-medium">{stats.primaryMood}</span>
                            </p>
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
                                <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                                <p className="text-green-600 text-xs font-bold leading-normal">Based on {stats.totalEntries} entries</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Chart */}
                <div className="flex min-h-[300px] flex-1 flex-col gap-6 py-4">
                    <div className="relative w-full h-[240px]">
                        <svg className="overflow-visible" fill="none" height="100%" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`} width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="chartGradient" x1="236" x2="236" y1="20" y2="150">
                                    <stop stopColor="#0688f9" stopOpacity="0.15"></stop>
                                    <stop offset="1" stopColor="#0688f9" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d={areaPath} fill="url(#chartGradient)"></path>
                            <path className="drop-shadow-lg" d={chartPath} stroke="#0688f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                        </svg>
                        {/* Dot on the last point */}
                        <div className="absolute top-0 right-0 size-3 bg-analytics-blue rounded-full ring-4 ring-analytics-blue/20"
                             style={{
                                 top: mapY(stats.chartData[29].y) - 6,
                                 left: mapX(stats.chartData[29].x) - 6
                             }}>
                        </div>
                    </div>
                    <div className="flex justify-between px-2">
                        <p className="text-gray-400 dark:text-gray-500 text-[11px] font-bold tracking-widest uppercase">30 Days Ago</p>
                        <p className="text-gray-400 dark:text-gray-500 text-[11px] font-bold tracking-widest uppercase">15 Days Ago</p>
                        <p className="text-gray-400 dark:text-gray-500 text-[11px] font-bold tracking-widest uppercase">Today</p>
                    </div>
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-analytics-blue/10 text-analytics-blue">
                        <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Observation</h3>
                        <div className="text-[#111518] dark:text-white text-base font-normal leading-relaxed">
                            Your mood seems to track closely with <span className="font-bold text-analytics-blue">{stats.primaryMood}</span> moments recently.
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                        <span className="material-symbols-outlined">avg_pace</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Avg Score</h3>
                        <div className="text-[#111518] dark:text-white text-base font-normal leading-relaxed">
                             <span className="text-2xl font-light">{stats.avgScore}<span className="text-sm text-gray-400 ml-1">/ 5.0</span></span>
                        </div>
                         <p className="text-gray-400 text-xs mt-1">Daily sentiment average</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="size-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <span className="material-symbols-outlined">energy_savings_leaf</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Top Theme</h3>
                        <div className="text-[#111518] dark:text-white text-base font-normal leading-relaxed">
                            <span className="font-bold text-green-600">{stats.primaryMood}</span> appears most frequently in your entries.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
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
