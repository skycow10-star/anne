#!/bin/bash
# 새 작업 환경에서 제작 도구가 기대하는 작업 폴더를 만든다.
# 사용법: bash <저장소>/source/setup.sh [작업 폴더]
#   작업 폴더를 안 주면 저장소 옆에 anne-work 를 만든다. (예: X:/anne → X:/anne-work)
#   윈도우에서는 Git Bash 로 실행. 리눅스에서 예전처럼 쓰려면: bash /home/claude/anne/source/setup.sh /home/claude
set -e
R="$(cd "$(dirname "$0")" && pwd)"          # <저장소>/source
REPO="$(cd "$R/.." && pwd)"
W="${1:-$(dirname "$REPO")/anne-work}"
mkdir -p "$W"/imgs/in "$W"/imgs/later "$W"/imgs/spare "$W"/src "$W"/test4 "$W"/out
rm -rf "$W/build" "$W/tools"
cp -r "$R/build" "$W/build"
cp -r "$R/tools" "$W/tools"
for f in "$R"/images/*; do [ -f "$f" ] && cp "$f" "$W/imgs/in/"; done
cp "$R"/images/later/* "$W/imgs/later/" 2>/dev/null || true
cp "$R"/images/spare/* "$W/imgs/spare/" 2>/dev/null || true
rm -rf "$W/src/tr" "$W/src/chapters"
cp -r "$R/text/translations" "$W/src/tr"
cp -r "$R/text/original_chapters" "$W/src/chapters"
cp "$R"/tests/*.py "$W/test4/"
# 도구(paths.py, publish.sh)가 저장소 위치를 찾을 수 있게 작업 폴더 기준 상대 경로로 적어 둔다 (예: ../anne)
#   (윈도우 경로에 한글이 있으면 절대 경로는 글자가 깨질 수 있어서 상대 경로로 씀)
realpath --relative-to="$W" "$REPO" > "$W/repo_path.txt"
echo "준비 완료: 작업 폴더 $W"
echo "고친 뒤 bash \"$W/tools/publish.sh\" \"커밋 메시지\" 로 빌드·그림·쉬운 이야기 페이지 생성·백업·배포를 한 번에 합니다."
