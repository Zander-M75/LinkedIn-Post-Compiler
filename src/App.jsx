import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import InputPanel, { PLACEHOLDER } from './components/InputPanel.jsx'
import IntensitySlider from './components/IntensitySlider.jsx'
import CompileButton from './components/CompileButton.jsx'
import OutputPanel from './components/OutputPanel.jsx'
import AnalyticsPanel from './components/AnalyticsPanel.jsx'
import AchievementToast from './components/AchievementToast.jsx'
import LevelEffects from './components/LevelEffects.jsx'
import Footer from './components/Footer.jsx'
import { compilePost } from './lib/generator.js'
import { analyzePost } from './lib/analytics.js'
import { getLevel } from './lib/levels.js'
import './App.css'

const ACHIEVEMENTS = {
  5: { title: 'Top Voice Candidate', text: '5 posts compiled. Your network has been notified.' },
  10: { title: 'Please Log Off LinkedIn', text: '10 posts compiled. Touch grass. Then post about it.' },
}

const rand = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min

function fakeEngagement(level) {
  const e = getLevel(level).engagement
  return { reactions: rand(e.reactions), comments: rand(e.comments), reposts: rand(e.reposts) }
}

export default function App() {
  const [input, setInput] = useState('')
  const [level, setLevel] = useState(1)
  const [phase, setPhase] = useState('idle') // idle | compiling | done
  const [run, setRun] = useState(null)
  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState(false)
  const [achievement, setAchievement] = useState(null)

  const compiledCount = useRef(0)
  const textareaRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    if (!achievement) return
    const t = setTimeout(() => setAchievement(null), 5500)
    return () => clearTimeout(t)
  }, [achievement])

  const compile = () => {
    if (phase === 'compiling') return
    let source = input.trim()
    if (!source) {
      source = PLACEHOLDER
      setInput(PLACEHOLDER)
    }
    setRun({ id: Date.now(), level, source })
    setPhase('compiling')

    // On stacked (mobile) layouts, bring the compiler into view.
    if (window.matchMedia('(max-width: 960px)').matches) {
      requestAnimationFrame(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  const handleCompiled = () => {
    const post = compilePost(run.source, run.level)
    setResult({
      ...post,
      id: run.id,
      source: run.source,
      analytics: analyzePost(post),
      engagement: fakeEngagement(run.level),
    })
    setPhase('done')

    compiledCount.current += 1
    const unlocked = ACHIEVEMENTS[compiledCount.current]
    if (unlocked) setAchievement({ ...unlocked, id: compiledCount.current })
  }

  const reset = () => {
    setInput('')
    setResult(null)
    setRun(null)
    setPhase('idle')
    setPreview(false)
    textareaRef.current?.focus()
  }

  return (
    <div className="app" data-level={level}>
      <LevelEffects level={level} />
      <Header level={level} />

      <main className="workspace">
        <div className="column column--source">
          <InputPanel ref={textareaRef} value={input} onChange={setInput} onSubmit={compile} />
          <IntensitySlider level={level} onChange={setLevel} />
          <CompileButton busy={phase === 'compiling'} onClick={compile} />
        </div>

        <div className="column column--output" ref={outputRef}>
          <OutputPanel
            phase={phase}
            run={run}
            result={result}
            level={level}
            preview={preview}
            onPreviewChange={setPreview}
            onCompiled={handleCompiled}
            onRecompile={compile}
            onReset={reset}
          />
          {phase === 'done' && result && <AnalyticsPanel key={result.id} analytics={result.analytics} />}
        </div>
      </main>

      <Footer />
      <AchievementToast achievement={achievement} onClose={() => setAchievement(null)} />
    </div>
  )
}
