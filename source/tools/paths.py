# 작업 폴더 경로를 한곳에서 정한다. (예전에는 /home/claude 로 고정돼 있었음)
# WORK = 이 파일이 있는 tools 폴더의 상위 폴더 (setup.sh 가 tools 를 작업 폴더에 복사해 둠)
# REPO = 환경 변수 ANNE_REPO → 작업 폴더의 repo_path.txt(작업 폴더 기준 상대 경로) → WORK/anne 순으로 찾는다.
# CHROME = 환경 변수 ANNE_CHROME (없으면 playwright 가 깐 크로뮴을 씀)
import os, pathlib
WORK = pathlib.Path(__file__).resolve().parents[1]
_cfg = WORK / 'repo_path.txt'
REPO = (WORK / (os.environ.get('ANNE_REPO') or (_cfg.read_text(encoding='utf-8').strip() if _cfg.exists() else 'anne'))).resolve()
CHROME = os.environ.get('ANNE_CHROME') or None
IMGS = WORK / 'imgs'
IN = IMGS / 'in'
HTML = WORK / 'anne_visual_novel.html'
def uri(p): return pathlib.Path(p).resolve().as_uri()
