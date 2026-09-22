import { Trophy, X } from 'lucide-react'
import './AchievementToast.css'

export default function AchievementToast({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <div className="toast toast--achievement" role="status" key={achievement.id}>
      <div className="toast__icon" aria-hidden="true">
        <Trophy size={18} />
      </div>
      <div className="toast__copy">
        <div className="toast__eyebrow">Achievement Unlocked</div>
        <div className="toast__title">{achievement.title}</div>
        <div className="toast__text">{achievement.text}</div>
      </div>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  )
}
