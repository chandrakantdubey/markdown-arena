import { Link, Route, Routes, useSearchParams, useParams } from 'react-router'
import reference from '../curriculum/reference.md?raw'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import Assets from './pages/Assets'
import compatibility from '../curriculum/compatibility.md?raw'
import { resources } from './course/resources'
const TemplateLibrary = lazy(() => import('./pages/TemplateLibrary'))
// resource routes use stable draft keys
import Arena from './pages/Arena'
import { chapters, exercises, freePractice } from './course/catalog'

function Practice({ profile = false }: { profile?: boolean }) {
  const [params] = useSearchParams()
  const id = profile ? 'profile-readme' : params.get('topic')
  const exercise = id ? exercises.get(id) : undefined
  if (id && !exercise) return <MissingPage />
  return <Arena key={id ?? 'notebook'} title={exercise?.title ?? 'Practice notebook'}
    documentPath={`practice/${id ?? 'notebook'}.md`} source={exercise?.starter ?? freePractice}
    exercise={exercise} topic={id ?? ''} />
}

function ResourceEditor() {
  const { id } = useParams()
  const item = resources.find(resource => resource.id === id)
  return item ? <Arena key={item.id} title={item.title} documentPath={'resources/' + item.id + '.md'} source={item.source} /> : <MissingPage />
}
function MissingPage() {
  return <main className="missing"><h1>Page unavailable</h1>
    <p>This course link has no matching lesson or exercise.</p>
    <Link to="/">Open the course</Link> · <Link to="/arena">Open practice</Link></main>
}

export default function App() {
  return <Suspense fallback={<p role="status">Loading workspace…</p>}><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/challenges" element={<Challenges />} />
    <Route path="/assets" element={<Assets />} />
    <Route path="/compatibility" element={<Arena title="Markdown compatibility" documentPath="compatibility.md" source={compatibility} />} />
    <Route path="/snippets" element={<TemplateLibrary key="snippets" snippetMode />} />
    <Route path="/editor/:id" element={<ResourceEditor />} />
    {chapters.map(chapter => <Route key={chapter.path} path={chapter.path} element={
      <Arena key={chapter.file} title={chapter.title} documentPath={`lessons/${chapter.file}.md`}
        source={chapter.source} />
    } />)}
    <Route path="/templates" element={<TemplateLibrary key="templates" />} />
    <Route path="/profile" element={<Practice profile />} />
    <Route path="/reference" element={<Arena title="Syntax reference" documentPath="reference.md" source={reference} />} />
    <Route path="/arena" element={<Practice />} />
    <Route path="*" element={<MissingPage />} />
  </Routes></Suspense>
}
