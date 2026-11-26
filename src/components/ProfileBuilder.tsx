import { useState } from 'react'
import type { FormEvent } from 'react'

// Form fields are plain text. Learners can add their own markup in the source editor.
function literal(value: string) {
  return value.trim().replace(/[\\`*_{}[\]()<>#+.!|~&-]/g, '\\$&')
}

function destination(value: string) {
  if (!value) return ''
  const url = new URL(value)
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error()
  return '<' + url.href.replace(/[<>]/g, encodeURIComponent) + '>'
}

export default function ProfileBuilder({ onApply }: { onApply: (source: string) => boolean }) {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const field = (name: string) => String(fields.get(name) ?? '').trim()
    const name = literal(field('name'))
    const bio = literal(field('bio'))
    if (!name || !bio) return setError('Enter a display name and a one-line introduction.')
    if (Boolean(field('project')) !== Boolean(field('url'))) {
      return setError('Include both the project title and its link, or clear both fields.')
    }
    if (Boolean(field('image')) !== Boolean(field('alt'))) {
      return setError('Include both the image link and a description, or clear both fields.')
    }
    let url: string, image: string
    try {
      url = destination(field('url'))
      image = destination(field('image'))
    } catch { return setError('Use a full HTTP or HTTPS address without embedded account credentials.') }

    const sections = ['# ' + name, bio]
    if (image) sections.push('![' + literal(field('alt')) + '](' + image + ')')
    if (url) sections.push('## Featured project', '[' + literal(field('project')) + '](' + url + ')')
    const skills = field('skills').split(',').map(literal).filter(Boolean)
    if (skills.length) sections.push('## Tools I use', skills.map(skill => '- ' + skill).join('\n'))
    if (field('learning')) sections.push('## Currently learning', literal(field('learning')))
    setError('')
    if (onApply(sections.join('\n\n') + '\n')) setOpen(false)
  }

  return <div className="profile-builder">
    <button aria-expanded={open} aria-controls="profile-fields" onClick={() => setOpen(!open)}>
      {open ? 'Close profile form' : 'Build from my details'}
    </button>
    <form id="profile-fields" hidden={!open} onSubmit={generate}>
      <label>Display name<input name="name" required placeholder="Mira Shah" /></label>
      <label>One-line introduction<input name="bio" required placeholder="I build tools for documentation teams." /></label>
      <label>Featured project<input name="project" placeholder="Project title (optional)" /></label>
      <label>Project link<input name="url" type="url" placeholder="https://github.com/owner/project" /></label>
      <label>Tools I use<input name="skills" placeholder="TypeScript, Git, Python" /></label>
      <label>Currently learning<input name="learning" placeholder="What are you exploring?" /></label>
      <label>Image URL<input name="image" type="url" placeholder="https://… (optional)" /></label>
      <label>Image description<input name="alt" placeholder="What does the image show?" /></label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Generate README</button>
    </form>
  </div>
}
