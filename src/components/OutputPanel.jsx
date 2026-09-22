import { useEffect, useRef, useState } from 'react'
import { Check, Copy, FileCode2, RefreshCw, RotateCcw } from 'lucide-react'
import { getLevel } from '../lib/levels.js'
import Compiler from './Compiler.jsx'
import HighlightedText from './HighlightedText.jsx'
import LinkedInPreview from './LinkedInPreview.jsx'
import './OutputPanel.css'

const SUGGESTED_TAGS = ['#Blessed', '#Disruption', '#GrindSeason', '#Visionary', '#Unstoppable', '#HumbleBrag']

export default function OutputPanel({ phase, run, result, level, preview, onPreviewChange, onCompiled, onRecompile, onReset }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => setCopied(false), [result])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.text)
    } catch {
      const el = document.createElement('textarea')
      el.value = result.text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      el.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2400)
  }

  const shownLevel = result ? result.level : level
  const done = phase === 'done' && result

  return (
    <section className="panel output" aria-label="Compiled post">
      <div className="panel__head">
        <span className="panel__tab">
          <FileCode2 size={13} aria-hidden="true" />
          <span>{getLevel(shownLevel).file}</span>
        </span>
        {done && (
          <label className="toggle">
            <input type="checkbox" checked={preview} onChange={(e) => onPreviewChange(e.target.checked)} />
            <span className="toggle__track" aria-hidden="true" />
            Preview on LinkedIn
          </label>
        )}
      </div>

      {phase === 'idle' && <EmptyState level={level} />}

      {phase === 'compiling' && (
        <Compiler key={run.id} level={run.level} source={run.source} onDone={onCompiled} />
      )}

      {done && (
        <>
          <div className="output__body" key={result.id}>
            {preview ? <LinkedInPreview result={result} /> : <DiffView result={result} />}
            {result.level === 5 && !preview && (
              <div className="output__tags" aria-label="Suggested hashtags">
                <span className="eyebrow">Suggested</span>
                {SUGGESTED_TAGS.map((t, i) => (
                  <span key={t} className="output__tag" style={{ '--d': `${i * 60}ms` }}>{t}</span>
                ))}
              </div>
            )}
          </div>

          <div className="output__actions">
            <button type="button" className={`btn ${copied ? 'btn--success' : ''}`} onClick={copy}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied. Go inspire your network.' : 'Copy Post'}</span>
            </button>
            <button type="button" className="btn" onClick={onRecompile}>
              <RefreshCw size={15} aria-hidden="true" />
              Compile Again
            </button>
            <button type="button" className="btn btn--ghost" onClick={onReset}>
              <RotateCcw size={15} aria-hidden="true" />
              Reset
            </button>
          </div>
        </>
      )}
    </section>
  )
}

function EmptyState({ level }) {
  return (
    <div className="empty">
      <div className="empty__cmd">
        <span className="compiler__prompt">$</span> bsc --intensity={level} source.txt
        <span className="empty__cursor" aria-hidden="true" />
      </div>
      <p className="empty__title">Nothing has been optimized yet.</p>
      <p className="empty__text">Describe something you did at work, pick an intensity, and compile.</p>
    </div>
  )
}

function DiffView({ result }) {
  const lines = result.text.split('\n')
  let n = 0
  return (
    <div className="diff">
      <div className="diff__stat">
        <span className="diff__del">−1</span>
        <span className="diff__add">+{lines.filter(Boolean).length}</span>
        <span>authenticity removed</span>
      </div>
      <ol className="diff__lines">
        <li className="diff__line diff__line--del">
          <span className="diff__num">1</span>
          <span className="diff__sign">−</span>
          <span className="diff__text">{result.source}</span>
        </li>
        {lines.map((line, i) => (
          <li
            key={i}
            className={`diff__line diff__line--add ${line ? '' : 'is-blank'}`}
            style={{ '--d': `${Math.min(i, 30) * 22}ms` }}
          >
            <span className="diff__num">{line ? ++n : ''}</span>
            <span className="diff__sign">{line ? '+' : ''}</span>
            <span className="diff__text">
              <HighlightedText text={line} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
