# anne/index.html → anne/easy/index.html (쉬운 이야기 주소). 그림·음악·sw는 상위 폴더 것을 함께 씀.
import os
from paths import REPO
A=str(REPO)
src=open(A+'/index.html',encoding='utf-8').read()
assert src.count('window.STUDENT_MODE = true;')==1
s=src.replace('<meta charset="UTF-8">','<meta charset="UTF-8">\n<base href="../">',1)
s=s.replace('window.STUDENT_MODE = true;','window.STUDENT_MODE = true; window.EASY_MODE = true;',1)
s=s.replace('<link rel="manifest" href="manifest.webmanifest">','<link rel="manifest" href="easy/manifest.webmanifest">',1)
s=s.replace('<title>빨강 머리 앤 — 초록 지붕 집으로 가는 길</title>','<title>쉬운 빨강 머리 앤</title>',1)
os.makedirs(A+'/easy',exist_ok=True)
open(A+'/easy/index.html','w',encoding='utf-8',newline='\n').write(s)
open(A+'/easy/manifest.webmanifest','w',encoding='utf-8',newline='\n').write('''{
  "name": "쉬운 빨강 머리 앤",
  "short_name": "쉬운 앤",
  "description": "쉬운 말로 읽는 선택형 빨강 머리 앤",
  "lang": "ko",
  "start_url": "./",
  "scope": "../",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#fbf6ec",
  "theme_color": "#e0a84a",
  "icons": [
    {"src": "../icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
    {"src": "../icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
    {"src": "../icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
  ]
}
''')
print('easy page ok')
