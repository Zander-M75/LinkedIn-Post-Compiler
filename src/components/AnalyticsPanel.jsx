import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import './AnalyticsPanel.css'

const SEGMENTS = 20

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])
  return value
}

export default function AnalyticsPanel({ analytics }) {
  const { cringe, verdict, rows } = analytics
  const shown = useCountUp(cringe)
  const lit = Math.round((shown / 100) * SEGMENTS)

  return (
    <section className="panel analytics" aria-labelledby="analysis-title">
      <div className="panel__head">
        <span id="analysis-title" className="panel__tab analytics__title">
          <Activity size={13} aria-hidden="true" />
          <span>POST ANALYSIS</span>
        </span>
        <span>confidence: unwarranted</span>
      </div>

      <div className="analytics__body">
        <div className="cringe">
          <div className="cringe__top">
            <span className="eyebrow">Cringe Score</span>
            <span className={`cringe__verdict tone-${verdict.tone}`}>{verdict.text}</span>
          </div>
          <div className="cringe__score" aria-label={`Cringe score: ${cringe} out of 100`}>
            <span className="cringe__num">{shown}</span>
            <span className="cringe__max">/100</span>
          </div>
          <div className="meter" aria-hidden="true">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} className={`meter__seg ${i < lit ? 'is-lit' : ''}`} style={{ '--h': 150 - i * 7.5 }} />
            ))}
          </div>
        </div>

        <dl className="stats">
          {rows.map((row, i) => (
            <div key={row.label} className="stats__row" style={{ '--d': `${i * 60}ms` }}>
              <dt>{row.label}</dt>
              <dd className={row.emphasis ? 'is-up' : row.warn ? 'is-warn' : ''}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
