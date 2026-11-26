import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { parseExercise } from '../src/course/exercise.ts'

const docs = dir => readdirSync(dir).filter(file => file.endsWith('.md')).map(file => dir + '/' + file)
const chapters = docs('curriculum/lessons')
const workbooks = docs('curriculum/practice')
const read = file => readFileSync(file, 'utf8')
const prose = source => source.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, '').replace(/(`+)([^\n]*?)\1/g, '')

test('each workbook has an editable starter, a distinct solution, guidance and a self-check', () => {
  for (const path of workbooks) {
    const exercise = parseExercise(read(path), path)
    assert.ok(Object.values(exercise).every(value => value.trim()), path)
    assert.notEqual(exercise.starter, exercise.solution, path)
  }
  assert.throws(() => parseExercise('# Incomplete', 'bad.md'), /bad.md/)
})

test('every exercise is discoverable from a chapter and the repository learning path', () => {
  const routeLinks = chapters.map(path => prose(read(path))).join('\n')
  for (const file of workbooks) {
    assert.ok(routeLinks.includes('(' + file.replace('curriculum/', '../') + ')'), file)
    assert.ok(read('README.md').includes('(' + file + ')'), file)
  }
})

test('relative lesson links and image exercise assets resolve from the source file', () => {
  for (const path of [...chapters, 'curriculum/reference.md', 'curriculum/practice/images.md']) {
    const source = path.endsWith('/images.md') ? parseExercise(read(path), path).solution : prose(read(path))
    for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1]
      if (/^(?:https?:|#)/.test(target)) continue
      assert.ok(existsSync(resolve(dirname(path), target)), path + ' → ' + target)
    }
  }
})

test('the capstone model includes the evidence required by its review rubric', () => {
  const { solution } = parseExercise(read('curriculum/practice/capstone.md'), 'capstone')
  for (const evidence of ['# Field Notes', '1. ', '2. ', '```sh', 'Index ready', '| Option |',
    '- [x]', '- [ ]', '```mermaid', '|Yes|', '|No|']) assert.ok(solution.includes(evidence), evidence)
})
