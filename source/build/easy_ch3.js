/* 쉬운 이야기 3장 · 다이애나와의 맹세 (원작 12장) */
EASY.push({
  key: `ch3`, num: 3, bgm: `bgm_ch3.mp3`, title: `다이애나와의 맹세`, orig: `원작 12장`, origTitle: `엄숙한 맹세와 약속`,
  bgKeys: [`ch3`, `ch3_path`, `ch3_garden`, `ch3_bridge`],
  endings: {
    canon: {title: `마음의 친구`, label: `원작 결말`},
    imag:  {title: `같은 별에서 온 자매`, label: `상상 결말`},
    bal:   {title: `내일 또 만나`, label: `균형 결말`}
  },
  items: {
    wreath:{ic:`🌼`, name:`꽃 모자`, desc:`앤이 꽃을 잔뜩 달고 교회에 간 모자예요.`},
    vow:{ic:`🤝`, name:`해와 달의 맹세`, desc:`"해와 달이 있는 한 영원히 친구야." 앤과 다이애나의 약속이에요.`},
    choco:{ic:`🍫`, name:`초콜릿 사탕`, desc:`매슈 아저씨가 사 주신 사탕. 앤은 반을 다이애나에게 주었어요.`}
  },
  album: [
    {id:`s3_queen`, ic:`👑`, name:`들꽃 나라 여왕`},
    {id:`s3_star`, ic:`💫`, name:`같은 별의 자매`},
    {id:`s3_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`앤이 다이애나와 한 맹세는 무엇이었나요?`,
        `앤은 왜 초콜릿을 다이애나와 나누고 싶었을까요?`,
        `나에게 '마음의 친구'는 누구인가요?`],
    l: [`앤이 다이애나와 한 맹세는 무엇이었나요?`,
        `앤은 왜 초콜릿을 다이애나와 나누고 싶었을까요?`,
        `나에게 '마음의 친구'는 누구인가요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch2`, w:`anne`, in:1, f:`anne_happy`, cam:`in`,
   e:`일요일에 나는 교회에 갔어.\n길가에 꽃이 가득 피어 있었어.`},
  {t:`choice`, id:`C1`, kind:`act`, label:`길가의 꽃`, f:`anne_happy`,
   q:{e:`앤은 꽃을 어떻게 할까요?`},
   note:{e:`원작의 앤은 꽃을 잔뜩 꺾어 모자에 빙 둘러 달아요. 사람들이 깜짝 놀랐대요.`},
   opts:[
    {type:`canon`, go:`a_c`, eff:{item:`wreath`}, e:`모자에 꽃을 잔뜩 달아요`},
    {type:`imag`, go:`a_i`, eff:{item:`wreath`, album:`s3_queen`}, e:`꽃 나라 여왕이 돼요`}
   ]},
  {id:`a_c`, w:`anne`, in:1, f:`anne_happy`,
   e:`나는 꽃을 모자에 잔뜩 달았어.\n사람들이 나를 쳐다봤어.`},
  {t:`goto`, to:`a_m`},
  {id:`a_i`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`,
   e:`나는 들꽃 나라의 여왕이야!\n꽃 요정들이 나를 따라왔어.`},
  {id:`a_m`, w:`marilla`, f:`anne_sad`, o:`marilla_strict`,
   e:`"앤, 모자에 꽃을 잔뜩 달면 안 된다.\n사람들이 흉을 봤단다."`},
  {w:`anne`, f:`anne_sad`, o:`marilla_strict`,
   e:`"죄송해요.\n다음엔 조심할게요."`},
  /* ---------- 다이애나 ---------- */
  {w:`marilla`, f:`anne_surprised`, o:`marilla_warm`,
   e:`"오늘 배리 부인 댁에 가자.\n다이애나라는 여자아이가 있단다."`},
  {bg:`ch3_path`, w:`anne`, in:1, f:`anne_sad`, o:`marilla_strict`, cam:`out`,
   e:`나는 가슴이 두근두근했어.\n"다이애나가 나를 안 좋아하면 어떡하죠?"`},
  {bg:`ch3`, w:`barry`, f:`anne_surprised`, o:`barry`, eff:{met:`barry`},
   e:`"어서 오렴. 다이애나, 앤에게 꽃밭을 보여 주렴."`},
  {bg:`ch3_garden`, w:`anne`, in:1, f:`anne_surprised`, o:`diana`, eff:{met:`diana`}, cam:`in`,
   e:`검은 머리에 볼이 발그레한 여자아이야.\n다이애나가 웃고 있어.`},
  {t:`choice`, id:`C2`, kind:`talk`, label:`첫마디`, f:`anne_surprised`, o:`diana`,
   q:{e:`앤은 다이애나에게 뭐라고 말할까요?`},
   note:{e:`원작의 앤은 "나를 조금이라도 좋아할 수 있니? 마음의 친구가 될 만큼?" 하고 물어요.`},
   opts:[
    {type:`canon`, go:`d_c`, eff:{heart:{diana:1}}, e:`"나랑 친구가 되어 줄래?"`},
    {type:`imag`, go:`d_i`, eff:{heart:{diana:1}, album:`s3_star`}, e:`"우리 같은 별에서 왔나 봐!"`}
   ]},
  {id:`d_c`, w:`anne`, f:`anne_surprised`, o:`diana`,
   e:`"다이애나, 나를 조금이라도 좋아할 수 있니?\n마음의 친구가 될 만큼?"`},
  {t:`goto`, to:`d_m`},
  {id:`d_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`,
   e:`"우리, 옛날에 같은 별에서 태어난\n자매였던 게 분명해!"`},
  {id:`d_m`, w:`diana`, f:`anne_happy`, o:`diana`,
   e:`다이애나가 웃었어.\n"그래, 좋아!"`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_happy`, o:`diana`,
   q:{e:`지금 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 아주 기뻐요. 처음으로 마음의 친구가 생겼거든요.`},
   opts:[
    {type:`feel`, ic:`😊`, ok:1, eff:{album:`s3_feel`}, e:`기뻐요`},
    {type:`feel`, ic:`😢`, e:`슬퍼요`},
    {type:`feel`, ic:`😨`, e:`무서워요`}
   ]},
  {t:`choice`, id:`C3`, kind:`act`, label:`우정의 맹세`, f:`anne_happy`, o:`diana`,
   q:{e:`이제 우정을 맹세해요.\n어떻게 할까요?`},
   note:{e:`원작의 앤과 다이애나는 손을 잡고 "해와 달이 있는 한 영원히 친구"라고 맹세해요.`},
   opts:[
    {type:`canon`, go:`v_c`, eff:{item:`vow`}, e:`손잡고 해와 달에 맹세해요`},
    {type:`imag`, go:`v_i`, eff:{item:`vow`}, e:`꽃 왕관을 쓰고 맹세해요`}
   ]},
  {id:`v_c`, w:`anne`, f:`anne_happy`, o:`diana`, cam:`up`,
   e:`우리는 손을 꼭 잡았어.\n"해와 달이 있는 한, 영원히 친구야!"`},
  {t:`goto`, to:`v_m`},
  {id:`v_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`, cam:`up`,
   e:`우리는 꽃 왕관을 썼어.\n"영원히 친구가 될 것을 맹세해!"`},
  {id:`v_m`, bg:`ch3_bridge`, w:`anne`, f:`anne_happy`, o:`diana`, cam:`out`,
   e:`우리는 통나무 다리에 갔어.\n다리 아래에 맑은 샘이 있었어.`},
  {t:`name`, id:`N3`, key:`spring`, canon:`드라이어드의 샘`, max:14, label:`샘의 이름`, f:`anne_dreamy`, o:`diana`,
   q:{e:`✍️ 맑은 샘에 이름을 지어 주세요!`},
   pick:[`드라이어드의 샘`, `요정의 거울`, `반짝 샘`],
   ph:`직접 써도 돼요`,
   note:{e:`원작의 앤은 '드라이어드의 샘'이라고 불러요. 드라이어드는 숲의 요정이에요.`}},
  {w:`anne`, f:`anne_happy`, o:`diana`,
   e:`"이제 여기는 '{spring}'야.\n우리 둘만의 비밀 장소야!"`},
  /* ---------- 초콜릿 ---------- */
  {bg:`ch2`, w:`matthew`, f:`anne_surprised`, o:`matthew`, cam:`in`,
   e:`그날 밤, 매슈 아저씨가\n초콜릿 사탕을 주셨어.`},
  {t:`choice`, id:`C4`, kind:`predict`, label:`초콜릿`, f:`anne_happy`, o:`matthew`,
   q:{e:`원작의 앤은 사탕을 어떻게 했을까요?`},
   note:{e:`원작의 앤은 "반은 다이애나에게 줘도 돼요?" 하고 물어요. 나누면 더 맛있대요.`},
   opts:[
    {type:`canon`, go:`ch_c`, eff:{item:`choco`, heart:{matthew:1}}, e:`다이애나와 나눠요`},
    {type:`imag`, go:`ch_i`, eff:{item:`choco`, heart:{matthew:1}}, e:`보물 상자에 넣어요`}
   ]},
  {id:`ch_c`, w:`anne`, f:`anne_happy`, o:`matthew`,
   e:`"반은 다이애나에게 줘도 되죠?\n나누면 두 배로 맛있거든요!"`},
  {t:`goto`, to:`ch_m`},
  {id:`ch_i`, w:`anne`, f:`anne_dreamy`, o:`matthew`, fx:`dream`,
   e:`"이건 '우정의 보석'이에요.\n보물 상자에 넣어 둘래요!"`},
  {id:`ch_m`, w:`marilla`, f:`anne_happy`, o:`marilla_warm`,
   e:`아주머니가 조용히 말씀하셨어.\n"앤은 욕심쟁이가 아니구나."`},
  {t:`ending`},
  {id:`E_canon`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_happy`, cam:`in`, eff:{album:`e_canon`},
   e:`나에게도 마음의 친구가 생겼어.\n오늘은 최고의 날이야!`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`창밖에 별 두 개가 반짝였어.\n하나는 나, 하나는 다이애나야.`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch2`, w:`anne`, f:`anne_happy`, o:`marilla_warm`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`"아주머니, 데려가 주셔서 고마워요.\n내일 또 다이애나를 만나도 돼요?"`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch2`, w:`marilla`, f:`anne_happy`, o:`marilla_warm`,
   e:`아주머니는 빙그레 웃으셨어.\n"그래, 내일 또 가려무나."`},
  {t:`endcard`}
  ]
});
