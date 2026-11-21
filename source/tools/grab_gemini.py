# 다운로드 폴더에서 아직 안 쓴 가장 새 Gemini 그림을 골라 1376x768 로 맞춰 스크래치 폴더에 저장하고, 미리보기 jpg 를 만든다.
# 사용법: py -3 -I grab.py 저장이름   → 출력: 원본 파일 이름, 크기
import sys, os, glob, json, time
from PIL import Image
name = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
used_f = os.path.join(here, 'used.json')
used = set(json.load(open(used_f, encoding='utf-8'))) if os.path.exists(used_f) else set()
dl = os.path.join(os.path.expanduser('~'), 'Downloads')
for _ in range(30):
    c = [f for f in glob.glob(os.path.join(dl, 'Gemini_Generated_Image_*.png')) if os.path.basename(f) not in used]
    if c:
        f = max(c, key=os.path.getmtime)
        s1 = os.path.getsize(f); time.sleep(1.5)
        if os.path.getsize(f) == s1 and s1 > 0: break
    time.sleep(2)
else:
    sys.exit('새 다운로드가 없어요')
im = Image.open(f).convert('RGB')
print(os.path.basename(f), im.size)
W, H = (int(sys.argv[2]), int(sys.argv[3])) if len(sys.argv) > 3 else (1376, 768)
# 비율이 다르면 가운데를 기준으로 잘라 맞춘다
r = W / H
if abs(im.width / im.height - r) > 0.01:
    if im.width / im.height > r:
        nw = int(im.height * r); x = (im.width - nw) // 2; im = im.crop((x, 0, x + nw, im.height))
    else:
        nh = int(im.width / r); y = (im.height - nh) // 2; im = im.crop((0, y, im.width, y + nh))
im.resize((W, H), Image.LANCZOS).save(os.path.join(here, name + '.png'))
im.resize((W // 2, H // 2)).save(os.path.join(here, 'check_' + name + '.jpg'), quality=85)
used.add(os.path.basename(f)); json.dump(sorted(used), open(used_f, 'w', encoding='utf-8'))
