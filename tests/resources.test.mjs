import test from 'node:test'
import assert from 'node:assert/strict'
import { resources, snippets, templates } from '../src/course/resources.ts'
import { formats, insertFormat } from '../src/course/format.ts'
test('resources have unique IDs, source and categories', () => {
  assert.ok(snippets.length >= 200)
  assert.ok(templates.length >= 16)
  assert.equal(new Set(resources.map(item => item.id)).size, resources.length)
  assert.equal(new Set(snippets.map(item => item.source)).size, snippets.length)
  for (const item of resources) assert.ok(item.title && item.category && item.source.trim())
})
test('formatting preserves text and returns the inner selection', () => {
  const bold = formats.find(item => item.label === 'Bold')
  assert.deepEqual(insertFormat('hello world',6,11,bold),{value:'hello **world**',start:8,end:13})
  assert.deepEqual(insertFormat('',0,0,bold),{value:'**bold text**',start:2,end:11})
})
