import { Terminal, Loader2 } from 'lucide-react'
import './CompileButton.css'

export default function CompileButton({ busy, onClick }) {
  return (
    <button type="button" className="compile-btn" onClick={onClick} disabled={busy}>
      {busy ? <Loader2 className="compile-btn__spin" size={18} aria-hidden="true" /> : <Terminal size={18} aria-hidden="true" />}
      <span>{busy ? 'Compiling…' : 'Optimize my personal brand'}</span>
    </button>
  )
}
