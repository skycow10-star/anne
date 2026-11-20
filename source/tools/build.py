import sys
d='/home/claude/build/'
s=open(d+'shell.html',encoding='utf-8').read()
for ph,f in [('/*@@BOOK@@*/','book_ch1.js'),('/*@@BOOK@@*/','book_ch2.js'),('/*@@BOOK@@*/','book_ch3.js'),('/*@@BOOK@@*/','book_ch4.js'),('/*@@BOOK@@*/','book_ch5.js'),('/*@@SCRIPT@@*/','script_ch1.js'),('/*@@SCRIPT@@*/','script_ch2.js'),('/*@@SCRIPT@@*/','script_ch3.js'),('/*@@SCRIPT@@*/','script_ch4.js'),('/*@@SCRIPT@@*/','script_ch5.js'),('/*@@ENGINE@@*/','engine.js')]:
    c=open(d+f,encoding='utf-8').read()
    assert '</script' not in c.lower(), f
    s=s.replace(ph,c+'\n'+ph,1)
s=s.replace('/*@@BOOK@@*/','').replace('/*@@SCRIPT@@*/','').replace('/*@@ENGINE@@*/','')
open('/home/claude/anne_visual_novel.html','w',encoding='utf-8').write(s)
print(len(s.encode('utf-8'))//1024,'KB')
