# 4×4 아이콘 시트를 물건 덩어리별로 잘라 imgs/in/it_<키>.png 로 저장 (왼쪽 위부터 줄 순서)
import sys, numpy as np
from PIL import Image
from scipy import ndimage
def slice_sheet(path, keys, cols=4, dil=14):
    im=Image.open(path).convert('RGB'); a=np.asarray(im).astype(int)
    mask=(a.min(axis=2)<232)
    lab,n=ndimage.label(ndimage.binary_dilation(mask,iterations=dil))
    objs=[]
    for i,sl in enumerate(ndimage.find_objects(lab)):
        h=sl[0].stop-sl[0].start; w=sl[1].stop-sl[1].start
        if h*w<1500: continue
        objs.append((sl[0].start,sl[1].start,sl))
    # 줄 묶기: y 중심으로 정렬 후 비슷한 높이끼리
    objs.sort(key=lambda o:(o[2][0].start+o[2][0].stop)/2)
    rows=[]; 
    for o in objs:
        cy=(o[2][0].start+o[2][0].stop)/2
        if rows and abs(rows[-1][0]-cy)<im.height/(cols*2.2): rows[-1][1].append(o)
        else: rows.append([cy,[o]])
    order=[o for _,r in rows for o in sorted(r,key=lambda o:o[2][1].start)]
    assert len(order)==len(keys),(path,len(order),len(keys))
    for k,(y,x,sl) in zip(keys,order):
        crop=im.crop((sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)); w,h=crop.size; s=int(max(w,h)*1.12)
        sq=Image.new('RGB',(s,s),(255,255,255)); sq.paste(crop,((s-w)//2,(s-h)//2)); sq=sq.resize((200,200),Image.LANCZOS)
        # 흰 배경을 투명하게(가장자리에서 이어진 흰색만)
        arr=np.asarray(sq.convert('RGBA')).copy(); wht=(arr[:,:,:3].min(axis=2)>238)
        l2,_=ndimage.label(wht); edge=set(np.unique(np.concatenate([l2[0],l2[-1],l2[:,0],l2[:,-1]])))-{0}
        bgm=np.isin(l2,list(edge)); arr[bgm,3]=0
        Image.fromarray(arr).save(f'/home/claude/imgs/in/it_{k}.png')
    return order
S1='carpetbag plum petal namecard poem note auburn narcissi wreath vow lily choco slate ricelily candy pansy'.split()
S2='maple lock pebble bookmark jamKey rosecard taffy star hanky rainbow bottle garden candle dye scissors ribbon'.split()
S3='iris shawl pile oar avery narcissus scotchRose bend'.split()
U='/mnt/user-data/uploads/'
slice_sheet(U+"d8be18f6-image.png",S1); slice_sheet(U+"a9035c75-image.png",S2); slice_sheet(U+"8ed20807-image.png",S3,dil=5)
# 확인용 모음
keys=S1+S2+S3; sheet=Image.new('RGBA',(10*110,4*130),(250,245,235,255))
from PIL import ImageDraw
d=ImageDraw.Draw(sheet)
for i,k in enumerate(keys):
    t=Image.open(f'/home/claude/imgs/in/it_{k}.png').resize((100,100)); x,y=(i%10)*110+5,(i//10)*130+5
    sheet.alpha_composite(t,(x,y)); d.text((x,y+104),k,fill=(80,50,30,255))
sheet.save('/home/claude/icons/check.png'); print('ok',len(keys))
