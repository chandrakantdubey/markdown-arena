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
  const [projectIds, setProjectIds] = useState<number[]>([])
  const [nextId, setNextId] = useState(1)
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
    let url: string, image: string, website: string, contact: string
    try {
      url = destination(field('url'))
      image = destination(field('image'))
      website = destination(field('website'))
      contact = destination(field('contact'))
    } catch { return setError('Use a full HTTP or HTTPS address without embedded account credentials.') }

    const moreProjects: string[] = []
    try { for (const id of projectIds) { const title = field('project-' + id), link = field('url-' + id), description = field('description-' + id); if (!title && !link && !description) continue; if (!title || !link) return setError('Each additional project needs a title and URL.'); moreProjects.push('- [' + literal(title) + '](' + destination(link) + ')' + (description ? ' — ' + literal(description) : '')) } } catch { return setError('Use valid HTTP or HTTPS project links.') }
    const sections = ['# ' + (field('style') === 'friendly' ? 'Hello, I’m ' : '') + name, bio]
    if (field('focus')) sections.push('## What I do', literal(field('focus')))
    if (image && fields.has('include-image')) sections.unshift('![' + literal(field('alt')) + '](' + image + ')')
    if (fields.has('include-projects') && (url || moreProjects.length)) sections.push('## Featured projects', [url && '[' + literal(field('project')) + '](' + url + ')', ...moreProjects].filter(Boolean).join('\n\n'))
    const skills = field('skills').split(',').map(literal).filter(Boolean)
    if (skills.length && fields.has('include-skills')) sections.push('## Tools I use', fields.has('badges') ? field('skills').split(',').map(s => s.trim()).filter(Boolean).map(s => '![' + literal(s) + '](https://img.shields.io/badge/' + encodeURIComponent(s.replaceAll('-', '--').replaceAll('_', '__')) + '-technology-24584e)').join(' ') : skills.map(skill => '- ' + skill).join('\n'))
    if (field('collaboration')) sections.push('## Open to collaboration', literal(field('collaboration')))
    if (website || contact) sections.push('## Find me', [website && '- [Portfolio](' + website + ')', contact && '- [Contact](' + contact + ')'].filter(Boolean).join('\n'))
    if (field('learning') && fields.has('include-learning')) sections.push('## Currently learning', literal(field('learning')))
    setError('')
    if (onApply(sections.join('\n\n') + '\n')) setOpen(false)
  }

  return <div className="profile-builder">
    <button aria-expanded={open} aria-controls="profile-fields" onClick={() => setOpen(!open)}>
      {open ? 'Close profile form' : 'Build from my details'}
    </button>
    <form id="profile-fields" hidden={!open} onSubmit={generate}>
      <label>Profile style<select name="style"><option value="minimal">Minimal / professional</option><option value="friendly">Friendly introduction</option></select></label>
      <label>Display name<input name="name" required placeholder="Mira Shah" /></label>
      <label>One-line introduction<input name="bio" required placeholder="I build tools for documentation teams." /></label>
      <label>Professional focus<input name="focus" placeholder="What problems do you solve?" /></label>
      <label>Featured project<input name="project" placeholder="Project title (optional)" /></label>
      <label>Project link<input name="url" type="url" placeholder="https://github.com/owner/project" /></label>
      {projectIds.map((id,index) => <fieldset className="project-fields" key={id}><legend>Additional project {index+1}</legend><label>Project title<input name={'project-'+id} /></label><label>Project URL<input name={'url-'+id} type="url" /></label><label>Contribution or outcome<input name={'description-'+id} /></label><button type="button" onClick={() => setProjectIds(ids => ids.filter(item => item !== id))}>Remove project</button></fieldset>)}
      <button type="button" onClick={() => { setProjectIds(ids => [...ids,nextId]); setNextId(id => id+1) }}>Add another project</button>
      <label>Tools I use<input name="skills" placeholder="TypeScript, Git, Python" /></label>
      <label>Currently learning<input name="learning" placeholder="What are you exploring?" /></label>
      <label>Open to collaboration<input name="collaboration" placeholder="Projects or communities (optional)" /></label>
      <label>Portfolio URL<input name="website" type="url" placeholder="https://example.com" /></label>
      <label>Contact or social URL<input name="contact" type="url" placeholder="https://github.com/username" /></label>
      <label>Image URL<input name="image" type="url" placeholder="https://… (optional)" /></label>
      <label>Image description<input name="alt" placeholder="What does the image show?" /></label>
      <fieldset className="project-fields"><legend>Customize sections</legend>{[['include-image','Show banner / image'],['include-projects','Show projects'],['include-skills','Show skills'],['include-learning','Show learning']].map(([name,label]) => <label className="check-option" key={name}><input type="checkbox" name={name} defaultChecked />{label}</label>)}<label className="check-option"><input type="checkbox" name="badges" />Use third-party technology badges</label><p>Badges load from Shields.io; plain text skills are the most portable option. Use a hosted HTTPS image as your banner.</p></fieldset>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Generate README</button>
    </form>
  </div>
}
