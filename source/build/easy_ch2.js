/* 쉬운 이야기 2장 · 린드 부인의 독설 (원작 9~10장) */
EASY.push({
  key: `ch2`, num: 2, bgm: `bgm_ch2.mp3`, title: `린드 부인의 독설`, orig: `원작 9~10장`, origTitle: `레이첼 린드 부인, 깜짝 놀라다 · 앤의 사과`,
  bgKeys: [`ch2`, `ch2_room`, `ch2_lane`, `ch2_lynde`, `ch2_night`],
  endings: {
    canon: {title: `집에 가는 길`, label: `원작 결말`},
    imag:  {title: `바람이 된 앤`, label: `상상 결말`},
    bal:   {title: `아주머니의 손`, label: `균형 결말`}
  },
  items: {
    auburn:{ic:`🍂`, name:`적갈색의 희망`, desc:`"네 머리도 크면 예쁜 적갈색이 될 거다." 린드 부인의 말이에요.`},
    narcissi:{ic:`🤍`, name:`하얀 수선화`, desc:`린드 부인이 꺾어 가라고 한 하얀 꽃이에요.`}
  },
  album: [
    {id:`s2_hair`, ic:`🍁`, name:`노을빛 머리`},
    {id:`s2_play`, ic:`🎭`, name:`매슈 아저씨의 연극`},
    {id:`s2_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`린드 부인은 앤에게 어떤 말을 했나요? 그 말을 들은 앤의 마음은 어땠을까요?`,
        `앤은 왜 결국 사과하러 갔을까요?`,
        `친구에게 상처 주는 말을 들으면 어떻게 하면 좋을까요?`],
    l: [`린드 부인은 앤에게 어떤 말을 했나요? 그 말을 들은 앤의 마음은 어땠을까요?`,
        `앤은 왜 결국 사과하러 갔을까요?`,
        `친구에게 상처 주는 말을 들으면 어떻게 하면 좋을까요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_sad`, cam:`in`,
   e:`아저씨와 아주머니는 남자아이를 기다렸대.\n나는 밤새 울었어.`},
  {w:`anne`, in:1, f:`anne_happy`, o:`marilla_warm`, eff:{met:`marilla`},
   e:`그런데 마릴라 아주머니가 마음을 바꾸셨어.\n나는 초록 지붕 집에서 살게 됐어!`},
  {bg:`ch2_lane`, w:`anne`, in:1, f:`anne_happy`, cam:`out`,
   e:`나는 날마다 숲과 시냇가를 탐험했어.\n정말 신나는 날들이었어.`},
  /* ---------- 린드 부인 ---------- */
  {bg:`ch2`, w:`anne`, in:1, f:`anne_surprised`, o:`lynde`, eff:{met:`lynde`},
   e:`어느 날, 이웃집 린드 부인이 오셨어.\n부인은 나를 빤히 쳐다보셨어.`},
  {w:`lynde`, f:`anne_sad`, o:`lynde`, cam:`right`,
   e:`"세상에, 너무 말랐고 못생겼구나.\n머리는 홍당무처럼 빨갛네!"`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_angry`, o:`lynde`,
   q:{e:`이 말을 들은 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 몹시 화가 났어요. 생김새로 놀림받는 건 정말 아픈 일이니까요.`},
   opts:[
    {type:`feel`, ic:`😊`, e:`기뻐요`},
    {type:`feel`, ic:`😠`, ok:1, eff:{album:`s2_feel`}, e:`화나요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {t:`choice`, id:`C1`, kind:`predict`, label:`앤의 대답`, f:`anne_angry`, o:`lynde`,
   q:{e:`원작의 앤은 어떻게 했을까요?`},
   note:{e:`원작의 앤은 발을 쾅쾅 구르며 "아주머니가 미워요!" 하고 소리쳐요.`},
   opts:[
    {type:`canon`, go:`k_c`, e:`발을 구르며 소리쳐요`},
    {type:`imag`, go:`k_i`, e:`"제 머리는 노을 색이에요!"`}
   ]},
  {id:`k_c`, w:`anne`, f:`anne_angry`, o:`lynde`, cam:`shake`,
   e:`"아주머니가 미워요! 미워요!"\n나는 발을 쾅쾅 굴렀어.`},
  {t:`goto`, to:`k_m`},
  {id:`k_i`, w:`anne`, f:`anne_angry`, o:`lynde`, fx:`dream`, eff:{album:`s2_hair`},
   e:`"홍당무가 아니에요!\n제 머리는 노을과 단풍 색이에요!"`},
  {id:`k_m`, w:`marilla`, f:`anne_angry`, o:`marilla_strict`,
   e:`"앤! 네 방에 올라가 있어라."`},
  {bg:`ch2_room`, w:`anne`, in:1, f:`anne_sad`, cam:`in`,
   e:`나는 침대에 엎드려 엉엉 울었어.`},
  {w:`marilla`, f:`anne_sad`, o:`marilla_strict`,
   e:`"린드 부인께 가서 사과해라.\n사과할 때까지 방에 있거라."`},
  {w:`anne`, f:`anne_angry`, o:`marilla_strict`,
   e:`"싫어요! 하나도 안 미안해요!"`},
  /* ---------- 매슈 아저씨 ---------- */
  {w:`anne`, in:1, f:`anne_surprised`, o:`matthew`, cam:`in`,
   e:`밤이 되자 누가 문을 똑똑 두드렸어.\n매슈 아저씨였어!`},
  {w:`matthew`, f:`anne_sad`, o:`matthew`,
   e:`"앤, 그냥 사과하면 어떻겠니?\n네가 없으니 아래층이 쓸쓸하구나."`},
  {t:`choice`, id:`C2`, kind:`predict`, label:`매슈의 부탁`, f:`anne_sad`, o:`matthew`,
   q:{e:`원작의 앤은 뭐라고 대답했을까요?`},
   note:{e:`원작의 앤은 "아저씨를 위해서라면 할게요."라고 대답해요.`},
   opts:[
    {type:`canon`, go:`m_c`, eff:{heart:{matthew:1}}, e:`"아저씨를 위해 할게요"`},
    {type:`imag`, go:`m_i`, eff:{heart:{matthew:1}, album:`s2_play`}, e:`사과 연습을 같이 해요`}
   ]},
  {id:`m_c`, w:`anne`, f:`anne_sad`, o:`matthew`,
   e:`"아저씨를 위해서라면 할게요.\n사실 지금은 조금 부끄러워요."`},
  {t:`goto`, to:`m_m`},
  {id:`m_i`, w:`matthew`, f:`anne_happy`, o:`matthew`, fx:`dream`,
   e:`아저씨가 린드 부인 흉내를 내셨어.\n나는 웃음이 터졌어.`},
  {w:`anne`, f:`anne_happy`, o:`matthew`, fx:`dream`,
   e:`"알았어요. 진짜로 사과할게요!"`},
  {id:`m_m`, w:`matthew`, f:`anne_happy`, o:`matthew`,
   e:`"내가 이런 말 했다는 건\n마릴라한테 비밀이다."`},
  /* ---------- 사과 ---------- */
  {bg:`ch2_lynde`, w:`anne`, in:1, f:`anne_surprised`, o:`lynde`, cam:`in`,
   e:`나는 아주머니와 린드 부인 댁에 갔어.\n가슴이 쿵쾅쿵쾅 뛰었어.`},
  {t:`choice`, id:`C3`, kind:`act`, label:`사과하기`, f:`anne_sad`, o:`lynde`,
   q:{e:`앤은 어떻게 사과할까요?`},
   note:{e:`원작의 앤은 무릎을 꿇고 아주 큰 목소리로 정성껏 사과해요.`},
   opts:[
    {type:`canon`, go:`g_c`, e:`무릎 꿇고 사과해요`},
    {type:`imag`, go:`g_i`, e:`시를 읊으며 사과해요`}
   ]},
  {id:`g_c`, w:`anne`, f:`anne_sad`, o:`lynde`,
   e:`"린드 부인, 정말 너무너무 죄송해요!\n제발 용서해 주세요!"`},
  {t:`goto`, to:`g_m`},
  {id:`g_i`, w:`anne`, f:`anne_dreamy`, o:`lynde`, fx:`dream`,
   e:`"오, 린드 부인이시여!\n홍당무 소녀가 용서를 비나이다!"`},
  {id:`g_m`, w:`lynde`, f:`anne_happy`, o:`lynde`, eff:{item:`auburn`, heart:{lynde:2}},
   e:`"그래, 용서하마.\n네 머리도 크면 예쁜 적갈색이 될 거다."`},
  {w:`anne`, f:`anne_happy`, o:`lynde`,
   e:`"정말요? 부인이 저에게 희망을 주셨어요!"`},
  {w:`lynde`, f:`anne_happy`, o:`lynde`, eff:{item:`narcissi`},
   e:`"마당의 하얀 꽃도 꺾어 가렴."`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`사과한 뒤`, f:`anne_happy`, o:`lynde`,
   q:{e:`사과하고 나서 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 마음이 가벼워졌어요. 사과를 잘해서 뿌듯했대요.`},
   opts:[
    {type:`feel`, ic:`😌`, ok:1, e:`가벼워요`},
    {type:`feel`, ic:`😠`, e:`화나요`},
    {type:`feel`, ic:`😢`, e:`슬퍼요`}
   ]},
  {t:`ending`},
  {id:`E_canon`, bg:`ch2_night`, w:`anne`, f:`anne_happy`, o:`marilla_warm`, cam:`in`, eff:{album:`e_canon`},
   e:`나는 아주머니 손을 잡았어.\n"집에 가는 길은 참 좋아요."`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch2_night`, w:`anne`, f:`anne_dreamy`, o:`marilla_warm`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`"아주머니, 저는 지금 바람이에요!\n'{avenue}' 위로 휙 날아갈래요!"`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch2_night`, w:`marilla`, f:`anne_surprised`, o:`marilla_warm`, cam:`in`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`"앤, 나도 어릴 때 못생겼다는 말을 들었단다.\n그 말이 오래 아팠지."`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch2_night`, w:`anne`, in:1, f:`anne_happy`, o:`marilla_warm`,
   e:`저 멀리 초록 지붕 집 불빛이 보였어.\n내 집이 나를 기다리고 있었어.`},
  {t:`endcard`}
  ]
});
