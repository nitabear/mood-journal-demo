export const MOCK_ENTRIES = [
  {
    id: 1,
    title: "A sense of clarity",
    date: new Date('2023-10-24T10:30:00'),
    mood: "happy",
    moodIcon: "sentiment_satisfied",
    content: "Today I felt a sense of clarity after walking in the park. The crisp air helped me focus on my goals for the upcoming quarter. I realized that my pace is just as important as the destination...",
    sentiment: "positive",
    category: "Inspired"
  },
  {
    id: 2,
    title: "Quiet moments",
    date: new Date('2023-10-23T20:15:00'),
    mood: "neutral",
    moodIcon: "sentiment_neutral",
    content: "Finding peace in the small things like a warm cup of tea and the soft light of sunset. Not a productive day, but a restorative one. I am learning that rest is not a reward, it is a requirement...",
    sentiment: "neutral",
    category: "Calm"
  },
  {
    id: 3,
    title: "Focusing through the noise",
    date: new Date('2023-10-21T09:00:00'),
    mood: "edit_note",
    moodIcon: "edit_note",
    content: "A bit overwhelmed with work today, but managed to stay focused. Deep breathing exercises before the meeting helped significantly. Grateful for the resilience I've built up over these weeks...",
    sentiment: "negative",
    category: "Productive"
  },
  {
    id: 4,
    title: "Monthly Reflection",
    date: new Date('2023-10-19T23:45:00'),
    mood: "verified",
    moodIcon: "verified",
    content: "Reflecting on the goals I set last month and feeling proud. I haven't reached all of them, but the consistency of my journaling has provided a level of self-awareness I didn't have before. The journey continues...",
    sentiment: "positive",
    category: "Reflective"
  }
];

export const MOODS = [
  { label: 'Calm', value: 'calm', sentiment: 'neutral', icon: 'sentiment_neutral' },
  { label: 'Anxious', value: 'anxious', sentiment: 'negative', icon: 'sentiment_dissatisfied' },
  { label: 'Joyful', value: 'joyful', sentiment: 'positive', icon: 'sentiment_satisfied' },
  { label: 'Tired', value: 'tired', sentiment: 'negative', icon: 'bedtime' },
  { label: 'Inspired', value: 'inspired', sentiment: 'positive', icon: 'lightbulb' },
];
