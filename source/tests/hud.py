import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome"); pg=await b.new_page(viewport={"width":390,"height":844})
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1200)
    await pg.evaluate("window.__anne.start(3,{hearts:{matthew:5,marilla:3,diana:4,lynde:2,barry:1,gilbert:0},met:{matthew:true,marilla:true,diana:true,lynde:true,barry:true,gilbert:true}})"); await pg.wait_for_timeout(1500)
    for i in range(4): await pg.click("#dialog"); await pg.wait_for_timeout(150)
    await pg.wait_for_timeout(800); await pg.screenshot(path="test4/hud.png"); await b.close()
asyncio.run(main())
