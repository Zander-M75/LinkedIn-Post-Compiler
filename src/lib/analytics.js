// "Bullshit Analytics": humorous metrics derived from the compiled post.

import { countBuzzwords } from './buzzwords.js'

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

const BASE_CRINGE = { 1: 8, 2: 35, 3: 62, 4: 83, 5: 95 }
const ENGAGEMENT = { 1: [2, 6], 2: [31, 58], 3: [140, 230], 4: [380, 460], 5: [812, 947] }
const AUTHENTICITY = { 1: [91, 97], 2: [58, 66], 3: [24, 33], 4: [7, 12], 5: [1, 3] }

const HUMBLE_BRAGS = /humbled|honou?red|grateful|blessed|proud|excited to share|thrilled|almost didn’t post|not ashamed|high-visibility|nobody talks about/gi
const LEADERSHIP = /\blead(?:er|ers|ership|ing)?\b|\bled\b|\bCEO\b|\bmentor\b|\bfounders?\b|\bbuilders?\b/gi

export const VERDICTS = [
  { max: 29, tone: 'low', text: 'This still sounds suspiciously human.' },
  { max: 59, tone: 'medium', text: 'Your coworkers are beginning to worry.' },
  { max: 89, tone: 'high', text: 'You are now eligible to sell a leadership course.' },
  { max: 100, tone: 'max', text: 'You have become the algorithm.' },
]

export function analyzePost({ text, lessons, flags, level }) {
  const buzzwords = countBuzzwords(text)
  const humbleBrags = (text.match(HUMBLE_BRAGS) || []).length + (level >= 4 ? rand(1, 2) : 0)
  const leadership = (text.match(LEADERSHIP) || []).length

  let cringe = BASE_CRINGE[level] + rand(-3, 3) + Math.min(buzzwords, 6)
  if (flags.ai) cringe += 4 // Easter egg: mentioning AI is inherently a little cringe.
  cringe = clamp(cringe, 3, level === 5 ? 100 : 97)

  const verdict = VERDICTS.find((v) => cringe <= v.max)

  return {
    cringe,
    verdict,
    rows: [
      { label: 'Corporate Buzzwords', value: buzzwords },
      { label: 'Humble Brags', value: humbleBrags },
      { label: 'Leadership References', value: leadership },
      { label: 'Unnecessary Life Lessons', value: lessons },
      { label: 'Estimated Recruiter Engagement', value: `+${rand(...ENGAGEMENT[level])}%`, emphasis: true },
      { label: 'Authenticity Remaining', value: `${rand(...AUTHENTICITY[level])}%`, warn: level >= 4 },
    ],
  }
}
