## 2024-05-22 - Accessibility of Icon-Only Buttons
**Learning:** Icon-only buttons (like the theme toggle) are a common pattern in "Less is More" designs but often fail accessibility checks without explicit `aria-label` attributes.
**Action:** Always verify icon-only interactive elements have an `aria-label` or `aria-labelledby` that describes the action, not the icon itself.
