#!/bin/bash
# 빌드 → 앱용 파일 생성 → 원본 백업 → 캐시 번호 올림 → 커밋·푸시
# 사용법: bash <작업 폴더>/tools/publish.sh "커밋 메시지"   (윈도우는 Git Bash)
set -e
MSG="$1"
[ -n "$MSG" ] || { echo "커밋 메시지를 주세요"; exit 1; }
W="$(cd "$(dirname "$0")/.." && pwd)"       # 작업 폴더 (tools 의 상위)
REPO="$(cat "$W/repo_path.txt" 2>/dev/null || echo "$W/anne")"
if command -v py >/dev/null 2>&1; then PY="py -3"; else PY=python3; fi
export PYTHONUTF8=1 PYTHONIOENCODING=utf-8
cd "$W"
$PY tools/build.py
$PY tools/assets.py 2>&1 | grep -v "proxy\|allowed\|use the read" | tail -1
$PY tools/mkeasy.py
R="$REPO/source"
rm -rf "$R/build" "$R/tools"; cp -r build tools "$R/"
rm -rf "$R/tools/__pycache__"
rm -rf "$R/text/translations"; cp -r src/tr "$R/text/translations"
rm -rf "$R/images"; mkdir -p "$R/images/later" "$R/images/spare"; cp imgs/in/* "$R/images/"; cp imgs/later/* "$R/images/later/" 2>/dev/null || true; cp imgs/spare/* "$R/images/spare/" 2>/dev/null || true
mkdir -p "$R/tests"; cp test4/*.py "$R/tests/"
cd "$REPO"
N=$(grep -o 'anne-vn-v[0-9]*' sw.js | grep -o '[0-9]*$'); sed -i "s/anne-vn-v$N/anne-vn-v$((N+1))/" sw.js
git add -A
git commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git -c push.negotiate=true push 2>&1 | tail -1
echo "캐시 anne-vn-v$((N+1)) 로 배포"
