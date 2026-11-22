import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
# 최종 보고서의 '나의 독서 유형' 카드가 세 유형마다 그림 아이콘(end_canon/imag/bal)을 보여 주는지 확인
import asyncio
from playwright.async_api import async_playwright
def snap(t):
    tally = {"canon":{"canon":5,"imag":1,"bal":0},"imag":{"canon":1,"imag":5,"bal":0},"bal":{"canon":3,"imag":3,"bal":0}}[t]
    hist = {f"ch{i}":{"ending":t if t!="bal" else ("canon" if i%2 else "imag"),"tally":tally} for i in range(1,11)}
    return {"canon":50,"imag":50,"hearts":{},"met":{},"items":[],"flags":{},"names":{},"hist":hist}
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    pg=await b.new_page(viewport={"width":1100,"height":900}); errs=[]
    pg.on("pageerror",lambda e: errs.append(str(e)))
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1000)
    bad=[]
    for t in ["canon","imag","bal"]:
      await pg.evaluate("s=>window.__anne.start(9,s)", snap(t)); await pg.wait_for_timeout(800)
      await pg.evaluate("document.getElementById('stage').hidden=true; document.getElementById('report').hidden=false; window.__anne.mid()")
      await pg.wait_for_timeout(800)
      info=await pg.evaluate("(()=>{const c=document.querySelector('.type-card'); if(!c) return null; const i=c.querySelector('.type-emoji img'); return {name:c.querySelector('h3').innerText, img:!!i, ok:i?(i.complete&&i.naturalWidth>0):false}})()")
      print(t, info, flush=True)
      if not info or not info["ok"]: bad.append(t)
      card=pg.locator(".type-card")
      if await card.count(): await card.first.screenshot(path=OUT+f"type_{t}.png")
    print("errors", errs)
    await b.close()
    if bad or errs: sys.exit(1)
asyncio.run(main())
