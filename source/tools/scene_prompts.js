// 결말·숨은 장면 그림 요청 목록 만들기
const fs=require('fs'); global.CHAPTERS=[]; global.EASY=[]; global.BOOK={};
for(let n=1;n<=10;n++) eval(fs.readFileSync(`/home/claude/build/script_ch${n}.js`,'utf8'));
const eng=fs.readFileSync('/home/claude/build/engine.js','utf8');
const a1=eng.match(/ALBUMS\.ch1 = (\[[\s\S]*?\]);/)[1]; const ALB1=eval(a1);
const WHO={anne:'앤',matthew:'매슈 아저씨',marilla:'마릴라 아주머니',lynde:'린드 부인',diana:'다이애나',barry:'배리 부인',gilbert:'길버트',phillips:'필립스 선생님',allan:'앨런 사모님',doctor:'의사 선생님',minnie_may:'미니 메이',jimmy:'지미',station:'역장',maryjoe:'메리 조',ruby:'루비',jane:'제인'};
const who=k=>{ if(!k) return null; if(k.startsWith('anne')) return k==='anne_grown'?'열여섯 살 앤':k==='anne_green_hair'?'초록 머리 앤':'앤'; const b=k.replace(/_(strict|warm|grown)$/,''); return (k.endsWith('_grown')?'어른이 된 ':'')+(WHO[b]||b); };
let out='';
CHAPTERS.forEach(c=>{
  const N=c.nodes, album=c.key==='ch1'?ALB1:c.album;
  const find=(kind,id)=>{ if(kind==='end') return N.find(n=>n.id==='E_'+id);
    let n=N.find(x=>x.eff&&x.eff.album===id); if(n) return n;
    for(const x of N) if(x.t==='choice'){ const o=x.opts.find(o=>o.eff&&o.eff.album===id); if(o) return N.find(y=>y.id===o.go)||x; } return null; };
  const bgOf=n=>{ let i=N.indexOf(n); for(;i>=0;i--) if(N[i].bg) return N[i].bg; return c.key; };
  const line=(file,title,n)=>{ if(!n) return ''; const ppl=[...new Set([n.f,n.o].filter(Boolean).map(who))].join(', ');
    const txt=(n.e||n.b||'').replace(/\{(\w+)(\|[^}]*)?\}/g,'…').replace(/\n/g,' ');
    return `- **${file}** — ${title}\n  - 장소: ${bgOf(n)} 배경과 비슷하게 · 등장: ${ppl||'없음(풍경)'}${n.fx==='dream'?' · 상상 장면(몽환적으로)':''}\n  - 장면: ${txt}\n`; };
  out+=`\n## ${c.num}장 「${c.title}」\n\n### 결말 (먼저 만들어 주세요)\n`;
  ['canon','imag','bal'].forEach(k=>out+=line(`ed_${c.key}_${k}`,`${c.endings[k].label} · ${c.endings[k].title}`,find('end',k)));
  out+=`\n### 숨은 장면\n`;
  album.forEach(a=>out+=line(`sc_${a.id}`,a.name,find('album',a.id)));
});
fs.writeFileSync('/home/claude/out/body.md',out); console.log(out.length);
