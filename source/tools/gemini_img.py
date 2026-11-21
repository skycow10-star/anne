# 제미나이(Gemini API)로 그림을 만들어 작업 폴더 gen/ 에 저장한다. (imgs/in 에는 눈으로 확인한 뒤 따로 넣는다)
# 사용법:
#   py -3 tools/gemini_img.py 저장이름 "장면 설명" [--ref 파일 ...] [--model 모델] [--size 1K|2K] [--ratio 16:9] [--n 2]
#   --ref 는 imgs/in 의 파일 이름(확장자 없어도 됨)이나 경로. 인물 그림·같은 장 그림을 넣으면 얼굴·화풍이 비슷해진다.
#   --n 2 이면 후보를 2장 만든다(저장이름_1.png, 저장이름_2.png).
# 키: 환경 변수 GEMINI_API_KEY (윈도우는 사용자 환경 변수도 읽음). 키는 저장소에 절대 넣지 않는다.
import argparse, base64, io, json, os, sys, time, urllib.request, urllib.error
from PIL import Image
from paths import WORK, IN

STYLE = """수채화 풍 그림책 일러스트, 16:9 가로, 1900년대 초 캐나다 프린스에드워드섬,
부드럽고 따뜻한 색감, 가는 잉크 선, 글자·말풍선·서명·워터마크 없음, 인물과 배경이 함께 있는 한 장면.
첨부한 그림들과 같은 화풍·같은 인물 모습(얼굴, 머리, 옷)을 그대로 유지할 것.
등장인물 모습:
앤(11~13살) — 빨간 머리를 두 갈래로 땋음, 주근깨, 회색 눈, 밀짚모자, 초록 소매 블라우스에 갈색 앞치마 원피스
열여섯 살 앤 — 땋아서 올린 적갈색 머리, 단정한 드레스
매슈 아저씨 — 키 크고 구부정함, 회색 머리와 흰 수염, 갈색 재킷
마릴라 아주머니 — 회색 머리를 뒤로 묶음, 마른 얼굴, 수수한 검은 드레스
다이애나 — 검은 곱슬머리, 빨간 리본, 하늘색 드레스, 발그레한 볼
길버트 — 갈색 곱슬머리, 주근깨, 조끼, 개구쟁이 미소
린드 부인 — 통통함, 보닛 모자, 검은 숄
앨런 사모님 — 갈색 올림머리, 하늘색 퍼프 소매 드레스, 보조개
배리 부인 — 검은 올림머리, 남색 드레스, 엄한 표정
상상 장면은 꿈처럼 몽환적인 빛으로."""

def api_key():
    k = os.environ.get('GEMINI_API_KEY')
    if not k and sys.platform == 'win32':
        import winreg
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, 'Environment') as h: k = winreg.QueryValueEx(h, 'GEMINI_API_KEY')[0]
        except OSError: pass
    if not k: sys.exit('GEMINI_API_KEY 가 없어요. 환경 변수에 등록해 주세요.')
    return k

def ref_part(name):
    p = name if os.path.exists(name) else next((str(IN / (name + e)) for e in ('', '.png', '.jpg', '.webp') if (IN / (name + e)).exists()), None)
    if not p: sys.exit(f'참고 그림을 못 찾았어요: {name}')
    im = Image.open(p).convert('RGB'); im.thumbnail((1024, 1024))
    b = io.BytesIO(); im.save(b, 'JPEG', quality=88)
    return {'inline_data': {'mime_type': 'image/jpeg', 'data': base64.b64encode(b.getvalue()).decode()}}

def generate(prompt, refs, model, size, ratio):
    body = {'contents': [{'parts': [{'text': prompt}] + [ref_part(r) for r in refs]}],
            'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': ratio, 'imageSize': size}}}
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                                 data=json.dumps(body).encode(), headers={'Content-Type': 'application/json', 'x-goog-api-key': api_key()})
    try:
        with urllib.request.urlopen(req, timeout=300) as r: res = json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f'제미나이 오류 {e.code}: {e.read().decode(errors="replace")[:800]}')
    for c in res.get('candidates', []):
        for part in c.get('content', {}).get('parts', []):
            d = part.get('inline_data') or part.get('inlineData')
            if d: return base64.b64decode(d['data'])
    sys.exit('그림이 오지 않았어요: ' + json.dumps(res, ensure_ascii=False)[:800])

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('name'); ap.add_argument('scene')
    ap.add_argument('--ref', nargs='*', default=[])
    ap.add_argument('--model', default='gemini-3-pro-image')
    ap.add_argument('--size', default='1K'); ap.add_argument('--ratio', default='16:9')
    ap.add_argument('--n', type=int, default=1)
    ap.add_argument('--no-style', action='store_true', help='공통 화풍 문장을 붙이지 않음(아이콘 등)')
    a = ap.parse_args()
    prompt = a.scene if a.no_style else STYLE + '\n\n장면: ' + a.scene
    out = WORK / 'gen'; out.mkdir(exist_ok=True)
    for i in range(1, a.n + 1):
        t = time.time(); raw = generate(prompt, a.ref, a.model, a.size, a.ratio)
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        f = out / (f'{a.name}_{i}.png' if a.n > 1 else f'{a.name}.png'); im.save(f)
        print(f'{f}  {im.size[0]}x{im.size[1]}  {time.time()-t:.0f}s')
