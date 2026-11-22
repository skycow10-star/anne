import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    ctx=await b.new_context(service_workers="allow"); pg=await ctx.new_page(); errs=[]
    pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/"); await pg.wait_for_timeout(1200)
    await pg.click("#btnStart"); await pg.wait_for_timeout(2500)
    print("ch1:", await pg.evaluate("window.__anne.bgm()"))
    await pg.evaluate("window.__anne.start(1, null)"); await pg.wait_for_timeout(3000)
    print("ch2:", await pg.evaluate("window.__anne.bgm()"))
    await pg.evaluate("window.__anne.start(2, null)"); await pg.wait_for_timeout(1500)
    await pg.evaluate("window.__anne.start(4, null)"); await pg.wait_for_timeout(2500)
    print("ch5:", await pg.evaluate("window.__anne.bgm()"), errs)
    await b.close()
asyncio.run(main())
