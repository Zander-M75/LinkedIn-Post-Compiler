import { LEVELS, getLevel } from '../lib/levels.js'
import './IntensitySlider.css'

export default function IntensitySlider({ level, onChange }) {
  const current = getLevel(level)
  const progress = (level - 1) / (LEVELS.length - 1)

  return (
    <section className="panel intensity" aria-labelledby="intensity-label">
      <div className="intensity__top">
        <span id="intensity-label" className="eyebrow">LinkedIn Intensity</span>
        <code className="intensity__flag">--intensity={current.flag}</code>
      </div>

      <div className="intensity__current" aria-live="polite">
        <span className="intensity__num" aria-hidden="true">{String(level).padStart(2, '0')}</span>
        <div className="intensity__copy" key={level}>
          <div className="intensity__name">{current.name}</div>
          <p className="intensity__blurb">{current.blurb}</p>
        </div>
      </div>

      <div className="slider" style={{ '--p': progress }}>
        <div className="slider__track" aria-hidden="true">
          <div className="slider__fill" />
          {LEVELS.map((l) => (
            <span
              key={l.id}
              className={`slider__stop ${l.id <= level ? 'is-on' : ''}`}
              style={{ '--i': (l.id - 1) / (LEVELS.length - 1) }}
            />
          ))}
        </div>
        <input
          type="range"
          className="slider__input"
          min={1}
          max={LEVELS.length}
          step={1}
          value={level}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-labelledby="intensity-label"
          aria-valuetext={`${level} of 5: ${current.name}`}
        />
      </div>

      <div className="slider__labels">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            type="button"
            tabIndex={-1}
            className={`slider__label ${l.id === level ? 'is-current' : ''}`}
            style={{ '--i': (l.id - 1) / (LEVELS.length - 1) }}
            onClick={() => onChange(l.id)}
          >
            {l.name}
          </button>
        ))}
      </div>
    </section>
  )
}
