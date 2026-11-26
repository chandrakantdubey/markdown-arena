import { useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { chapters, exercises } from '../course/catalog'

const groups = [
  { title: 'Lessons', items: chapters.map(chapter => ({ label: chapter.title, to: chapter.path })) },
  { title: 'Writing tools', items: [
    { label: 'Profile builder', to: '/profile' }, { label: 'Practice notebook', to: '/arena' },
    { label: 'Syntax reference', to: '/reference' },
  ] },
  { title: 'Exercises', items: Array.from(exercises, ([id, exercise]) => ({
    label: exercise.title, to: '/arena?topic=' + id,
  })) },
]

export default function CourseHeader() {
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const { pathname, search } = useLocation()
  const words = query.trim().toLowerCase().split(/\s+/)
  const matches = groups.map(group => ({ ...group, items: group.items.filter(item =>
    words.every(word => (item.label + ' ' + group.title + ' ' + item.to).toLowerCase().includes(word))) }))

  return <header className="course-header">
    <Link className="course-brand" to="/"><span aria-hidden="true">M↓</span>Markdown Arena</Link>
    <nav aria-label="Course shortcuts">
      <NavLink to="/use-cases">Use cases</NavLink>
      <NavLink to="/arena">Practice</NavLink>
      <NavLink to="/reference">Reference</NavLink>
    </nav>
    <button ref={trigger} className="browse-button" aria-haspopup="dialog" onClick={() => {
      setQuery('')
      dialog.current?.showModal()
    }}>Browse course</button>
    <dialog ref={dialog} onClose={() => trigger.current?.focus()} onKeyDown={event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dialog.current?.close()
        trigger.current?.focus()
      }
    }} className="course-directory" aria-labelledby="directory-title">
      <div className="directory-head"><h2 id="directory-title">Browse course</h2>
        <button onClick={() => dialog.current?.close()}>Close</button></div>
      <label htmlFor="directory-query">Find a lesson, tool or exercise</label>
      <input autoFocus type="search" id="directory-query" value={query} placeholder="Try runbook or diagrams"
        onChange={event => setQuery(event.target.value)} />
      <nav aria-label="Course directory">{matches.map(group => group.items.length > 0 &&
        <section key={group.title}><h3>{group.title}</h3>{group.items.map(item =>
          <Link key={item.to} to={item.to} aria-current={pathname + search === item.to ? 'page' : undefined}
            onClick={() => dialog.current?.close()}>{item.label}</Link>)}</section>)}
        {matches.every(group => !group.items.length) && <p role="status">No matches. Try a different word.</p>}
      </nav>
    </dialog>
  </header>
}
