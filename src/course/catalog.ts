import intro from '../../curriculum/lessons/introduction.md?raw'
import core from '../../curriculum/lessons/core.md?raw'
import advanced from '../../curriculum/lessons/advanced.md?raw'
import visuals from '../../curriculum/lessons/visuals.md?raw'
import applications from '../../curriculum/lessons/applications.md?raw'
import media from '../../curriculum/lessons/media.md?raw'
import pdfUrl from '../../docs/archive/Light.pdf?url'
import { parseExercise } from './exercise'

export const chapters = [
  { path: '/learn', file: 'introduction', title: 'Start here', source: intro },
  { path: '/core', file: 'core', title: 'Core Markdown', source: core },
  { path: '/advanced', file: 'advanced', title: 'Extensions and media', source: advanced },
  { path: '/visuals', file: 'visuals', title: 'Diagrams', source: visuals },
  { path: '/use-cases', file: 'applications', title: 'Use cases', source: applications },
  { path: '/media', file: 'media', title: 'Media lab', source: media },
]

const mediaFiles = import.meta.glob<string>('../../curriculum/media/*.{png,jpg,webp,webm,txt}', {
  eager: true, query: '?url&no-inline', import: 'default',
})

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
  const base = 'https://course.invalid/' + documentPath
  if (!URL.canParse(value, base)) return value
  const url = new URL(value, base)
  if (url.origin !== new URL(base).origin) return value
  if (url.pathname === '/reference.md') return '/reference' + url.hash
  if (url.pathname === '/docs/archive/Light.pdf') return pdfUrl
  if (url.pathname === '/practice/profile-readme.md') return '/profile'
  const chapter = chapters.find(item => url.pathname === `/lessons/${item.file}.md`)
  if (chapter) return chapter.path + url.search + url.hash
  const practice = /^\/practice\/([a-z-]+)\.md$/.exec(url.pathname)
  if (practice && exercises.has(practice[1])) return '/arena?topic=' + practice[1] + url.hash
  return mediaFiles['../../curriculum' + url.pathname] ?? value
}

export function bundledVideo(src: string, documentPath: string) {
  const url = courseLink(src, documentPath)
  return url !== src && url.endsWith('.webm') && Object.values(mediaFiles).includes(url) ? url : undefined
}
