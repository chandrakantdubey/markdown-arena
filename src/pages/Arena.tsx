import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import MarkdownViewer from '../components/MarkdownViewer'
import { chapters, exercises } from '../course/catalog'
import type { Exercise } from '../course/exercise'

interface Props {
  title: string
  documentPath: string
  source: string
  exercise?: Exercise
  topic?: string
}

export default function Arena({ title, documentPath, source, exercise, topic }: Props) {
  const navigate = useNavigate()
  const storageKey = 'markdown-arena:draft:v1:' + documentPath
  const [content, setContent] = useState(() => {
    try { return localStorage.getItem(storageKey) ?? source }
    catch { return source }
  })
  const [saveError, setSaveError] = useState(false)
  const [view, setView] = useState<'source' | 'preview'>(topic === undefined ? 'preview' : 'source')
  const [syncScroll, setSyncScroll] = useState(true)
  const editor = useRef<HTMLTextAreaElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const scrollOwner = useRef<'source' | 'preview'>('source')
  const rendered = useDeferredValue(content)

  useEffect(() => { document.title = title + ' · Markdown Arena' }, [title])

  function edit(value: string) {
    setContent(value)
    try {
      if (value === source) localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, value)
      setSaveError(false)
    } catch { setSaveError(true) }
  }

  function sync(from: 'source' | 'preview') {
    if (!syncScroll || scrollOwner.current !== from || !editor.current || !preview.current) return
    const [a, b] = from === 'source' ? [editor.current, preview.current] : [preview.current, editor.current]
    const distance = a.scrollHeight - a.clientHeight
    if (distance > 0) b.scrollTop = a.scrollTop / distance * (b.scrollHeight - b.clientHeight)
  }

  const chapterIndex = chapters.findIndex(item => documentPath === `lessons/${item.file}.md`)
  const next = chapterIndex >= 0 ? chapters[chapterIndex + 1] : undefined

  return <div className="workbench">
    <header className="masthead">
      <Link className="wordmark" to="/">Markdown Arena</Link>
      <nav aria-label="Course">
        {chapters.map(item => <NavLink key={item.path} to={item.path} end>{item.title}</NavLink>)}
        <NavLink to="/arena">Practice</NavLink>
      </nav>
    </header>
    <main className="workspace">
      <div className="lesson-bar">
        <h1>{title}</h1>
        {topic !== undefined ? <label>Exercise
          <select value={topic} onChange={event => navigate(event.target.value ? '/arena?topic=' + event.target.value : '/arena')}>
            <option value="">Free practice</option>
            {[...exercises].map(([id, item]) => <option key={id} value={id}>{item.title}</option>)}
          </select>
        </label> : <Link to={next?.path ?? '/arena?topic=capstone'}>Next · {next?.title ?? 'Capstone'} →</Link>}
      </div>
      {exercise && <section aria-label="Exercise instructions" className="assignment">
        <p>{exercise.brief}</p>
        <details><summary>Hint, worked solution and self-check</summary>
          <p>{exercise.hint}</p><pre><code>{exercise.solution}</code></pre><p>{exercise.review}</p>
        </details>
      </section>}
      <div className="tools">
        <div className="view-switch" aria-label="Visible pane">
          <button aria-pressed={view === 'source'} onClick={() => setView('source')}>Source</button>
          <button aria-pressed={view === 'preview'} onClick={() => setView('preview')}>Preview</button>
        </div>
        <label className="scroll-setting"><input type="checkbox" checked={syncScroll}
          onChange={event => setSyncScroll(event.target.checked)} /> Sync scrolling</label>
        <span role="status">{saveError ? 'Browser storage unavailable. Copy your draft before leaving.' : content === source ? '' : 'Draft saved on this device'}</span>
        <button disabled={content === source} onClick={() => {
          if (window.confirm('Replace this draft with its original Markdown?')) edit(source)
        }}>Reset draft</button>
      </div>
      <div className="panes" data-view={view}>
        <section className="pane source-pane" aria-label="Source">
          <label className="pane-title" htmlFor="markdown-source">Markdown source</label>
          <textarea id="markdown-source" ref={editor} spellCheck={false} value={content}
            onChange={event => edit(event.target.value)}
            onPointerEnter={() => { scrollOwner.current = 'source' }}
            onFocus={() => { scrollOwner.current = 'source' }}
            onWheel={() => { scrollOwner.current = 'source' }}
            onScroll={() => sync('source')} />
        </section>
        <section className="pane preview-pane" aria-label="Preview">
          <div className="pane-title">Live preview</div>
          <div className="reading" tabIndex={0} ref={preview}
            onPointerEnter={() => { scrollOwner.current = 'preview' }}
            onFocus={() => { scrollOwner.current = 'preview' }}
            onWheel={() => { scrollOwner.current = 'preview' }}
            onScroll={() => sync('preview')}>
            <MarkdownViewer content={rendered} documentPath={documentPath} />
          </div>
        </section>
      </div>
    </main>
  </div>
}
