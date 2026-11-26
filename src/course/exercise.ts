export interface Exercise {
  title: string
  brief: string
  starter: string
  hint: string
  solution: string
  review: string
}

// Practice files are readable as workbooks on GitHub as well as in the editor.
const format = /^# ([^\n]+)\n\n([\s\S]+?)\n\n## Starter\n\n~~~~markdown\n([\s\S]*?)\n~~~~\n\n## Hint\n\n([\s\S]+?)\n\n## Worked solution\n\n~~~~markdown\n([\s\S]*?)\n~~~~\n\n## Self-check\n\n([\s\S]+)$/

export function parseExercise(source: string, filename: string): Exercise {
  const match = format.exec(source.replace(/\r\n/g, '\n').trimEnd())
  if (!match) throw new Error(`Invalid practice file: ${filename}`)
  const [, title, brief, starter, hint, solution, review] = match
  return { title, brief, starter, hint, solution, review }
}
