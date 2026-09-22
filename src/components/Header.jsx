import { BadgeCheck } from 'lucide-react'
import './Header.css'

export default function Header({ level }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true">&gt;_</div>
          <div className="brand__text">
            <h1 className="brand__title">
              LinkedIn Bullshit Compiler
              {level === 5 && (
                <BadgeCheck className="brand__verified" size={18} aria-label="Verified (self-verified)" />
              )}
            </h1>
            <p className="brand__subtitle">Turn ordinary accomplishments into extraordinary thought leadership.</p>
          </div>
        </div>

        <div className="header__meta">
          {level >= 4 && <span className="stealth-badge">Building @ Stealth 🚀</span>}
          <span className="status" role="status">
            <span className="status__dot" aria-hidden="true" />
            Personal Brand Engine Online
          </span>
        </div>
      </div>
    </header>
  )
}
