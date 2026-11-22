import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME); pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.click("#coverSwitch"); await pg.wait_for_timeout(2000)
    print(pg.url, await pg.evaluate("document.title"))
    await pg.screenshot(path="test4/sw_easy.png")
    await pg.click("#coverSwitch"); await pg.wait_for_timeout(2000)
    print(pg.url, await pg.evaluate("document.title")); print(errs); await b.close()
asyncio.run(main())
