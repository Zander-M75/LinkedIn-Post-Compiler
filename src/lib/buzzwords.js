// Buzzword detector: patterns to highlight in the compiled post, each with a tooltip.

export const BUZZWORDS = [
  { key: 'synergy', pattern: 'synerg\\w*', tip: 'Meaning unclear. Sounds expensive.' },
  { key: 'leverage', pattern: 'leverag\\w*', tip: 'Corporate replacement for “use.”' },
  { key: 'scalable', pattern: 'scalab\\w*', tip: 'Required in every startup pitch.' },
  { key: 'leadership', pattern: 'leadership', tip: 'Apparently fixing bugs counts now.' },
  { key: 'impact', pattern: 'impact\\w*', tip: 'Unit of measurement: vibes.' },
  { key: 'strategic', pattern: 'strategic\\w*', tip: 'Like regular, but wearing a blazer.' },
  { key: 'growth', pattern: 'growth', tip: 'Up and to the right. Emotionally.' },
  { key: 'innovation', pattern: 'innovat\\w*', tip: 'Doing a thing, but with a keynote.' },
  { key: 'stakeholder', pattern: 'stakeholders?', tip: 'Anyone who might get cc’d.' },
  { key: 'optimize', pattern: 'optimi[sz]\\w*', tip: 'Changed slightly, then announced loudly.' },
  { key: 'cross-functional', pattern: 'cross-functional', tip: 'You messaged someone in another Slack channel.' },
  { key: 'alignment', pattern: 'align\\w*', tip: 'Everyone nodded on the call.' },
  { key: 'streamlined', pattern: 'streamlin\\w*', tip: 'Deleted one step. Wrote a memo about it.' },
  { key: 'initiative', pattern: 'initiatives?', tip: 'A task with a slide deck.' },
  { key: 'ownership', pattern: 'ownership', tip: 'Doing your job, rebranded.' },
  { key: 'journey', pattern: 'journey', tip: 'What you were doing, but cinematic.' },
  { key: 'mindset', pattern: 'mindset', tip: 'A personality, sold separately.' },
  { key: 'operational efficiency', pattern: 'operational efficiency', tip: 'Nobody knows. Nobody asks.' },
  { key: 'upskilling', pattern: 'upskill\\w*', tip: 'Watched a tutorial at 1.5x speed.' },
  { key: 'spearheaded', pattern: 'spearhead\\w*', tip: 'Was in the meeting.' },
]

// Longest patterns first so "operational efficiency" wins over shorter overlaps.
const ordered = [...BUZZWORDS].sort((a, b) => b.pattern.length - a.pattern.length)
const compiled = ordered.map((b) => ({ ...b, re: new RegExp(`^${b.pattern}$`, 'i') }))

export const BUZZWORD_REGEX = new RegExp(`\\b(${ordered.map((b) => b.pattern).join('|')})\\b`, 'gi')

export function lookupBuzzword(word) {
  return compiled.find((b) => b.re.test(word))
}

export function countBuzzwords(text) {
  return (text.match(BUZZWORD_REGEX) || []).length
}
