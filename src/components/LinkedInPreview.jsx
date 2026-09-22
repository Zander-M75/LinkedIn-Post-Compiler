import { useState } from 'react'
import { BadgeCheck, Globe, MessageSquare, MoreHorizontal, Repeat2, Send, ThumbsUp } from 'lucide-react'
import HighlightedText from './HighlightedText.jsx'
import './LinkedInPreview.css'

const fmt = (n) => n.toLocaleString('en-US')
const COLLAPSED_LINES = 6

const COMMENTS = {
  4: {
    initial: 'R',
    name: 'Recruiter (hiring)',
    title: 'Talent Partner · Building the future of building',
    text: 'Love this! Are you open to a quick 15-minute chat about an exciting unpaid opportunity?',
  },
  5: {
    initial: 'C',
    name: 'CEO somewhere',
    title: 'Chief Executive Officer · Company',
    text: 'Powerful perspective. Thanks for sharing.',
  },
}

export default function LinkedInPreview({ result }) {
  const [expanded, setExpanded] = useState(false)
  const lines = result.text.split('\n')
  const long = lines.length > COLLAPSED_LINES
  const visible = expanded || !long ? lines : lines.slice(0, COLLAPSED_LINES)
  const { reactions, comments, reposts } = result.engagement
  const comment = COMMENTS[result.level]

  return (
    <div className="li-stage">
      <article className="li-post">
        <header className="li-post__head">
          <div className="li-avatar" aria-hidden="true">Y</div>
          <div className="li-post__who">
            <div className="li-post__name">
              You
              {result.level === 5 && <BadgeCheck size={15} className="li-post__verified" aria-label="Verified" />}
            </div>
            <div className="li-post__sub">Thought Leader · 1st</div>
            <div className="li-post__sub">
              Just now · <Globe size={11} aria-label="Public" />
            </div>
          </div>
          <button type="button" className="li-post__follow">+ Follow</button>
          <MoreHorizontal size={18} className="li-post__more" aria-hidden="true" />
        </header>

        <div className="li-post__body">
          {visible.map((line, i) =>
            line ? (
              <p key={i}>
                <HighlightedText text={line} />
              </p>
            ) : (
              <br key={i} />
            ),
          )}
          {long && (
            <button type="button" className="li-post__see-more" onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'show less' : '…see more'}
            </button>
          )}
        </div>

        <div className="li-post__stats">
          <span className="li-post__reactions">
            <span className="li-post__emoji" aria-hidden="true">👍</span>
            <span className="li-post__emoji" aria-hidden="true">💡</span>
            <span className="li-post__emoji" aria-hidden="true">❤️</span>
            <span className="li-post__count">{fmt(reactions)}</span>
          </span>
          <span>
            {fmt(comments)} comments · {fmt(reposts)} reposts
          </span>
        </div>

        <div className="li-post__actions">
          <button type="button"><ThumbsUp size={17} aria-hidden="true" />Like</button>
          <button type="button"><MessageSquare size={17} aria-hidden="true" />Comment</button>
          <button type="button"><Repeat2 size={17} aria-hidden="true" />Repost</button>
          <button type="button"><Send size={17} aria-hidden="true" />Send</button>
        </div>

        {comment && (
          <div className="li-comment">
            <div className="li-avatar li-avatar--sm" aria-hidden="true">{comment.initial}</div>
            <div className="li-comment__bubble">
              <div className="li-post__name">{comment.name}</div>
              <div className="li-post__sub">{comment.title}</div>
              <p>{comment.text}</p>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
