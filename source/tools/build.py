import re,glob
d='/home/claude/build/'
s=open(d+'shell.html',encoding='utf-8').read()
num=lambda f:int(re.search(r'ch(\d+)',f).group(1))
books=sorted(glob.glob(d+'book_ch*.js'),key=num); scripts=sorted(glob.glob(d+'script_ch*.js'),key=num)
for ph,f in [('/*@@BOOK@@*/',b) for b in books]+[('/*@@SCRIPT@@*/',x) for x in scripts]+[('/*@@ENGINE@@*/',d+'engine.js')]:
    c=open(f,encoding='utf-8').read()
    assert '</script' not in c.lower(), f
    s=s.replace(ph,c+'\n'+ph,1)
s=s.replace('/*@@BOOK@@*/','').replace('/*@@SCRIPT@@*/','').replace('/*@@ENGINE@@*/','')
open('/home/claude/anne_visual_novel.html','w',encoding='utf-8').write(s)
print(len(books),'chapters',len(s.encode('utf-8'))//1024,'KB')
