import asyncio, glob, json, sys
from playwright.async_api import async_playwright
from paths import IMGS, IN, HTML, CHROME, uri
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path=CHROME, args=["--allow-file-access-from-files"])
    pg=await b.new_page(viewport={"width":1280,"height":800})
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.goto(uri(HTML)); await pg.wait_for_timeout(500)
    await pg.set_input_files("#fileInput", sorted(glob.glob(str(IN/"*"))))
    await pg.wait_for_function("Object.keys(window.__anne.uploaded()).length>=31", timeout=120000)
    keys=await pg.evaluate("Object.keys(window.__anne.uploaded()).sort()")
    html=await pg.evaluate("window.__anne.exportHTML(true)")
    open(IMGS/"index_student.html","w",encoding="utf-8").write(html)
    for k in ["phillips"]:
      d=await pg.evaluate(f"window.__anne.uploaded()['{k}']")
      import base64; open(IMGS/f"chk_{k}.png","wb").write(base64.b64decode(d.split(",")[1]))
    print(keys, len(html)/1048576, errs)
    await b.close()
asyncio.run(main())
