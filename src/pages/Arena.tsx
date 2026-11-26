import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import CourseHeader from '../components/CourseHeader'
import ProfileBuilder from '../components/ProfileBuilder'
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
  const [copyStatus, setCopyStatus] = useState('')
  async function copyMarkdown(value: string) {
    try { await navigator.clipboard.writeText(value); setCopyStatus('Copied Markdown') }
    catch { setCopyStatus('Clipboard unavailable; select and copy the source manually.') }
  }
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

  function downloadReadme() {
    const href = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = href
    link.download = topic === 'profile-readme' ? 'README.md' : documentPath.split('/').pop() ?? 'notes.md'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(href), 1000)
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
    <CourseHeader />
    <main className="workspace">
      <div className="lesson-bar">
        <h1>{title}</h1>
        {topic !== undefined ? <div className="exercise-picker"><label htmlFor="exercise-picker">Exercise</label>
          <select id="exercise-picker" value={topic} onChange={event => navigate(event.target.value ? '/arena?topic=' + event.target.value : '/arena')}>
            <option value="">Free practice</option>
            {[...exercises].map(([id, item]) => <option key={id} value={id}>{item.title}</option>)}
          </select>
        </div> : chapterIndex >= 0 && <Link to={next?.path ?? '/arena?topic=capstone'}>Next · {next?.title ?? 'Capstone'} →</Link>}
      </div>
      {exercise && <section aria-label="Exercise instructions" className="assignment">
        <p>{exercise.brief}</p>
        {topic === 'profile-readme' && <ProfileBuilder onApply={sourceText => {
          if (content !== source && !window.confirm('Replace your current README draft with the generated version?')) return false
          edit(sourceText)
          setView('preview')
          return true
        }} />}
        <details><summary>Hint, worked solution and self-check</summary>
          <p>{exercise.hint}</p><button onClick={() => void copyMarkdown(exercise.solution)}>Copy worked solution</button><pre><code>{exercise.solution}</code></pre><p>{exercise.review}</p>
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
        <button onClick={() => void copyMarkdown(content)}>Copy Markdown</button>
        <button onClick={downloadReadme}>{topic === 'profile-readme' ? 'Download README.md' : 'Download .md'}</button>
        <span aria-live="polite">{copyStatus}</span>
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
