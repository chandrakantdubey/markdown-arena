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
