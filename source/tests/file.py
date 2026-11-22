import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / 'tools'))
from paths import CHROME, HTML, WORK, uri
OUT = str(WORK / 'test4') + '/'
import asyncio
from playwright.async_api import async_playwright
# 오프라인 압축 파일용 폴더(out/off/빨강머리앤)를 만든 뒤에만 의미 있는 테스트
if not (WORK/"out"/"off"/"빨강머리앤"/"index.html").exists():
  print("건너뜀: 오프라인 폴더가 아직 없음"); sys.exit(0)
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME)
    for u in ["index.html","easy/index.html"]:
      pg=await b.new_page(viewport={"width":1280,"height":800}); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
      await pg.goto(uri(WORK/"out"/"off"/"빨강머리앤")+"/"+u); await pg.wait_for_timeout(1500)
      await pg.click("#btnStart"); await pg.wait_for_timeout(3000)
      ok=await pg.evaluate("Array.from(document.images).filter(i=>i.src&&i.complete&&i.naturalWidth>0).length")
      print(u,"imgs",ok,"bgm",await pg.evaluate("JSON.stringify(window.__anne.bgm())"),errs)
      await pg.screenshot(path=OUT+"file_"+u.replace('/','_')+".png")
    await b.close()
asyncio.run(main())
