# 인물 그림(anne/img/*.webp, 배경 투명)에서 얼굴을 동그랗게 잘라 imgs/in/av_*.png 로 저장
import sys
from PIL import Image, ImageDraw
import numpy as np
SRC={'matthew':'matthew','marilla':'marilla_warm','lynde':'lynde','diana':'diana','barry':'barry','gilbert':'gilbert','allan':'allan'}
ADJ={}  # k:(dx,dy,scale) 미세 조정
if len(sys.argv)>1: ADJ=eval(sys.argv[1])
sheet=Image.new('RGBA',(7*170,190),(250,245,235,255))
for i,(k,f) in enumerate(SRC.items()):
    im=Image.open(f'/home/claude/anne/img/{f}.webp').convert('RGBA'); a=np.array(im)[:,:,3]
    ys,xs=np.where(a>40); top=ys.min(); h=ys.max()-top
    band=a[top:top+int(h*0.16)]; cols=np.where(band.max(axis=0)>40)[0]
    cx=(cols.min()+cols.max())/2; w=(cols.max()-cols.min())
    dx,dy,sc=ADJ.get(k,(0,0,1.0))
    size=int(max(w*1.05,h*0.17)*sc); cy=top+size*0.55
    cx+=dx*size; cy+=dy*size
    box=(int(cx-size/2),int(cy-size/2),int(cx+size/2),int(cy+size/2))
    crop=Image.new('RGBA',(size,size),(255,250,241,255)); crop.alpha_composite(im.crop(box))
    crop=crop.resize((160,160),Image.LANCZOS)
    m=Image.new('L',(160,160),0); ImageDraw.Draw(m).ellipse((0,0,159,159),fill=255)
    out=Image.new('RGBA',(160,160),(0,0,0,0)); out.paste(crop,(0,0),m)
    out.save(f'/home/claude/imgs/in/av_{k}.png'); sheet.alpha_composite(out,(5+i*170,5))
sheet.save('/home/claude/av/sheet.png'); print('ok')
