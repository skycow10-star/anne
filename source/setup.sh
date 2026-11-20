#!/bin/bash
# 새 작업 환경에서 제작 도구가 기대하는 폴더 구조를 다시 만든다.
# 사용법: 저장소를 /home/claude/anne 에 clone 한 뒤  bash /home/claude/anne/source/setup.sh
set -e
R=/home/claude/anne/source
mkdir -p /home/claude/imgs/in /home/claude/imgs/later /home/claude/src /home/claude/test4
cp -r $R/build /home/claude/build
cp -r $R/tools /home/claude/tools
find $R/images -maxdepth 1 -type f -exec cp {} /home/claude/imgs/in/ \;
cp $R/images/later/* /home/claude/imgs/later/
cp -r $R/text/translations /home/claude/src/tr
cp -r $R/text/original_chapters /home/claude/src/chapters
cp $R/tests/run3.py /home/claude/test4/run3.py
echo "준비 완료: python3 /home/claude/tools/build.py 로 빌드, python3 /home/claude/tools/assets.py 로 앱용 index.html·그림 생성"
