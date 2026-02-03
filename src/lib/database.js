import { MOODS } from './constants';

const STORAGE_KEY = 'mood_journal_entries';

const SEED_TITLES = [
  "Morning Reflection",
  "Evening Thoughts",
  "Mid-day Break",
  "Just a note",
  "Feeling today",
  "Daily Check-in",
  "Thoughts on the day",
  "Quick update"
];

const SEED_CONTENTS = [
  "Today was a good day. I felt really connected to my work.",
  "A bit tired, but managed to get things done. Need to sleep earlier tonight.",
  "Had a great conversation with a friend that really lifted my spirits.",
  "Feeling a bit anxious about the upcoming deadline, but I have a plan.",
  "Took a walk outside and the fresh air really cleared my head.",
  "Excited about the weekend! Have some fun plans lined up.",
  "Just needed to write something down to get it out of my system.",
  "Productive session today. I feel like I'm making progress.",
  "Slow start to the morning, but picked up pace later in the day.",
  "Grateful for the small things today. The coffee was perfect."
];

function generateSeedData() {
  const entries = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    // 70% chance to have an entry on a given day
    if (Math.random() > 0.3) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      // Set a random time during the day
      date.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));

      const moodObj = MOODS[Math.floor(Math.random() * MOODS.length)];
      const title = SEED_TITLES[Math.floor(Math.random() * SEED_TITLES.length)];
      const content = SEED_CONTENTS[Math.floor(Math.random() * SEED_CONTENTS.length)];

      entries.push({
        id: Date.now() - (i * 86400000) + Math.floor(Math.random() * 1000),
        title,
        date: date,
        mood: moodObj.value,
        moodIcon: moodObj.icon,
        content,
        sentiment: moodObj.sentiment,
        category: moodObj.label
      });
    }
  }

  return entries.sort((a, b) => b.date - a.date);
}

export const initializeDatabase = () => {
  if (typeof window === 'undefined') return;

  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const seed = generateSeedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
};

export const getEntries = () => {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed.map(entry => ({
      ...entry,
      date: new Date(entry.date)
    }));
  } catch (e) {
    console.error("Failed to parse entries", e);
    return [];
  }
};

export const addEntry = (entry) => {
  const entries = getEntries();
  const newEntries = [entry, ...entries];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  return newEntries;
};
