import assert from 'node:assert/strict'
import { after,before,test } from 'node:test'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
let server,browser,origin
before(async()=>{server=await preview({preview:{host:'127.0.0.1',port:0},logLevel:'error'});origin='http://127.0.0.1:'+server.httpServer.address().port;browser=await chromium.launch(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'chrome'})})
after(async()=>{await browser?.close();if(server)await new Promise(resolve=>server.httpServer.close(resolve))})
test('mobile resource search, editor, theme and learning progress',async()=>{
 const page=await browser.newPage({viewport:{width:390,height:844}})
 try {
  await page.goto(origin+'/')
  await page.getByRole('heading',{name:'Write better. Build with Markdown.'}).waitFor()
  await page.getByLabel('Theme',{exact:true}).selectOption('dark')
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark')
  await page.goto(origin+'/snippets')
  await page.getByLabel('Search snippets').fill('Bold and italic')
  await page.getByRole('link',{name:'Edit in playground'}).click()
  const editor=page.getByLabel('Markdown source')
  await page.getByRole('button',{name:'Source',exact:true}).click()
  await editor.fill('word')
  await editor.selectText()
  await editor.press('Control+b')
  assert.equal(await editor.inputValue(),'**word**')
  await page.reload()
  assert.equal(await editor.inputValue(),'**word**')
  await page.goto(origin+'/learn')
  await page.getByRole('button',{name:'Mark complete'}).click()
  await page.goto(origin+'/')
  await page.getByText(/1 of .* lessons complete/).waitFor()
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)
 } finally {await page.close()}
})
test('library bounds rendered cards and all downloadable assets return successfully',async()=>{
 const page=await browser.newPage()
 try {
  await page.goto(origin+'/snippets')
  await page.getByRole('button',{name:'Show 24 more'}).waitFor()
  assert.equal(await page.locator('.template-card').count(),24)
  await page.goto(origin+'/assets')
  for(const link of await page.locator('a[download]').all()) assert.ok((await page.request.get(new URL(await link.getAttribute('href'),origin).href)).ok())
 } finally {await page.close()}
})
