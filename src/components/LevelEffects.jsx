import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import './LevelEffects.css'

const NOTIFICATIONS = [
  'A recruiter at a company with no website viewed your profile.',
  '47 people you’ve never met endorsed you for Synergy.',
  'You appeared in 9,214 searches this week. Probably.',
  'Your post is trending in Leadership (Personal).',
  'Someone from Stealth wants to “pick your brain.”',
  'You’re a Top Voice in 1 skill you don’t have.',
]

const ROCKETS = [
  { left: '6%', delay: '0s', dur: '14s', size: '22px' },
  { left: '28%', delay: '5s', dur: '17s', size: '16px' },
  { left: '71%', delay: '2.5s', dur: '15s', size: '20px' },
  { left: '92%', delay: '8s', dur: '19s', size: '18px' },
]

// Level 5 only: ambient rockets and fake engagement notifications.
export default function LevelEffects({ level }) {
  const [note, setNote] = useState(null)

  useEffect(() => {
    if (level !== 5) {
      setNote(null)
      return
    }
    let i = Math.floor(Math.random() * NOTIFICATIONS.length)
    let hideTimer
    const show = () => {
      setNote({ id: Date.now(), text: NOTIFICATIONS[i++ % NOTIFICATIONS.length] })
      hideTimer = setTimeout(() => setNote(null), 4200)
    }
    const first = setTimeout(show, 1200)
    const interval = setInterval(show, 7000)
    return () => {
      clearTimeout(first)
      clearTimeout(hideTimer)
      clearInterval(interval)
    }
  }, [level])

  if (level !== 5) return null

  return (
    <>
      <div className="rockets" aria-hidden="true">
        {ROCKETS.map((r, idx) => (
          <span
            key={idx}
            className="rocket"
            style={{ left: r.left, animationDelay: r.delay, animationDuration: r.dur, fontSize: r.size }}
          >
            🚀
          </span>
        ))}
      </div>

      {note && (
        <div className="notification" role="status" key={note.id}>
          <span className="notification__icon" aria-hidden="true">
            <Bell size={14} />
          </span>
          <span>{note.text}</span>
        </div>
      )}
    </>
  )
}
