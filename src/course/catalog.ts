import intro from '../../curriculum/lessons/introduction.md?raw'
import core from '../../curriculum/lessons/core.md?raw'
import advanced from '../../curriculum/lessons/advanced.md?raw'
import visuals from '../../curriculum/lessons/visuals.md?raw'
import imageUrl from '../../curriculum/media/release-checks.png'
import { parseExercise } from './exercise'

export const chapters = [
  { path: '/', file: 'introduction', title: 'Start here', source: intro },
  { path: '/core', file: 'core', title: 'Core Markdown', source: core },
  { path: '/advanced', file: 'advanced', title: 'Extensions and media', source: advanced },
  { path: '/visuals', file: 'visuals', title: 'Diagrams', source: visuals },
]

const files = import.meta.glob<string>('../../curriculum/practice/*.md', {
  eager: true, query: '?raw', import: 'default',
})
export const exercises = new Map(Object.entries(files).map(([path, source]) => {
  const id = path.slice(path.lastIndexOf('/') + 1, -3)
  return [id, parseExercise(source, path)]
}))

export const freePractice = '# My Markdown notebook\n\nTry a heading, a list, or a code block.\n'

export function courseLink(value: string, documentPath: string) {
  // Only translate relative workbook destinations. Keep ordinary authored URLs intact.
  if (!value || /^[a-z][a-z\d+.-]*:|^[#/?]/i.test(value)) return value
  const url = new URL(value, 'https://course.invalid/' + documentPath)
  const chapter = chapters.find(item => url.pathname === `/lessons/${item.file}.md`)
  if (chapter) return chapter.path + url.search + url.hash
  const practice = /^\/practice\/([a-z-]+)\.md$/.exec(url.pathname)
  if (practice && exercises.has(practice[1])) return '/arena?topic=' + practice[1] + url.hash
  if (url.pathname === '/media/release-checks.png') return imageUrl
  return value
}
