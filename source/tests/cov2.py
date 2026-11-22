import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    for vp,n in [({"width":1280,"height":800},"pc"),({"width":390,"height":844},"ph"),({"width":844,"height":390},"land")]:
      ctx=await b.new_context(viewport=vp); pg=await ctx.new_page(); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2500)
      await pg.screenshot(path=f"test4/cov_{n}.png"); print(n,errs); await ctx.close()
    await b.close()
asyncio.run(main())
