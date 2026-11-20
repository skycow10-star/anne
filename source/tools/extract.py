import zipfile, re, sys, html
z = zipfile.ZipFile(sys.argv[1]); out = sys.argv[2]
for i in range(1, 39):
    x = z.read(f'epub/text/chapter-{i}.xhtml').decode('utf-8')
    title = re.search(r'<p epub:type="title">(.*?)</p>', x, re.S) or re.search(r'<h2[^>]*>(.*?)</h2>', x, re.S)
    paras = re.findall(r'<p[^>]*>(.*?)</p>', x, re.S)
    clean = []
    for p in paras:
        t = re.sub(r'<br\s*/?>', ' / ', p); t = re.sub(r'<[^>]+>', '', t); t = html.unescape(re.sub(r'\s+', ' ', t)).strip()
        if t: clean.append(t)
    open(f'{out}/ch{i:02d}.txt', 'w').write('\n\n'.join(clean))
    print(i, len(clean), sum(len(c.split()) for c in clean))
