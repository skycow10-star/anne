import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    for vp,n in [({"width":390,"height":844},"ph"),({"width":844,"height":390},"la")]:
      pg=await b.new_page(viewport=vp); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1200)
      await pg.evaluate("window.__anne.start(0,null)"); await pg.wait_for_timeout(1000); k=0
      for i in range(500):
        ph=await pg.evaluate("window.__anne.state().phase")
        if ph=="report": break
        if ph=="choice": await pg.click(f"#choiceList .choice >> nth={k%3}"); k+=1; await pg.wait_for_timeout(800); continue
        if ph=="name": await pg.fill("#nameInput","꽃길"); await pg.click("#nameOk"); await pg.wait_for_timeout(800); continue
        await pg.click("#dialog"); await pg.wait_for_timeout(40)
      await pg.wait_for_timeout(500)
      print(await pg.evaluate("window.__anne.state().phase"), await pg.evaluate("document.getElementById(\"report\").innerHTML.length"))
      await pg.evaluate("document.querySelector(\"details.more\").open=true")
      await pg.click("[data-scene*='|end|']", force=True); await pg.wait_for_timeout(600)
      await pg.screenshot(path=f"test4/sv_end_{n}.png")
      await pg.click("#sceneView"); await pg.wait_for_timeout(300)
      if await pg.query_selector("[data-scene*='|album|']"):
        await pg.click("[data-scene*='|album|']", force=True); await pg.wait_for_timeout(600); await pg.screenshot(path=f"test4/sv_alb_{n}.png")
      print(n,errs)
    await b.close()
asyncio.run(main())
