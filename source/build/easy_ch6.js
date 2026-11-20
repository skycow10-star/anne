/* 쉬운 이야기 6장 · 미니 메이를 구한 밤 (원작 18장) */
EASY.push({
  key: `ch6`, num: 6, bgm: `bgm_ch6.mp3`, title: `미니 메이를 구한 밤`, orig: `원작 18장`, origTitle: `앤, 구조에 나서다`,
  bgKeys: [`ch6`, `ch6_snow`, `ch6_barry`, `ch6_morning`],
  endings: {
    canon: {title: `다시 친구가 된 날`, label: `원작 결말`},
    imag:  {title: `겨울밤 구조대`, label: `상상 결말`},
    bal:   {title: `다 함께 고마워`, label: `균형 결말`}
  },
  items: {
    jamKey:{ic:`🗝️`, name:`찬장 열쇠`, desc:`공부를 마칠 때까지 책을 잠가 둔 찬장 열쇠예요.`},
    star:{ic:`⭐`, name:`겨울 별`, desc:`다이애나와 다시 친구가 된 날 밤에 본 별이에요.`}
  },
  album: [
    {id:`s6_book`, ic:`📕`, name:`봉인된 마법서`},
    {id:`s6_story`, ic:`👶`, name:`용감한 아기 공주 이야기`},
    {id:`s6_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`앤은 어떻게 미니 메이를 구할 수 있었나요?`,
        `배리 부인은 왜 앤에게 사과했을까요?`,
        `위급할 때 침착하려면 어떻게 해야 할까요?`],
    l: [`앤은 어떻게 미니 메이를 구할 수 있었나요?`,
        `배리 부인은 왜 앤에게 사과했을까요?`,
        `위급할 때 침착하려면 어떻게 해야 할까요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch6`, w:`anne`, in:1, f:`anne_happy`, cam:`in`,
   e:`겨울이 왔어.\n다이애나와는 아직 놀 수 없어.`},
  {w:`anne`, in:1, f:`anne_happy`,
   e:`오늘 친구가 재미있는 책을 빌려줬어.\n그런데 숙제를 먼저 해야 해.`},
  {t:`choice`, id:`C1`, kind:`act`, label:`새 책`, f:`anne_happy`,
   q:{e:`읽고 싶은 책이 있어요.\n앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 책을 찬장에 넣고 잠가요. 그리고 열쇠를 매슈 아저씨께 맡겨요.`},
   opts:[
    {type:`canon`, go:`k_c`, eff:{item:`jamKey`}, e:`찬장에 잠가 둬요`},
    {type:`imag`, go:`k_i`, eff:{album:`s6_book`}, e:`마법의 책이라 상상해요`}
   ]},
  {id:`k_c`, w:`anne`, f:`anne_happy`, o:`matthew`,
   e:`"아저씨, 열쇠를 맡아 주세요.\n숙제를 다 하면 주세요!"`},
  {t:`goto`, to:`k_m`},
  {id:`k_i`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`,
   e:`이 책은 봉인된 마법서야.\n숙제를 다 해야 열리는 거야!`},
  /* ---------- 다이애나 ---------- */
  {id:`k_m`, w:`anne`, in:1, f:`anne_surprised`, o:`diana`, cam:`shake`,
   e:`그날 밤, 누가 문을 쾅쾅 두드렸어.\n다이애나였어!`},
  {w:`diana`, f:`anne_surprised`, o:`diana`,
   e:`"앤, 미니 메이가 많이 아파!\n숨을 잘 못 쉬어!"`},
  {w:`anne`, in:1, f:`anne_surprised`, o:`diana`,
   e:`미니 메이는 다이애나의 아기 동생이야.\n집에는 어른이 아무도 없대.`},
  {t:`choice`, id:`C2`, kind:`talk`, label:`다이애나에게`, f:`anne_surprised`, o:`diana`,
   q:{e:`앤은 다이애나에게 뭐라고 할까요?`},
   note:{e:`원작의 앤은 "걱정 마. 나는 어떻게 하는지 알아!" 하고 말해요. 고아원에서 아기들을 많이 돌봤거든요.`},
   opts:[
    {type:`canon`, go:`t_c`, eff:{heart:{diana:1}}, e:`"걱정 마, 내가 알아!"`},
    {type:`imag`, go:`t_i`, eff:{heart:{diana:1}}, e:`"우리는 겨울밤 구조대야!"`}
   ]},
  {id:`t_c`, w:`anne`, f:`anne_happy`, o:`diana`,
   e:`"울지 마. 나는 어떻게 하는지 알아.\n아기들을 많이 돌봐 봤거든!"`},
  {t:`goto`, to:`t_m`},
  {id:`t_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`,
   e:`"걱정 마! 오늘 밤 우리는\n겨울밤 구조대야!"`},
  {id:`t_m`, bg:`ch6_snow`, w:`anne`, in:1, f:`anne_dreamy`, o:`diana`, cam:`out`,
   e:`나는 약병을 챙겨서 달렸어.\n눈 덮인 들판에 달이 밝았어.`},
  /* ---------- 배리 씨네 ---------- */
  {bg:`ch6_barry`, w:`anne`, in:1, f:`anne_surprised`, o:`minnie_may`, cam:`in`,
   e:`미니 메이는 열이 펄펄 났어.\n숨소리가 쌕쌕 거칠었어.`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`다이애나의 마음`, f:`anne_surprised`, o:`diana`,
   q:{e:`다이애나의 마음은 어떨까요?`},
   note:{e:`원작의 다이애나는 너무 무서웠어요. 동생이 많이 아팠으니까요.`},
   opts:[
    {type:`feel`, ic:`😨`, ok:1, eff:{album:`s6_feel`}, e:`무서워요`},
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {t:`choice`, id:`C3`, kind:`act`, label:`가장 먼저`, f:`anne_surprised`, o:`minnie_may`,
   q:{e:`앤은 무엇부터 할까요?`},
   note:{e:`원작의 앤은 물을 끓이게 하고, 차분하게 아기에게 약을 먹여요.`},
   opts:[
    {type:`canon`, go:`m_c`, e:`차분하게 일을 나눠요`},
    {type:`imag`, go:`m_i`, eff:{album:`s6_story`}, e:`아기에게 이야기를 들려줘요`}
   ]},
  {id:`m_c`, w:`anne`, f:`anne_happy`, o:`diana`,
   e:`"다이애나, 물을 끓여 줘.\n나는 아기에게 약을 먹일게."`},
  {t:`goto`, to:`m_m`},
  {id:`m_i`, w:`anne`, f:`anne_dreamy`, o:`minnie_may`, fx:`dream`,
   e:`"옛날에 용감한 아기 공주가 살았어."\n나는 이야기하며 약을 먹였어.`},
  {id:`m_m`, w:`anne`, in:1, f:`anne_sad`, o:`minnie_may`,
   e:`밤새 아기를 돌봤어.\n나도 많이 무서웠지만 참았어.`},
  {w:`anne`, in:1, f:`anne_happy`, o:`minnie_may`, cam:`in`,
   e:`새벽이 되자, 미니 메이가 편하게 숨을 쉬었어.\n이제 괜찮아!`},
  {w:`doctor`, f:`anne_happy`, o:`doctor`,
   e:`늦게 오신 의사 선생님이 말씀하셨어.\n"이 아이가 아기를 살렸구나!"`},
  /* ---------- 아침 ---------- */
  {bg:`ch6_morning`, w:`anne`, f:`anne_happy`, o:`matthew`, cam:`out`,
   e:`아침에 아저씨와 집에 왔어.\n서리가 반짝반짝 빛났어.`},
  {bg:`ch3`, w:`barry`, f:`anne_surprised`, o:`barry`, cam:`in`,
   e:`오후에 배리 부인이 나를 부르셨어.\n"앤, 정말 고맙구나. 그리고 미안하다."`},
  {t:`choice`, id:`C4`, kind:`talk`, label:`배리 부인에게`, f:`anne_happy`, o:`barry`,
   q:{e:`앤은 뭐라고 대답할까요?`},
   note:{e:`원작의 앤은 "지난 일은 다 잊을게요."라고 말해요. 그리고 다이애나와 다시 친구가 돼요.`},
   opts:[
    {type:`canon`, go:`f_c`, eff:{heart:{barry:2}}, e:`"지난 일은 다 잊을게요"`},
    {type:`imag`, go:`f_i`, eff:{heart:{barry:2}}, e:`"여기는 화해의 성이에요!"`}
   ]},
  {id:`f_c`, w:`anne`, f:`anne_happy`, o:`barry`,
   e:`"괜찮아요, 부인.\n지난 일은 다 잊을게요."`},
  {t:`goto`, to:`f_m`},
  {id:`f_i`, w:`anne`, f:`anne_dreamy`, o:`barry`, fx:`dream`,
   e:`"오늘부터 이 집은\n저에게 '화해의 성'이에요!"`},
  {id:`f_m`, w:`diana`, f:`anne_happy`, o:`diana`, eff:{item:`star`, heart:{diana:1}},
   e:`"앤, 이제 다시 같이 놀 수 있어!"\n우리는 꼭 껴안았어.`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`다시 만난 친구`, f:`anne_happy`, o:`diana`,
   q:{e:`다이애나를 다시 만난 앤의 마음은요?`},
   note:{e:`원작의 앤은 너무 행복해서 하늘을 날 것 같았대요.`},
   opts:[
    {type:`feel`, ic:`😢`, e:`슬퍼요`},
    {type:`feel`, ic:`🥰`, ok:1, e:`행복해요`},
    {type:`feel`, ic:`😠`, e:`화나요`}
   ]},
  {t:`ending`},
  {id:`E_canon`, bg:`ch6_snow`, w:`anne`, f:`anne_happy`, o:`marilla_warm`, cam:`up`, eff:{album:`e_canon`},
   e:`"아주머니, 오늘은 정말 행복해요!\n다이애나와 다시 친구가 됐어요."`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch6_snow`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`겨울밤 구조대의 임무 성공!\n별들이 우리에게 박수를 쳐 주었어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch6`, w:`marilla`, f:`anne_happy`, o:`marilla_warm`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`"앤, 정말 장하구나."\n아주머니가 내 머리를 쓰다듬으셨어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_happy`,
   e:`오늘 밤엔 기도를 오래 할 거야.\n감사한 일이 정말 많거든.`},
  {t:`endcard`}
  ]
});
