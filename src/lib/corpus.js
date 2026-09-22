// Raw material for the generator. Everything here is data, not logic,
// so it can be tuned (or replaced by an LLM prompt) without touching the engine.

export const CORPORATE_BUZZWORDS = [
  'leveraged', 'optimized', 'cross-functional', 'strategic', 'stakeholder',
  'scalable', 'impact', 'initiative', 'streamlined', 'drove', 'aligned',
  'operational efficiency', 'synergy', 'growth', 'innovation',
]

// Topic detection. Order matters: the first match wins.
export const TOPICS = [
  {
    id: 'layoff',
    match: /laid off|let go|layoffs?|downsiz|position (was )?eliminated/i,
    small: 'a layoff',
    between: 'the calendar invite titled "Quick Sync" and the HR call',
    insight: 'Sometimes a door closes so you can finally notice how many windows you have.',
    founder: 'Every ending is just an unannounced pivot.',
    tool: 'my calendar',
  },
  {
    id: 'promotion',
    match: /promot|new role|new title|raise/i,
    small: 'a title change',
    between: 'the congratulations and the new email signature',
    insight: 'A promotion isn’t a reward for the work you did. It’s an invitation to the person you’re becoming.',
    founder: 'Titles are just version numbers for humans.',
    tool: 'my email signature',
  },
  {
    id: 'bug',
    match: /bug|crash|fix|broke|error|outage|incident|debug|hotfix|patch/i,
    small: 'a bug',
    between: 'the error logs and the debugger',
    insight: 'The hardest bugs aren’t always in our code. Sometimes they’re in our thinking.',
    founder: 'Every bug is just a customer telling you the truth for free.',
    tool: 'the stack trace',
  },
  {
    id: 'meeting',
    match: /meeting|standup|stand-up|sync|\bcall\b|all-hands|offsite/i,
    small: 'a meeting',
    between: 'the agenda and the action items',
    insight: 'A meeting is never really about the agenda. It’s about who shows up, and who shows up fully.',
    founder: 'The best meetings end with fewer meetings.',
    tool: 'the agenda',
  },
  {
    id: 'learning',
    match: /learn|course|tutorial|studied|certif|react|javascript|python|bootcamp/i,
    small: 'a tutorial',
    between: 'the documentation and the third cup of coffee',
    insight: 'Learning a new skill isn’t about the skill. It’s about proving to yourself that you’re still a beginner.',
    founder: 'Every framework you learn is a moat you dig around your own potential.',
    tool: 'the documentation',
  },
  {
    id: 'project',
    match: /project|launch|ship|release|finish|complet|deploy|deliver/i,
    small: 'a project',
    between: 'the kickoff and the final commit',
    insight: 'Finishing something is a skill. Most people only practice starting.',
    founder: 'Shipping is the only strategy that has never lost an argument.',
    tool: 'the roadmap',
  },
  {
    id: 'coffee',
    match: /coffee|latte|espresso|cappuccino/i,
    small: 'a coffee',
    between: 'the first sip and the last',
    insight: 'The way you make your coffee is the way you make your decisions.',
    founder: 'Every great company started as someone’s third coffee.',
    tool: 'the coffee machine',
  },
]

export const DEFAULT_TOPIC = {
  id: 'generic',
  small: 'a regular Tuesday',
  between: 'the start of the task and the end of it',
  insight: 'The small moments aren’t small. We just haven’t written the post about them yet.',
  founder: 'There is no such thing as a small task. Only small mindsets.',
  tool: 'my to-do list',
}

// --- Level 2: Corporate -------------------------------------------------

export const CORPORATE_OPENERS = [
  'Proud to share that I successfully {action}, a strategic initiative that drove meaningful impact for key stakeholders.',
  'This quarter, I leveraged cross-functional collaboration and {action}, streamlining operational efficiency across the org.',
  'Excited to share that I {action}. By aligning with stakeholders early, we drove scalable impact across the customer journey.',
  'Recently spearheaded a high-visibility initiative in which I {action}, delivering measurable impact aligned with our strategic priorities.',
]

