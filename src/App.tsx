import { Link, Route, Routes, useSearchParams } from 'react-router'
import reference from '../curriculum/reference.md?raw'
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

function MissingPage() {
  return <main className="missing"><h1>Page unavailable</h1>
    <p>This course link has no matching lesson or exercise.</p>
    <Link to="/">Open the course</Link> · <Link to="/arena">Open practice</Link></main>
}

export default function App() {
  return <Routes>
    {chapters.map(chapter => <Route key={chapter.path} path={chapter.path} element={
      <Arena key={chapter.file} title={chapter.title} documentPath={`lessons/${chapter.file}.md`}
        source={chapter.source} />
    } />)}
    <Route path="/profile" element={<Practice profile />} />
    <Route path="/reference" element={<Arena title="Syntax reference" documentPath="reference.md" source={reference} />} />
    <Route path="/arena" element={<Practice />} />
    <Route path="*" element={<MissingPage />} />
  </Routes>
}
