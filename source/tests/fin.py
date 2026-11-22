import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    pg=await b.new_page(viewport={"width":1280,"height":900}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1200)
    await pg.evaluate("window.__anne.start(9,null)"); await pg.wait_for_timeout(1200)
    await pg.evaluate("window.__anne.mid()"); await pg.wait_for_timeout(800)
    await pg.screenshot(path="fin.png",full_page=False)
    t=await pg.evaluate("document.getElementById('report').innerText.slice(0,600)")
    print(t); print("errs",errs); await b.close()
asyncio.run(main())
