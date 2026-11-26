import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

let server, browser, origin
before(async () => {
  server = await preview({ preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' })
  origin = 'http://127.0.0.1:' + server.httpServer.address().port
  browser = await chromium.launch(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
})
after(async () => {
  await browser?.close()
  if (server) await new Promise(resolve => server.httpServer.close(resolve))
})

test('a linked exercise retains its draft across navigation and reload; reset restores its starter', async () => {
  const page = await browser.newPage()
  try {
    await page.goto(origin + '/core')
    await page.getByRole('link', { name: 'Repair a nested procedure' }).click()
    const editor = page.getByLabel('Markdown source')
    const starter = await editor.inputValue()
    await editor.fill('# My draft')
    await page.getByRole('heading', { name: 'My draft' }).waitFor()
    await page.getByLabel('Exercise', { exact: true }).selectOption('tables')
    assert.notEqual(await editor.inputValue(), '# My draft')
    await page.goBack()
    await page.reload()
    assert.equal(await editor.inputValue(), '# My draft')
    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Reset draft' }).click()
    assert.equal(await editor.inputValue(), starter)
  } finally { await page.close() }
})

test('mobile preview renders footnote targets, tables, safe HTML and diagram recovery', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  try {
    await page.goto(origin + '/arena')
    const editor = page.getByLabel('Markdown source')
    await editor.fill('Measured.[^n]\n\n[^n]: Method.\n\n| Team | Count |\n| --- | ---: |\n| Docs | 2 |\n\n<details><summary>Log</summary>Passed</details>\n\n<script>unused()</script>')
    await page.getByRole('button', { name: 'Preview', exact: true }).click()
    const article = page.locator('article')
    await article.getByRole('table').waitFor()
    assert.equal(await article.locator('script').count(), 0)
    await article.getByText('Log', { exact: true }).click()
    assert.equal(await article.locator('details').getAttribute('open'), '')
    for (const link of await article.locator('a[href^="#"]').all()) {
      const hash = await link.getAttribute('href')
      assert.ok(await page.evaluate(id => !!document.getElementById(id), hash.slice(1)), hash)
    }
    await page.getByRole('button', { name: 'Source', exact: true }).click()
    await editor.fill('```mermaid\nunknown diagram\n```')
    await page.getByRole('button', { name: 'Preview', exact: true }).click()
    await article.getByText(/Could not draw/).waitFor()
    await page.getByRole('button', { name: 'Source', exact: true }).click()
    await editor.fill('```mermaid\nflowchart TD\n A --> B\n```')
    await page.getByRole('button', { name: 'Preview', exact: true }).click()
    await article.getByRole('img', { name: /Mermaid diagram/ }).waitFor()
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true)
  } finally { await page.close() }
})

test('the published lessons draw all four diagram types and serve the image workbook asset', async () => {
  const page = await browser.newPage()
  try {
    await page.goto(origin + '/visuals')
    const diagrams = page.locator('article figure img')
    await diagrams.nth(3).waitFor()
    assert.equal(await diagrams.count(), 4)
    await page.goto(origin + '/arena?topic=images')
    const image = page.locator('article img')
    await image.waitFor()
    await image.evaluate(element => element.decode())
    assert.ok(await image.evaluate(element => element.naturalWidth > 0))
  } finally { await page.close() }
})

test('a learner builds, edits, saves and exports a GitHub profile README', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  try {
    await page.goto(origin + '/use-cases')
    await page.getByRole('link', { name: 'Build a profile README', exact: true }).click()
    await page.getByRole('button', { name: 'Build from my details' }).click()
    await page.getByLabel('Display name').fill('Mira [Docs]')
    await page.getByLabel('One-line introduction').fill('I build documentation tools.')
    await page.getByLabel('Featured project').fill('Example manual')
    await page.getByRole('button', { name: 'Generate README' }).click()
    await page.getByRole('alert').waitFor()
    await page.getByLabel('Project link').fill('https://example.org/manual')
    await page.getByLabel('Tools I use').fill('Git, TypeScript')
    await page.getByRole('button', { name: 'Generate README' }).click()
    await page.locator('article').getByRole('heading', { name: 'Mira [Docs]', exact: true }).waitFor()
    assert.equal(await page.locator('article').getByRole('link', { name: 'Example manual' }).getAttribute('href'), 'https://example.org/manual')
    await page.getByRole('button', { name: 'Source', exact: true }).click()
    const editor = page.getByLabel('Markdown source')
    const revised = (await editor.inputValue()) + '\nA final edit.'
    await editor.fill(revised)
    await page.reload()
    assert.equal(await editor.inputValue(), revised)
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download README.md' }).click()
    const file = await downloadPromise
    assert.equal(file.suggestedFilename(), 'README.md')
    const chunks = []
    for await (const chunk of await file.createReadStream()) chunks.push(chunk)
    assert.equal(Buffer.concat(chunks).toString(), revised)
  } finally { await page.close() }
})

test('media examples play locally, survive HTML removal and expose the original PDF', async () => {
  const page = await browser.newPage()
  try {
    await page.goto(origin + '/media')
    const article = page.locator('article')
    for (const image of await article.locator('img').all()) {
      await image.evaluate(img => img.decode())
    }
    const video = article.locator('video')
    await video.waitFor()
    await video.evaluate(async player => { await player.play(); player.pause() })
    assert.equal(await video.evaluate(player => Math.round(player.duration)), 5)
    const transcript = await article.getByRole('link', { name: 'Read the descriptive transcript' }).getAttribute('href')
    const response = await page.request.get(new URL(transcript, origin).href)
    assert.match(await response.text(), /Minute 4: 0 jobs waiting/)
    await page.getByLabel('Markdown source').fill('<video src="https://example.org/unbundled.webm"></video>\n\n[Transcript](../media/queue-recovery.txt)')
    await article.getByText(/For an external video/).waitFor()
    assert.equal(await article.locator('video').count(), 0)
    await article.getByRole('link', { name: 'Transcript' }).waitFor()
    await page.getByRole('link', { name: 'Reference', exact: true }).click()
    const pdf = await article.getByRole('link', { name: 'original PDF' }).getAttribute('href')
    const archived = await page.request.get(new URL(pdf, origin).href)
    assert.equal((await archived.body()).subarray(0, 5).toString(), '%PDF-')
  } finally { await page.close() }
})

test('mobile course directory supports filtering, keyboard dismissal and direct exercise navigation', async () => {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } })
  try {
    await page.goto(origin + '/')
    const browse = page.getByRole('button', { name: 'Browse course' })
    await browse.click()
    const search = page.getByLabel('Find a lesson, tool or exercise')
    await search.fill('no-such-topic')
    await page.getByText('No matches.', { exact: false }).waitFor()
    await page.keyboard.press('Escape')
    await page.getByRole('dialog').waitFor({ state: 'hidden' })
    assert.equal(await browse.evaluate(button => document.activeElement === button), true)
    await browse.click()
    await search.fill('paginated')
    await page.getByRole('link', { name: 'Document a paginated API' }).click()
    await page.getByRole('heading', { name: 'Document a paginated API' }).waitFor()
    assert.match(page.url(), /topic=api-guide/)
    assert.equal(await page.getByRole('dialog').count(), 0)
  } finally { await page.close() }
})
