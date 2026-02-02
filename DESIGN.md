1. Design Philosophy
The Mood Journal is designed to be a premium, calm writing experience. The interface follows a "Less is More" approach, removing all non-essential UI borders and heavy elements to ensure the user can focus entirely on their reflections.

2. Global Styles & Theming
Crucial to the project's programmatic adaptability, the app uses three core CSS variables.

Light Mode (Default)
:root {
  --bg-color-1: #E1F5FE;   /* Pale Sky Blue */
  --bg-color-2: #B3E5FC;   /* Soft Ocean Mist */
  --text-color: #01579B;   /* Midnight Navy */
  --font-family: 'Inter', -apple-system, sans-serif;
  --transition-speed: 0.4s ease-in-out;
  
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
  --max-width: 800px; /* Writing area constraint */
}
3. Typography Specs
To maintain a premium feel, the app uses a spacious typography scale with high line heights.

Element	Size	Weight	Line Height	Notes
Headline (Landing)	48px	600	1.2	Tight tracking (-0.02em)
Editor Input	24px	400	1.6	The primary writing experience
Quote of the Day	16px	400	1.5	Italicized, 60% opacity
Section Headers	14px	600	1.0	All caps, 0.1em letter spacing
Body / Labels	16px	400	1.5	Standard readability
Micro-copy	12px	500	1.0	Used for Saved status/Word count
4. Spacing & Layout Details
The Editor Screen
Textarea Container: Max-width of 800px. Centered horizontally.
Top Margin: var(--space-xl) from the top edge to the Quote.
Internal Padding: The main writing area has var(--space-lg) padding to prevent text from hitting the container edges.
Emotion Tags: Positioned var(--space-lg) below the text area. gap: var(--space-sm).
Lists (History & Settings)
Item Padding: var(--space-md) vertical, 0 horizontal (since the background is borderless).
Section Gap: var(--space-xl) between logical blocks in Settings.
5. Component Styles
Buttons (History/Back): Ghost style (no background). padding: var(--space-sm) var(--space-md).
Emotion Tags: Pill shape (border-radius: 20px). Border: 1px solid var(--text-color) at 20% opacity.
Theme Toggle: 24px icon size. var(--space-md) distance from the 'History' button.
