import { useEffect, useState } from 'react'
import { compileSteps } from '../lib/levels.js'
import './Compiler.css'

const TOTAL_MS = 2100

export default function Compiler({ level, source, onDone }) {
  const steps = compileSteps(level)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const interval = TOTAL_MS / (steps.length + 1)
    const timers = steps.map((_, i) => setTimeout(() => setShown(i + 1), interval * (i + 1)))
    timers.push(setTimeout(onDone, TOTAL_MS + 380))
    return () => timers.forEach(clearTimeout)
    // Run once per mount; App remounts this component for every compile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finished = shown >= steps.length
  const progress = Math.round((shown / steps.length) * 100)

  return (
    <div className="compiler" role="log" aria-live="polite" aria-label="Compiler output">
      <div className="compiler__cmd">
        <span className="compiler__prompt">$</span> bsc --intensity={level} source.txt
      </div>
      <div className="compiler__src">“{source}”</div>

      <ol className="compiler__lines">
        {steps.slice(0, shown).map((step, i) => (
          <li key={step} className="compiler__line">
            <span className="compiler__caret">&gt;</span>
            <span className="compiler__text">{step}</span>
            <span className={`compiler__status ${i === shown - 1 && !finished ? 'is-running' : ''}`}>
              {i === shown - 1 && !finished ? '···' : 'ok'}
            </span>
          </li>
        ))}
        {finished && <li className="compiler__line compiler__line--success">✓ Compilation successful.</li>}
      </ol>

      <div className="compiler__progress" aria-hidden="true">
        <div className="compiler__track">
          <div className="compiler__bar" style={{ width: `${progress}%` }} />
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  )
}
