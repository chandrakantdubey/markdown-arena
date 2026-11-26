import { useState } from 'react'
import { Link } from 'react-router'
import CourseHeader from '../components/CourseHeader'
import { snippets, templates } from '../course/resources'
export default function TemplateLibrary({ snippetMode = false }: { snippetMode?: boolean }) {
  const items = snippetMode ? snippets : templates
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState(24)
  const categories = ['All', ...new Set(items.map(item => item.category))]
  const filtered = items.filter(item => (category === 'All' || item.category === category) && (item.title + ' ' + item.category + ' ' + item.source).toLowerCase().includes(query.toLowerCase().trim()))
  async function copy(title: string, source: string) {
    try { await navigator.clipboard.writeText(source); setStatus('Copied ' + title) }
    catch { setStatus('Clipboard unavailable. Expand the source and copy manually.') }
  }
  function download(title: string, source: string) {
    const href = URL.createObjectURL(new Blob([source], { type: 'text/markdown;charset=utf-8' }))
    const a = document.createElement('a'); a.href = href; a.download = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md'; a.click()
    window.setTimeout(() => URL.revokeObjectURL(href), 1000)
  }
  return <><CourseHeader /><main className="template-library"><section className="template-hero"><small>MARKDOWN ARENA / RESOURCE LIBRARY</small><h1>{snippetMode ? 'Find your next Markdown snippet.' : 'Start with a great template.'}</h1><p>Copy, edit in the playground, or download. Replace placeholders and check your target renderer before publishing.</p><Link to={snippetMode ? '/templates' : '/snippets'}>{snippetMode ? 'Browse complete templates' : 'Browse individual snippets'}</Link></section><div className="template-filter"><label>Search {snippetMode ? 'snippets' : 'templates'}<input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(24) }} placeholder="Try README, API, incident..." /></label><label>Category<select value={category} onChange={e => { setCategory(e.target.value); setLimit(24) }}>{categories.map(group => <option key={group}>{group}</option>)}</select></label></div><p role="status">{filtered.length} results. {status}</p><div className="template-grid">{filtered.slice(0, limit).map(({id,title,category: group,source}) => <article className="template-card" key={id}><small>{group}</small><h2>{title}</h2><details><summary>View Markdown source</summary><pre>{source}</pre></details><div className="template-actions"><button onClick={() => void copy(title, source)}>Copy Markdown</button><Link className="action-link" to={'/editor/' + id}>Edit in playground</Link><button onClick={() => download(title, source)}>Download .md</button></div></article>)}</div>{limit < filtered.length && <button className="load-more" onClick={() => setLimit(n => n + 24)}>Show 24 more</button>}{!filtered.length && <p>No matching resources. Try another search or category.</p>}</main></>
}
