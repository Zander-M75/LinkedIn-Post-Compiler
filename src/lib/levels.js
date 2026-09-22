// Per-intensity UI configuration. The interface reads from this so each level
// changes copy, file names, and fake engagement in one place.

export const LEVELS = [
  {
    id: 1,
    name: 'Normal',
    flag: 'normal',
    blurb: 'Honest. Readable. Completely unmonetizable.',
    file: 'post.txt',
    engagement: { reactions: [2, 9], comments: [0, 1], reposts: [0, 0] },
  },
  {
    id: 2,
    name: 'Corporate',
    flag: 'corporate',
    blurb: 'Now with 40% more stakeholders.',
    file: 'post_final_v2.docx',
    engagement: { reactions: [38, 96], comments: [3, 11], reposts: [1, 4] },
  },
  {
    id: 3,
    name: 'Thought Leader',
    flag: 'thought-leader',
    blurb: 'Every task is a lesson. Every lesson is a post.',
    file: 'reflections.md',
    engagement: { reactions: [880, 2400], comments: [64, 190], reposts: [21, 58] },
  },
  {
    id: 4,
    name: 'Founder Mode',
    flag: 'founder-mode',
    blurb: 'You are no longer employed. You are building.',
    file: 'pitch_deck_v9_FINAL.key',
    engagement: { reactions: [4100, 7900], comments: [310, 640], reposts: [120, 260] },
  },
  {
    id: 5,
    name: 'LinkedIn Psychopath',
    flag: 'psychopath',
    blurb: 'There is no off switch. Agree?',
    file: 'MY_JOURNEY_FINAL_FINAL(3).txt',
    engagement: { reactions: [16000, 24000], comments: [840, 1300], reposts: [390, 720] },
  },
]

export const getLevel = (id) => LEVELS[id - 1]

export const EXAMPLES = [
  { label: 'Fixed a bug', text: 'I fixed a bug that was causing the checkout page to crash.' },
  { label: 'Finished a project', text: 'I finished the project we’ve been working on for two months.' },
  { label: 'Got promoted', text: 'I got promoted to senior engineer.' },
  { label: 'Attended a meeting', text: 'I attended a meeting that went 20 minutes over.' },
  { label: 'Learned React', text: 'I learned React over the weekend.' },
]

const BASE_STEPS = [
  'Reading human language...',
  'Detecting authenticity...',
  'Removing authenticity...',
  'Injecting corporate buzzwords...',
  'Searching for unnecessary leadership lesson...',
  'Converting minor task into career-defining moment...',
  'Adding questionable metrics...',
  'Optimizing recruiter engagement...',
]

export function compileSteps(level) {
  const steps = [...BASE_STEPS]
  if (level >= 3) steps.push('Manufacturing vulnerability...')
  if (level >= 4) steps.push('Activating founder mindset...')
  if (level === 5) steps.push('Adding “Agree?”...')
  return steps
}
