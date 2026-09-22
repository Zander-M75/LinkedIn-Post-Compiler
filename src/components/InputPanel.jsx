import { forwardRef } from 'react'
import { FileText } from 'lucide-react'
import { EXAMPLES } from '../lib/levels.js'
import './InputPanel.css'

export const PLACEHOLDER = 'I fixed a bug that was causing the checkout page to crash.'
const MAX = 280
const MOD_KEY = typeof navigator !== 'undefined' && /Mac|iP(hone|ad)/.test(navigator.platform) ? '⌘' : 'Ctrl'

const InputPanel = forwardRef(function InputPanel({ value, onChange, onSubmit }, ref) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <section className="panel input-panel" aria-labelledby="input-heading">
      <div className="panel__head">
        <span className="panel__tab">
          <FileText size={13} aria-hidden="true" />
          <span>source.txt</span>
        </span>
        <span className="input-panel__lang">plain english</span>
      </div>

      <div className="input-panel__body">
        <label id="input-heading" htmlFor="source" className="input-panel__heading">
          What actually happened?
        </label>

        <textarea
          id="source"
          ref={ref}
          className="input-panel__textarea"
          value={value}
          placeholder={PLACEHOLDER}
          maxLength={MAX}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="true"
        />

        <div className="input-panel__meta">
          <span className="input-panel__hint">
            <kbd>{MOD_KEY}</kbd>
            <kbd>↵</kbd> to compile
          </span>
          <span className={`input-panel__count ${value.length > MAX * 0.9 ? 'is-near' : ''}`}>
            {value.length}/{MAX}
          </span>
        </div>

        <div className="examples" role="group" aria-label="Example prompts">
          <span className="eyebrow">Try</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              className={`chip ${value === ex.text ? 'is-active' : ''}`}
              onClick={() => onChange(ex.text)}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
})

export default InputPanel
