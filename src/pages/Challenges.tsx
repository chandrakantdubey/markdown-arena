import { Link } from 'react-router'
import CourseHeader from '../components/CourseHeader'
import { exercises } from '../course/catalog'
import { completedDocuments } from '../course/progress'
const stages: [string, string[]][] = [['Foundations',['headings','text','quotes','lists','code','links','images']],['Extensions and visuals',['tables','tasks','footnotes','disclosures','portability','mermaid','sequence','states','schedules','chart-caption','linked-thumbnail','video-embed']],['Real-world writing',[]]]
export default function Challenges() {
  const done = completedDocuments()
  const assigned = stages.slice(0,2).flatMap(([,ids]) => ids)
  return <><CourseHeader/><main className="template-library"><section className="template-hero"><h1>Practice challenges</h1><p>Complete the starter, review the solution and mark your work complete. Completion is self-assessed, not an automated grade.</p><p>{[...exercises.keys()].filter(id => done.includes('practice/' + id + '.md')).length} / {exercises.size} complete</p></section>{stages.map(([title,ids],index) => <section key={String(title)}><h2>{title}</h2><div className="template-grid">{[...exercises].filter(([id]) => index === 2 ? !assigned.includes(id) : ids.includes(id)).map(([id,item]) => <article key={id} className="template-card"><small>{done.includes('practice/' + id + '.md') ? 'COMPLETE' : 'PRACTICE'}</small><h2>{item.title}</h2><p>{item.brief}</p><Link to={'/arena?topic='+id}>Start challenge →</Link></article>)}</div></section>)}</main></>
}