export const CORPORATE_BENEFITS = {
  bug: 'This helped improve platform reliability and optimized the overall customer journey.',
  meeting: 'The outcome: stronger alignment, clearer ownership, and a scalable framework for future syncs.',
  learning: 'This upskilling initiative positions me to drive scalable impact across future workstreams.',
  project: 'The result is a streamlined, scalable solution that will continue to deliver value for stakeholders.',
  promotion: 'I look forward to leveraging this expanded scope to drive strategic growth for the team.',
  coffee: 'Fueled by strategic caffeine alignment and a bias for action.',
  layoff: 'Grateful for the stakeholders, the synergy, and the learnings as I align on my next chapter.',
  generic: 'This initiative optimized key workflows and drove measurable impact for cross-functional partners.',
}

export const CORPORATE_CLOSERS = [
  'Grateful to the team for their alignment on this initiative.',
  'Onward to the next strategic priority.',
  'Always happy to connect with others passionate about operational efficiency.',
  'Thank you to every stakeholder who made this possible.',
]

// --- Level 3: Thought Leader --------------------------------------------

export const THOUGHT_HOOKS = [
  'Today, I {action}.',
  'Something small happened today. I {action}.',
  'I want to talk about something ordinary: today, I {action}.',
]

export const THOUGHT_BRIDGES = [
  'But somewhere between {between}, I realized something.',
  'It sounds simple. It wasn’t. Somewhere between {between}, something shifted.',
  'On paper, that’s all it was. But somewhere between {between}, I learned something.',
]

export const THOUGHT_LESSONS = [
  'Slow down to speed up.',
  'Clarity is a form of kindness.',
  'Progress beats perfection.',
  'The work nobody sees is the work that matters most.',
  'Curiosity is a competitive advantage.',
  'Every problem is a conversation waiting to happen.',
  'Small wins compound.',
  'Your mindset is your most scalable asset.',
  'Growth lives on the other side of discomfort.',
]

export const THOUGHT_CONCLUSIONS = [
  'The next time you face {small}, ask yourself: what is it trying to teach you?',
  'Growth rarely announces itself. Sometimes it just shows up disguised as {small}.',
  'Stay curious. Stay humble. And never underestimate {small}.',
]

// --- Level 4: Founder Mode ----------------------------------------------

export const FOUNDER_HOOKS = [
  'I {action} today.',
  '5:12 AM. I {action}.',
  'Most people would scroll past this. I {action}.',
]

export const FOUNDER_BEATS = [
  'No playbook. No roadmap. Just ownership.',
  'When you’re building, there’s no such thing as a small task.',
  'I didn’t wait for permission. Builders never do.',
  'Some people see a task. Founders see a market.',
]

export const FOUNDER_ARROWS = [
  'Ownership isn’t a title. It’s a habit.',
  'Speed is a feature.',
  'Your customers don’t care about your roadmap. They care about their problem.',
  'Iteration beats intention.',
  'Done is better than perfect. Shipped is better than done.',
  'Resilience is just iteration with feelings.',
  'The best founders are also the best janitors.',
  'Leadership is taking out the trash before anyone asks.',
]

export const FOUNDER_CLOSERS = [
  'The journey is the product.',
  'We’re just getting started. 🚀',
  'Back to building.',
  'Day 1. Always.',
]

// --- Level 5: LinkedIn Psychopath ---------------------------------------

export const PSYCHO_HOOKS = [
  'Yesterday, I {action}.',
  '3:47 AM. I {action}.',
  'I almost didn’t post this. Yesterday, I {action}.',
  'Nobody talks about this, but yesterday, I {action}.',
]

export const PSYCHO_EPIPHANIES = [
  'I saw an opportunity.',
  'I saw a leadership masterclass.',
  'I saw a TED talk.',
  'I saw my destiny. It had excellent engagement.',
]

export const PSYCHO_VULNERABILITY = [
  'I’m not ashamed to admit it: I cried. Twice. Once in the standup, and once while writing this post.',
  'My hands were shaking. Not from fear. From alignment.',
  'I’ll be honest. For a moment, I thought about giving up. That moment lasted 4 seconds. I’ve grown since then.',
  'I’m going to be vulnerable for a second. (Please like this post.)',
]

export const PSYCHO_STORIES = [
  'So I did what any leader would do. I opened {tool}, took a deep breath, and asked myself: what would a Fortune 500 CEO do right now?',
  'I closed my eyes. I thought about my team. I thought about my ancestors. Then I opened {tool}.',
  'I called my mentor. No answer. That was the lesson.',
]

