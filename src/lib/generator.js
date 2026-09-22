// Local "compiler". Takes a plain sentence and an intensity level (1–5)
// and returns a post. Designed so `compilePost` can later be swapped for an LLM call.

import * as C from './corpus.js'

// --- tiny random helpers ------------------------------------------------

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const chance = (p) => Math.random() < p

function sample(arr, n) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

const fill = (template, vars) =>
  template.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`))

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Lowercase the first letter unless the first word is an acronym (AI, API, QA…).
function lowerFirst(s) {
  const first = s.split(' ')[0]
  if (first.length > 1 && first === first.toUpperCase()) return s
  return s.charAt(0).toLowerCase() + s.slice(1)
}

const numbered = (items) => items.map((item, i) => `${i + 1}. ${item}`).join('\n')

// --- input parsing ------------------------------------------------------

const PAST_VERBS = new Set([
  'got', 'did', 'made', 'went', 'wrote', 'built', 'ran', 'led', 'met', 'had', 'sat',
  'took', 'gave', 'saw', 'shipped', 'was', 'were', 'became', 'began', 'found', 'drank',
  'broke', 'spoke', 'taught', 'thought', 'bought', 'sent', 'spent', 'won', 'lost', 'left',
])

const NORMAL_VERB_UPGRADES = {
  fixed: 'Resolved', made: 'Built', did: 'Completed', finished: 'Completed',
  got: 'Received', helped: 'Supported', talked: 'Spoke', sat: 'Participated',
}

export function parseInput(raw) {
  let text = (raw || '').trim().replace(/\s+/g, ' ').replace(/[.!?…]+$/, '')
  text = text.replace(/\b(just|basically|kinda|literally|sort of|kind of)\s+/gi, '')
  // Templates add their own time framing ("Today, I…"), so drop a trailing one.
  text = text.replace(/,?\s+(today|yesterday|this morning|this week)$/i, '')
  if (!text) text = 'did something'

  const expanded = text
    .replace(/^I['’]m\b/i, 'I am')
    .replace(/^I['’]ve\b/i, 'I have')

  let action
  let fromVerb = true
  const pronoun = expanded.match(/^(?:(?:today|yesterday|this week|recently|finally),?\s+)?(?:I|we)\s+(.+)$/i)
  const firstWord = expanded.split(' ')[0].toLowerCase()

  if (pronoun) {
    action = pronoun[1]
  } else if (PAST_VERBS.has(firstWord) || /^[a-z]+ed$/.test(firstWord)) {
    action = lowerFirst(expanded)
  } else {
    action = `experienced the following: ${lowerFirst(expanded)}`
    fromVerb = false
  }

  const topic = C.TOPICS.find((t) => t.match.test(text)) || C.DEFAULT_TOPIC
  const wordCount = text.split(' ').filter(Boolean).length

  return {
    text,
    action,
    fromVerb,
    topic,
    wordCount,
    flags: {
      ai: /\bAI\b/.test(raw || ''),
      meeting: /meeting/i.test(raw || ''),
      coffee: /coffee/i.test(raw || ''),
      layoff: topic.id === 'layoff',
      short: wordCount <= 2,
    },
  }
}

// --- level 1: Normal ----------------------------------------------------

function normal(p) {
  if (!p.fromVerb) return { blocks: [`${capitalize(p.text)}.`], lessons: 0 }
  const [first, ...rest] = p.action.split(' ')
  // "got promoted" / "got laid off" keep their verb; only upgrade plain verbs.
  const auxiliary = rest[0] && /^(laid|let|\w+ed)$/i.test(rest[0])
  const verb = (!auxiliary && NORMAL_VERB_UPGRADES[first.toLowerCase()]) || capitalize(first)
  let sentence = [verb, ...rest].join(' ').replace(/\bbroke\b/gi, 'was causing issues with')
  if (p.wordCount === 1) sentence += ' on assigned responsibilities'
  return { blocks: [`${sentence}.`], lessons: 0 }
}

// --- level 2: Corporate -------------------------------------------------

function corporate(p) {
  const vars = { action: p.action }
  const blocks = [
    fill(pick(C.CORPORATE_OPENERS), vars),
    C.CORPORATE_BENEFITS[p.topic.id] || C.CORPORATE_BENEFITS.generic,
  ]
  if (p.flags.coffee && p.topic.id !== 'coffee') blocks.push(C.CORPORATE_BENEFITS.coffee)
  // Don't repeat "operational efficiency" if the opener already used it.
  const used = blocks.join(' ')
  blocks.push(pick(C.CORPORATE_CLOSERS.filter((c) => !c.includes('operational efficiency') || !used.includes('operational efficiency'))))
  return { blocks: [blocks.join(' ')], lessons: 0 }
}

// --- level 3: Thought Leader --------------------------------------------

function thoughtLeader(p) {
  const vars = { action: p.action, between: p.topic.between, small: p.topic.small }

  if (p.flags.layoff) {
    const L = C.LAYOFF.thought
    return {
      blocks: [L.hook, L.bridge, 'Here’s what this chapter taught me:', numbered(L.lessons), L.conclusion],
      lessons: 3,
    }
  }

  let lessons = sample(C.THOUGHT_LESSONS, 3)
  if (p.flags.coffee) lessons[2] = C.COFFEE_LESSON

  const blocks = [fill(pick(C.THOUGHT_HOOKS), vars)]
  if (p.flags.meeting && chance(0.6)) blocks.push(C.MEETING_EGG)
  blocks.push(
    fill(pick(C.THOUGHT_BRIDGES), vars),
    p.topic.insight,
    'Here’s what it taught me:',
    numbered(lessons),
    fill(pick(C.THOUGHT_CONCLUSIONS), vars),
  )
  return { blocks, lessons: 3 }
}

// --- level 4: Founder Mode ----------------------------------------------

function founder(p) {
  const vars = { action: p.action }
  const arrows = sample(C.FOUNDER_ARROWS, rand(3, 4))
  if (p.flags.coffee) arrows[0] = C.COFFEE_LESSON
  const arrowList = arrows.map((a) => `→ ${a}`).join('\n')

  if (p.flags.layoff) {
    const L = C.LAYOFF.founder
    return {
      blocks: [L.hook, ...L.beats, 'Here’s what I’m taking with me:', arrowList, pick(C.FOUNDER_CLOSERS), L.closer],
      lessons: arrows.length,
    }
  }

  const [beatA, beatB] = sample(C.FOUNDER_BEATS, 2)
  const blocks = [fill(pick(C.FOUNDER_HOOKS), vars), beatA, p.topic.founder]
  if (p.flags.meeting && chance(0.5)) blocks.push(C.MEETING_EGG)
  if (p.flags.ai) blocks.push(C.AI_LINE)
  blocks.push(
    'Here’s what building taught me:',
    arrowList,
    beatB,
    'Move fast. Talk to customers. Iterate.',
    pick(C.FOUNDER_CLOSERS),
  )
  return { blocks, lessons: arrows.length }
}

// --- level 5: LinkedIn Psychopath ---------------------------------------

function metric() {
  return fill(pick(C.PSYCHO_METRICS), {
    pct: rand(212, 948),
    pct2: rand(81, 89),
    x: (rand(31, 149) / 10).toFixed(1),
    m: (rand(12, 97) / 10).toFixed(1),
    n: rand(11, 43),
  })
}

function hashtags(p) {
  const base = C.HASHTAGS.slice(0, 5)
  const extra = sample(C.HASHTAGS.slice(5), rand(1, 2))
  const topical = []
  if (p.flags.ai) topical.push('#AI')
  if (p.flags.coffee) topical.push('#CoffeeFirst')
  if (p.flags.layoff) topical.push(...C.LAYOFF.psycho.tags)
  return [...base, ...topical, ...extra].join(' ')
}

function psychopath(p) {
  const vars = { action: p.action, small: p.topic.small, tool: p.topic.tool }
  const count = rand(5, 7)

  const lessonPool = sample(C.PSYCHO_LESSONS, count)
  const specials = [C.TOPIC_LESSONS[p.topic.id], p.flags.coffee && C.COFFEE_LESSON].filter(Boolean)
  const lessons = [...new Set([...specials, ...lessonPool])].slice(0, count)

  if (p.flags.layoff) {
    const L = C.LAYOFF.psycho
    return {
      blocks: [
        L.hook, L.epiphany, L.vulnerability,
        `The result? ${capitalize(metric())}.`,
        `Here are ${count} things unemployment taught me about leadership:`,
        numbered(lessons),
        L.confidence, L.conclusion, hashtags(p), 'Agree?',
      ],
      lessons: count,
    }
  }

  const blocks = [
    fill(pick(C.PSYCHO_HOOKS), vars),
    `For ${rand(11, 47)} minutes, nothing else existed.`,
    `Most people would have seen ${p.topic.small}.`,
    pick(C.PSYCHO_EPIPHANIES),
  ]
  if (p.flags.short) {
    blocks.push(`Some people need paragraphs to make an impact. I needed ${p.wordCount === 1 ? 'one word' : 'two words'}.`)
  }
  blocks.push(pick(C.PSYCHO_VULNERABILITY), fill(pick(C.PSYCHO_STORIES), vars))
  if (p.flags.meeting) blocks.push(C.MEETING_EGG)
  blocks.push(pick(C.PSYCHO_BUZZ_LINES), `The result? ${capitalize(metric())}.`)
  if (p.flags.ai) blocks.push(C.AI_LINE)
  blocks.push(
    `Here are ${count} things ${p.topic.small} taught me about leadership:`,
    numbered(lessons),
    pick(C.PSYCHO_CONFIDENCE),
    fill(pick(C.PSYCHO_CONCLUSIONS), vars),
    hashtags(p),
    'Agree?',
  )
  return { blocks, lessons: count }
}

// --- public API ---------------------------------------------------------

const STRATEGIES = { 1: normal, 2: corporate, 3: thoughtLeader, 4: founder, 5: psychopath }

export function compilePost(raw, level) {
  const parsed = parseInput(raw)
  const out = STRATEGIES[level](parsed)
  return {
    text: out.blocks.join('\n\n'),
    lessons: out.lessons,
    flags: parsed.flags,
    level,
  }
}
