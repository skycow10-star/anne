#!/bin/bash
# 빌드 → 앱용 파일 생성 → 원본 백업 → 캐시 번호 올림 → 커밋·푸시
set -e
MSG="$1"
cd /home/claude
python3 tools/build.py
python3 tools/assets.py 2>&1 | grep -v "proxy\|allowed\|use the read" | tail -1
python3 tools/mkeasy.py
R=anne/source
rm -rf $R/build $R/tools; cp -r build tools $R/
rm -rf $R/text/translations; cp -r src/tr $R/text/translations
cd anne
N=$(grep -o 'anne-vn-v[0-9]*' sw.js | grep -o '[0-9]*$'); sed -i "s/anne-vn-v$N/anne-vn-v$((N+1))/" sw.js
git add -A
git commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01DqY8gfT4xfJ5wZQGC3UGtV"
git -c push.negotiate=true push 2>&1 | tail -1
