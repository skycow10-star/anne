# 저장소(사이트)를 http://localhost:8765 로 띄우고 test4 의 테스트를 차례로 돌린다.
# 사용법: py -3 test4/run_all.py            (전부)
#         py -3 test4/run_all.py err gate   (이름 일부만 골라서)
import sys, os, subprocess, threading, functools, pathlib, time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / 'tools'))
from paths import REPO
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = ThreadingHTTPServer(('127.0.0.1', 8765), functools.partial(Quiet, directory=str(REPO)))
threading.Thread(target=srv.serve_forever, daemon=True).start()

pick = sys.argv[1:]
tests = sorted(p for p in HERE.glob('*.py') if p.name != 'run_all.py' and (not pick or any(k in p.stem for k in pick)))
env = dict(os.environ, PYTHONUTF8='1', PYTHONIOENCODING='utf-8')
fails = []
for t in tests:
    t0 = time.time()
    try:
        r = subprocess.run([sys.executable, str(t)], cwd=str(HERE.parent), env=env, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=900)
        ok, out = r.returncode == 0, (r.stdout + r.stderr).strip()
    except subprocess.TimeoutExpired:
        ok, out = False, '시간 초과(15분)'
    if not ok: fails.append(t.stem)
    tail = '\n    '.join(out.splitlines()[-6:])
    print(f"{'OK ' if ok else 'XX '} {t.stem} ({time.time()-t0:.0f}s)\n    {tail}", flush=True)
srv.shutdown()
print('\n실패:', ', '.join(fails) if fails else '없음')
sys.exit(1 if fails else 0)
