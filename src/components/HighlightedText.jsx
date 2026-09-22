import { BUZZWORD_REGEX, lookupBuzzword } from '../lib/buzzwords.js'

const TOKEN = new RegExp(`${BUZZWORD_REGEX.source}|(#\\w+)`, 'gi')

// Renders a line of text with buzzwords highlighted (with tooltips) and hashtags styled.
export default function HighlightedText({ text }) {
  const parts = []
  let last = 0

  for (const match of text.matchAll(TOKEN)) {
    const [word, buzz, tag] = match
    if (match.index > last) parts.push(text.slice(last, match.index))

    if (tag) {
      parts.push(<span key={match.index} className="hashtag">{tag}</span>)
    } else if (buzz) {
      const entry = lookupBuzzword(word)
      parts.push(
        <mark key={match.index} className="buzz" tabIndex={0} data-tip={entry?.tip} aria-label={`${word}: ${entry?.tip}`}>
          {word}
        </mark>,
      )
    }
    last = match.index + word.length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts
}