export const PSYCHO_METRICS = [
  '{pct}% increase in stakeholder alignment',
  '{x}x improvement in team morale (self-reported)',
  '${m}M in synergy (projected)',
  '{n} recruiters in my DMs before lunch',
  '{pct2}% reduction in doubt (mine)',
]

export const PSYCHO_LESSONS = [
  'Your error logs are just your team’s love letters. 💌',
  'Sleep is a legacy system. Deprecate it. 😴',
  'I don’t have weekends. I have weekdays in disguise. 📅',
  'A true leader doesn’t wait for the bug. A true leader becomes the bug. 🐛',
  'Pain is just growth that hasn’t been monetized yet. 💸',
  'I explained KPIs to my toddler. Her first word was “alignment.” 👶',
  'Rejection is just acceptance with extra steps. 🚪',
  'Hydration is a leadership decision. 💧',
  'Your comfort zone has zero recruiter engagement. 📉',
  'Every “no” is a “yes” that hasn’t finished onboarding. ✅',
  'Emails are just meetings that believe in themselves. 📧',
]

export const TOPIC_LESSONS = {
  bug: 'Every stack trace is a map to your better self. 🗺️',
  meeting: 'Muting yourself is a form of listening. 🔇',
  learning: 'useState? More like useGrowth. ⚛️',
  project: 'Shipping is a mindset. So is not sleeping. 🚢',
  promotion: 'A promotion is just the universe endorsing you for Leadership. 🏅',
  coffee: 'Coffee isn’t a beverage. It’s a daily standup with your potential. ☕',
  layoff: 'Your job title was never your identity. Your LinkedIn headline, however, is. 🪪',
}

export const PSYCHO_BUZZ_LINES = [
  'So I leveraged cross-functional synergy. I aligned stakeholders. I optimized my own mindset.',
  'By 9 AM, I had aligned 14 stakeholders, leveraged 3 synergies, and optimized one (1) mindset.',
  'I didn’t just finish it. I built a scalable, stakeholder-aligned framework for innovation-led growth.',
]

export const PSYCHO_CONFIDENCE = [
  'I didn’t just do the task. I became the task.',
  'Some people have a career. I have a narrative arc.',
  'I’m not saying I changed the industry. I’m just saying the industry hasn’t been the same since Tuesday.',
]

export const PSYCHO_CONCLUSIONS = [
  'Leadership isn’t a title. It’s what you do when {small} tries to stop you.',
  'They said you can’t change the world with {small}. They were wrong.',
  'Stay hungry. Stay humble. Stay posting.',
]

export const HASHTAGS = [
  '#Leadership', '#Growth', '#Innovation', '#Technology', '#PersonalDevelopment',
  '#Mindset', '#Hustle', '#ThoughtLeadership', '#Synergy', '#FounderLife', '#Grateful',
]

// --- Easter eggs --------------------------------------------------------

export const MEETING_EGG = 'That meeting could have been an email. But it became something much more.'

export const COFFEE_LESSON = 'Coffee isn’t a beverage. It’s a daily standup with your potential. ☕'

export const AI_LINE = 'And yes, AI was involved. Of course AI was involved.'

export const LAYOFF = {
  thought: {
    hook: 'Some personal news: I was recently laid off.',
    bridge: 'It would be easy to call this an ending. I’m choosing to call it a plot twist.',
    lessons: [
      'Your job title is not your identity.',
      'Your network is your net worth, and it’s time I checked the balance.',
      'Every chapter teaches you something, especially the short ones.',
    ],
    conclusion: 'To everyone navigating something similar: you are more than a calendar invite titled “Quick Sync.” Onward. 🌱',
  },
  founder: {
    hook: 'I was laid off this week.',
    beats: [
      'Some people see unemployment. I see an unscheduled founder journey.',
      'No manager. No roadmap. Just runway and a dream.',
    ],
    closer: 'Open to work. Open to building. Mostly open to coffee chats. ☕',
  },
  psycho: {
    hook: 'Yesterday, I was given the gift of unlimited free time.',
    epiphany: 'Most people would call it a layoff. I call it a pre-hire season.',
    vulnerability: 'I’ll be honest: I refreshed my inbox 400 times. Each refresh taught me patience.',
    confidence: 'I am not unemployed. I am between visions.',
    conclusion: 'Open to work. Open to growth. Open to synergy. 🟢',
    tags: ['#OpenToWork', '#NewChapter', '#Resilience'],
  },
}
