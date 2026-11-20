/* =========================================================
   쉬운 이야기 1장 · 기차역의 기다림 (원작 2장)
   - 한 장면에 1~2문장, 짧고 쉬운 말
   - 선택지 2개: 📖 원작(canon) / ✨ 상상(imag)
   - 💗 마음 읽기(kind:`feel`), 보기에서 고르는 이름 짓기(pick)
   ========================================================= */
EASY.push({
  key: `ch1`, num: 1, bgm: `bgm_ch1.mp3`, title: `기차역의 기다림`, orig: `원작 2장`, origTitle: `매슈 커스버트, 깜짝 놀라다`,
  bgKeys: [`ch1`, `ch1_road`, `ch1_avenue`, `ch1_pond`, `ch1_home`],
  endings: {
    canon: {title: `꿈이 아니야!`, label: `원작 결말`},
    imag:  {title: `일곱 개 탑의 성`, label: `상상 결말`},
    bal:   {title: `고마워요, 매슈 아저씨`, label: `균형 결말`}
  },
  items: {
    carpetbag:{ic:`👜`, name:`낡은 가방`, desc:`앤의 물건이 전부 들어 있는 가방이에요.`},
    namecard:{ic:`✍️`, name:`이름 카드`, desc:`내가 꽃길에 붙인 이름: '{avenue}'`}
  },
  album: [
    {id:`s1_cherry`, ic:`🌸`, name:`벚나무 위의 공주`},
    {id:`s1_flying`, ic:`🪽`, name:`하늘을 나는 마차`},
    {id:`s1_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`앤은 왜 꽃길에 새 이름을 붙였을까요?`,
        `매슈 아저씨는 왜 "남자아이를 기다렸다"고 말하지 못했을까요?`,
        `내가 이름을 붙이고 싶은 곳이 있나요? 어떤 이름을 붙이고 싶나요?`],
    l: [`앤은 왜 꽃길에 새 이름을 붙였을까요?`,
        `매슈 아저씨는 왜 "남자아이를 기다렸다"고 말하지 못했을까요?`,
        `내가 이름을 붙이고 싶은 곳이 있나요? 어떤 이름을 붙이고 싶나요?`]
  },
  nodes: [
  /* ---------- 기차역 ---------- */
  {id:`s1`, bg:`ch1`, w:`anne`, in:1, f:`anne_dreamy`, cam:`out`, eff:{item:`carpetbag`},
   e:`나는 앤 셜리야.\n열한 살이야.`},
  {w:`anne`, in:1, f:`anne_dreamy`,
   e:`나는 고아원에서 살았어.\n오늘 기차를 타고 이 역에 왔어.`},
  {w:`anne`, in:1, f:`anne_happy`, cam:`in`,
   e:`초록 지붕 집에서 나를 데리러 온대.\n이제 나도 집이 생겨!`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_happy`,
   q:{e:`지금 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 아주 설레요. 처음으로 진짜 집이 생기니까요.`},
   opts:[
    {type:`feel`, ic:`😊`, ok:1, eff:{album:`s1_feel`}, e:`설레요`},
    {type:`feel`, ic:`😢`, e:`슬퍼요`},
    {type:`feel`, ic:`😠`, e:`화나요`}
   ]},
  {w:`station`, f:`anne_surprised`, cam:`right`,
   e:`"얘야, 대합실 안에 들어가서 기다리렴."`},
  {t:`choice`, id:`C1`, kind:`act`, label:`기다릴 곳`, f:`anne_dreamy`,
   q:{e:`역장님이 안에 들어가래요.\n앤은 어디서 기다릴까요?`},
   note:{e:`원작의 앤은 밖에서 기다려요. "밖에서는 상상할 게 많아요!"`},
   opts:[
    {type:`canon`, go:`c1a`, e:`밖에서 기다려요`},
    {type:`imag`, go:`c1b`, e:`벚나무에 올라가요`}
   ]},
  {id:`c1a`, w:`anne`, f:`anne_happy`,
   e:`"고맙습니다. 하지만 밖에 있을래요.\n밖에서는 상상할 게 많거든요!"`},
  {t:`goto`, to:`m1`},
  {id:`c1b`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`s1_cherry`},
   e:`나는 하얀 벚나무에 올라갔어.\n꽃잎이 내 머리에 떨어졌어.`},
  {w:`anne`, in:1, f:`anne_happy`, fx:`dream`,
   e:`여기는 꽃 궁전이야.\n나는 궁전의 공주야!`},
  /* ---------- 매슈 아저씨 ---------- */
  {id:`m1`, w:`anne`, in:1, f:`anne_surprised`, o:`matthew`, cam:`right`, eff:{flag:`metMatthew`},
   e:`키 큰 아저씨가 왔어.\n초록 지붕 집의 매슈 아저씨야.`},
  {w:`anne`, in:1, f:`anne_surprised`, o:`matthew`,
   e:`아저씨는 깜짝 놀란 얼굴이야.\n왜 그럴까?`},
  {t:`choice`, id:`C2`, kind:`predict`, label:`첫인사`, f:`anne_surprised`, o:`matthew`,
   q:{e:`원작의 앤은 어떻게 인사했을까요?`},
   note:{e:`원작의 앤은 먼저 일어나서 손을 내밀어요. 수줍은 매슈 아저씨는 그게 고마웠어요.`},
   opts:[
    {type:`canon`, go:`m3`, e:`먼저 손을 내밀어요`},
    {type:`imag`, go:`c2b`, e:`공주님처럼 기다려요`}
   ]},
  {id:`c2b`, w:`anne`, in:1, f:`anne_dreamy`, o:`matthew`, fx:`dream`,
   e:`나는 공주님처럼 앉아서 기다렸어.\n그런데 아저씨는 아무 말도 못 하셨어.`},
  {w:`anne`, in:1, f:`anne_happy`, o:`matthew`,
   e:`그래서 내가 먼저 일어났어.`},
  {id:`m3`, w:`anne`, f:`anne_happy`, o:`matthew`, cam:`in`,
   e:`"안녕하세요!\n초록 지붕 집 매슈 아저씨세요?"`},
  {w:`matthew`, f:`anne_happy`, o:`matthew`,
   e:`"그래… 늦어서 미안하다.\n가자."`},
  {w:`anne`, in:1, f:`anne_happy`, o:`matthew`,
   e:`사실 아저씨는 남자아이를 기다렸어.\n그런데 나한테 그 말을 하지 못했어.`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`매슈의 마음`, f:`anne_happy`, o:`matthew`,
   q:{e:`매슈 아저씨의 마음은 어떨까요?`},
   note:{e:`원작의 매슈 아저씨는 몹시 당황했어요. 하지만 앤을 실망시키고 싶지 않았어요.`},
   opts:[
    {type:`feel`, ic:`😮`, ok:1, e:`당황했어요`},
    {type:`feel`, ic:`😊`, e:`신나요`},
    {type:`feel`, ic:`😠`, e:`화나요`}
   ]},
  /* ---------- 마차 ---------- */
  {bg:`ch1_road`, w:`anne`, f:`anne_happy`, o:`matthew`, cam:`out`,
   e:`우리는 마차를 탔어.\n나는 쉬지 않고 이야기했어.`},
  {w:`anne`, f:`anne_surprised`, o:`matthew`,
   e:`"제가 말을 너무 많이 하나요?"`},
  {w:`matthew`, f:`anne_happy`, o:`matthew`,
   e:`"아니다. 실컷 말하렴.\n나는 괜찮다."`},
  {t:`choice`, id:`C3`, kind:`talk`, label:`마차 위에서`, f:`anne_happy`, o:`matthew`,
   q:{e:`앤은 이제 무엇을 할까요?`},
   note:{e:`원작의 앤은 계속 이야기해요. 매슈 아저씨는 앤의 이야기가 좋았어요.`},
   opts:[
    {type:`canon`, go:`r1`, eff:{heart:{matthew:1}}, e:`계속 이야기해요`},
    {type:`imag`, go:`r2`, eff:{album:`s1_flying`}, e:`하늘을 나는 마차를 상상해요`}
   ]},
  {id:`r1`, w:`anne`, f:`anne_happy`, o:`matthew`,
   e:`"아저씨, 저는 이 섬이 정말 좋아요!\n벌써 정말 좋아요!"`},
  {t:`goto`, to:`av`},
  {id:`r2`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`,
   e:`마차가 하늘로 붕 떠올랐어.\n구름 위를 달리는 마차야!`},
  /* ---------- 꽃길 ---------- */
  {id:`av`, bg:`ch1_avenue`, w:`anne`, in:1, f:`anne_dreamy`, cam:`up`,
   e:`와! 하얀 꽃이 가득한 길이야.\n꽃이 지붕처럼 덮여 있어.`},
  {w:`anne`, f:`anne_dreamy`, o:`matthew`,
   e:`"이 길에 예쁜 이름을 붙여 줄래요!"`},
  {t:`name`, id:`N1`, key:`avenue`, canon:`기쁨의 하얀 길`, max:14, label:`꽃길의 이름`, f:`anne_dreamy`, o:`matthew`,
   q:{e:`✍️ 꽃길에 어떤 이름을 붙일까요?`},
   pick:[`기쁨의 하얀 길`, `하얀 꽃 터널`, `눈꽃 길`],
   ph:`직접 써도 돼요`,
   note:{e:`원작의 앤은 '기쁨의 하얀 길'이라고 불러요.`}},
  {w:`anne`, f:`anne_happy`, o:`matthew`, eff:{item:`namecard`},
   e:`"이제 이 길은 '{avenue}'예요!"`},
  /* ---------- 연못과 집 ---------- */
  {bg:`ch1_pond`, w:`anne`, in:1, f:`anne_happy`, eff:{name:{pond:`반짝이는 호수`}}, cam:`out`,
   e:`반짝반짝 빛나는 연못도 있어.\n여기는 '반짝이는 호수'야.`},
  {bg:`ch1_home`, w:`matthew`, f:`anne_surprised`, o:`matthew`, cam:`in`,
   e:`"저기가 초록 지붕 집이다."`},
  {w:`anne`, in:1, f:`anne_happy`, o:`matthew`,
   e:`불빛이 반짝이는 집이야.\n여기가 내 집이 될 거야!`},
  {t:`choice`, id:`C4`, kind:`act`, label:`집을 보고`, f:`anne_happy`, o:`matthew`,
   q:{e:`앤은 무엇을 할까요?`},
   note:{e:`원작의 앤은 꿈이 아닌지 팔을 꼬집어 봐요.`},
   opts:[
    {type:`canon`, go:`h1`, e:`꿈인지 팔을 꼬집어요`},
    {type:`imag`, go:`h2`, e:`멋진 성이라고 상상해요`}
   ]},
  {id:`h1`, w:`anne`, in:1, f:`anne_surprised`, cam:`shake`,
   e:`나는 팔을 꼬집어 봤어.\n아야! 꿈이 아니야!`},
  {t:`goto`, to:`h3`},
  {id:`h2`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`,
   e:`초록 지붕 집은 탑이 일곱 개인 성이야.\n나는 그 성에 사는 아이야!`},
  {id:`h3`, w:`anne`, f:`anne_happy`, o:`matthew`,
   e:`"아저씨, 저 정말 행복해요."\n아저씨는 조용히 웃으셨어.`},
  {t:`ending`},
  /* ---------- 결말 ---------- */
  {id:`E_canon`, bg:`ch1_home`, w:`anne`, in:1, f:`anne_happy`, cam:`in`, eff:{album:`e_canon`},
   e:`꿈이 아니야.\n오늘부터 여기가 내 집이야!`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch1_home`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`일곱 개 탑의 성에 불이 켜졌어.\n성이 나를 기다리고 있었어!`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch1_home`, w:`anne`, f:`anne_happy`, o:`matthew`, cam:`in`, eff:{album:`e_bal`, heart:{matthew:1}},
   e:`"데리러 와 주셔서 고마워요, 아저씨."\n아저씨 얼굴이 빨개졌어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch1_home`, w:`anne`, in:1, f:`anne_happy`, cam:`out`,
   e:`그런데 아저씨는 정말 남자아이를 기다렸을까?\n다음 이야기에서 알게 될 거야.`},
  {t:`endcard`}
  ]
});
