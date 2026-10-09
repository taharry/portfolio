// Single source of truth for the project "case files" — used by both the
// Projects listing (src/pages/Projects.jsx) and the per-project dossier
// route (src/pages/ProjectDetail.jsx). Add a project here and it appears in
// both places automatically.
//
// Screenshots: no real project screenshots exist in this repo yet, so
// `screenshot` is left unset below and ProjectDetail shows an honest
// placeholder instead. To add one: drop an image at
// `public/screenshots/<slug>.png` (roughly 1280x800, landscape, <500KB) and
// set `screenshot: '/screenshots/<slug>.png'` on that project — the
// dossier-evidence framing, lightbox, and mobile display all just work
// once the field is set, no other changes needed.

export const PROJECTS = [
  {
    slug: 'lingoquest',
    motif: 'lingoquest',
    badge: 'FULL-STACK / AI',
    category: 'Full-Stack · AI / NLP',
    title: 'LingoQuest: AI Language Learning Platform',
    screenshot: null,
    summary:
      "An AI language-learning platform with a conversational tutor that listens to your pronunciation and adapts each lesson to how you're doing, tracking your progress as you go.",
    problem:
      "Most language apps are flashcard drills with no real conversation practice, so learners can recognize words on a screen but freeze the moment they have to actually speak. There's also no feedback loop telling them specifically what's wrong with their pronunciation.",
    users:
      'Self-directed language learners (and language programs) who want tutor-style conversational practice and pronunciation feedback without scheduling a human tutor every session.',
    stack: ['React', 'Spring Boot', 'FastAPI', 'MySQL', 'JWT Auth', 'LLMs', 'NLP', 'Speech Processing'],
    href: 'https://github.com/taharry',
  },
  {
    slug: 'adventra',
    motif: 'adventra',
    badge: 'MULTI-AGENT AI',
    category: 'Full-Stack · Multi-Agent AI',
    title: 'Adventra: Multi-Agent Travel Planner',
    screenshot: null,
    summary:
      'A travel planner that builds your itinerary for you: a team of AI agents researches destinations, hotels, and activities, then puts together a day-by-day plan you can save, tweak, and share.',
    problem:
      "Planning a multi-stop trip means juggling destination research, lodging, logistics, and budget across a dozen open tabs. A single prompt to a general chatbot tends to produce a shallow, generic itinerary that doesn't account for how the pieces fit together.",
    users:
      'Travelers planning multi-destination trips who want a structured, personalized itinerary they can save, edit, and share with travel companions.',
    stack: ['React', 'Flask', 'Node.js', 'MongoDB', 'LangGraph', 'Model Context Protocol (MCP)', 'Gemini API', 'JWT', 'bcrypt'],
    href: 'https://github.com/taharry',
  },
  {
    slug: 'mujam',
    motif: 'mujam',
    badge: 'MUSIC / WEB AUDIO',
    category: 'Web App · Music / Web Audio',
    title: 'MuJam',
    screenshot: null,
    summary:
      'A web app for learning to play your favorite songs on any instrument, no sheet music required. Pick a song and follow synced chord charts and fingering diagrams, paced by an adjustable-speed metronome with loop mode and a strum-pattern guide.',
    problem:
      'Learning an instrument by ear or from scrambled tab sites is slow and error-prone, and most learn-to-play tools assume you can already read sheet music.',
    users:
      'Beginner-to-intermediate musicians who want to play real songs on guitar, ukulele, piano, and similar instruments, paced by a metronome instead of parsing notation.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Web Audio API', 'React Router', 'Vitest'],
    href: 'https://github.com/taharry/MuJam',
    demo: 'https://mujam-ten.vercel.app',
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
