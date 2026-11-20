/* 쉬운 이야기 10장 · 길모퉁이 (원작 32~38장) */
EASY.push({
  key: `ch10`, num: 10, bgm: `bgm_ch10.mp3`, title: `길모퉁이`, orig: `원작 32~38장`, origTitle: `길모퉁이`,
  bgKeys: [`ch10`, `ch10_pasture`, `ch10_hill`, `ch10_home`],
  midReport: true, finalReport: true,
  endings: {
    canon: {title: `세상은 평안하다`, label: `원작 결말`},
    imag:  {title: `이름 지은 길의 지도`, label: `상상 결말`},
    bal:   {title: `함께 공부하는 친구`, label: `균형 결말`}
  },
  items: {
    avery:{ic:`🏅`, name:`장학금`, desc:`앤이 열심히 공부해서 받은 상이에요.`},
    scotchRose:{ic:`🌹`, name:`하얀 장미`, desc:`매슈 아저씨가 가장 좋아하던 작고 하얀 장미예요.`},
    bend:{ic:`🛤️`, name:`길모퉁이`, desc:`"모퉁이를 돌면 좋은 것이 있을 거예요." 앤의 새 길이에요.`}
  },
  album: [
    {id:`s10_rest`, ic:`🐄`, name:`"제가 소를 몰게요"`},
    {id:`s10_rose`, ic:`🌹`, name:`장미 심기`},
    {id:`s10_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`매슈 아저씨는 앤에게 "남자아이 열두 명보다 네가 좋다"고 했어요. 이 말을 들은 앤은 어땠을까요?`,
        `앤은 왜 대학에 가지 않고 초록 지붕 집에 남았을까요?`,
        `앤과 길버트는 어떻게 친구가 되었나요?`],
    l: [`매슈 아저씨는 앤에게 "남자아이 열두 명보다 네가 좋다"고 했어요. 이 말을 들은 앤은 어땠을까요?`,
        `앤은 왜 대학에 가지 않고 초록 지붕 집에 남았을까요?`,
        `앤과 길버트는 어떻게 친구가 되었나요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch4`, w:`anne`, in:1, f:`anne_grown`, cam:`out`,
   e:`몇 년이 지났어. 나는 열여섯 살이야.\n열심히 공부해서 큰 상도 받았어.`},
  {bg:`ch10_home`, w:`anne`, in:1, f:`anne_grown`, eff:{item:`avery`},
   e:`가을에는 먼 곳에 있는\n대학에 가게 됐어!`},
  /* ---------- 매슈 ---------- */
  {bg:`ch10_pasture`, w:`anne`, in:1, f:`anne_grown`, o:`matthew`, cam:`out`,
   e:`저녁에 매슈 아저씨와 소를 몰러 갔어.\n아저씨는 많이 지쳐 보였어.`},
  {t:`choice`, id:`C1`, kind:`talk`, label:`매슈 아저씨께`, f:`anne_grown`, o:`matthew`,
   q:{e:`앤은 아저씨께 뭐라고 할까요?`},
   note:{e:`원작의 앤은 "제가 남자아이였다면 아저씨를 도와드릴 텐데요." 하고 말해요.`},
   opts:[
    {type:`canon`, go:`m_c`, e:`"제가 남자아이였다면…"`},
    {type:`imag`, go:`m_i`, eff:{heart:{matthew:1}, album:`s10_rest`}, e:`"오늘은 제가 소를 몰게요"`}
   ]},
  {id:`m_c`, w:`anne`, f:`anne_grown`, o:`matthew`,
   e:`"제가 남자아이였다면\n아저씨를 많이 도와드릴 텐데요."`},
  {t:`goto`, to:`m_m`},
  {id:`m_i`, w:`anne`, f:`anne_grown`, o:`matthew`,
   e:`"아저씨, 좀 쉬세요.\n오늘은 제가 소를 몰게요."`},
  {id:`m_m`, w:`matthew`, f:`anne_grown`, o:`matthew`, cam:`in`,
   e:`"앤, 나는 남자아이 열두 명보다\n네가 더 좋다."`},
  {w:`matthew`, f:`anne_grown`, o:`matthew`,
   e:`"너는 내가 자랑스러워하는\n내 딸이란다."`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_grown`, o:`matthew`,
   q:{e:`이 말을 들은 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 이 말을 평생 소중히 기억했어요.`},
   opts:[
    {type:`feel`, ic:`🥰`, ok:1, eff:{album:`s10_feel`}, e:`따뜻해요`},
    {type:`feel`, ic:`😠`, e:`화나요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  /* ---------- 이별 ---------- */
  {bg:`ch2`, w:`anne`, in:1, f:`anne_grown`, cam:`in`,
   e:`그런데 다음 날,\n매슈 아저씨가 쓰러지셨어.`},
  {w:`anne`, in:1, f:`anne_grown`,
   e:`아저씨는 그대로 하늘나라로 떠나셨어.\n심장이 많이 아프셨대.`},
  {bg:`ch2_room`, w:`anne`, in:1, f:`anne_grown`, cam:`in`,
   e:`처음에는 눈물도 나지 않았어.\n믿을 수가 없었어.`},
  {w:`marilla`, f:`anne_grown`, o:`marilla_warm`,
   e:`밤에 아주머니가 나를 안아 주셨어.\n우리는 함께 울었어.`},
  {w:`marilla`, f:`anne_grown`, o:`marilla_warm`, eff:{heart:{marilla:1}},
   e:`"앤, 나는 너를 정말 사랑한다.\n너는 나의 기쁨이란다."`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`함께 있는 마음`, f:`anne_grown`, o:`marilla_warm`,
   q:{e:`앤과 아주머니의 마음은 어떨까요?`},
   note:{e:`두 사람은 슬펐지만, 서로가 있어서 힘이 되었어요.`},
   opts:[
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`🫂`, ok:1, e:`슬프지만 서로 기대요`},
    {type:`feel`, ic:`😠`, e:`화나요`}
   ]},
  {bg:`ch7_garden`, w:`anne`, in:1, f:`anne_grown`, o:`allan`,
   e:`시간이 조금 흘렀어.\n나는 아저씨를 기억하고 싶었어.`},
  {t:`choice`, id:`C2`, kind:`act`, label:`아저씨를 기억하기`, f:`anne_grown`,
   q:{e:`앤은 무엇을 할까요?`},
   note:{e:`원작의 앤은 아저씨가 가장 좋아하던 하얀 장미를 아저씨 곁에 심어요.`},
   opts:[
    {type:`canon`, go:`r_c`, eff:{item:`scotchRose`, album:`s10_rose`}, e:`하얀 장미를 심어요`},
    {type:`imag`, go:`r_i`, eff:{item:`scotchRose`}, e:`꽃들에게 이야기를 들려줘요`}
   ]},
  {id:`r_c`, w:`anne`, in:1, f:`anne_grown`,
   e:`나는 아저씨 곁에 하얀 장미를 심었어.\n아저씨가 가장 좋아하던 꽃이야.`},
  {t:`goto`, to:`r_m`},
  {id:`r_i`, w:`anne`, in:1, f:`anne_grown`, fx:`dream`,
   e:`"얘들아, 너희를 가장 사랑한\n멋진 아저씨가 계셨어."`},
  /* ---------- 결심 ---------- */
  {id:`r_m`, bg:`ch2`, w:`marilla`, f:`anne_grown`, o:`marilla_strict`, cam:`in`,
   e:`아주머니가 눈이 많이 아프시대.\n"앤, 이 집을 팔아야겠구나."`},
  {t:`choice`, id:`C3`, kind:`act`, label:`앤의 결심`, f:`anne_grown`, o:`marilla_strict`,
   q:{e:`초록 지붕 집을 팔아야 한대요.\n앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 대학에 가지 않기로 해요. 아주머니 곁에 남아 선생님이 되기로 했어요.`},
   opts:[
    {type:`canon`, go:`h_c`, eff:{item:`bend`}, e:`대학에 안 가고 남아요`},
    {type:`imag`, go:`h_i`, eff:{item:`bend`}, e:`집을 '꿈의 학교'로 만들어요`}
   ]},
  {id:`h_c`, w:`anne`, f:`anne_grown`, o:`marilla_warm`,
   e:`"집을 팔면 안 돼요.\n저는 대학에 안 가고 여기 있을게요."`},
  {t:`goto`, to:`h_m`},
  {id:`h_i`, w:`anne`, f:`anne_grown`, o:`marilla_warm`, fx:`dream`,
   e:`"여기를 '꿈의 학교'로 만들어요!\n여기서 가르치고, 여기서 배울게요."`},
  {id:`h_m`, w:`anne`, in:1, f:`anne_grown`, cam:`up`,
   e:`"제 앞에 곧은길이 있었는데\n이제 길모퉁이가 생겼어요."`},
  {w:`anne`, in:1, f:`anne_grown`,
   e:`"모퉁이를 돌면 무엇이 있을까요?\n분명 좋은 것이 있을 거예요."`},
  /* ---------- 길버트 ---------- */
  {bg:`ch10`, w:`lynde`, f:`anne_grown`, o:`lynde`, cam:`in`,
   e:`"앤, 길버트가 너에게\n가까운 학교 선생님 자리를 양보했대."`},
  {bg:`ch10_hill`, w:`anne`, in:1, f:`anne_grown`, cam:`out`,
   e:`저녁에 언덕길을 걷다가\n길버트를 만났어.`},
  {t:`choice`, id:`C4`, kind:`talk`, label:`길버트에게`, f:`anne_grown`, o:`gilbert_grown`,
   q:{e:`앤은 길버트에게 뭐라고 할까요?`},
   note:{e:`원작의 앤은 손을 내밀며 "고마워. 그날 이미 용서했어."라고 말해요. 둘은 드디어 친구가 돼요.`},
   opts:[
    {type:`canon`, go:`g_c`, eff:{heart:{gilbert:2}}, e:`"고마워. 이미 용서했어"`},
    {type:`imag`, go:`g_i`, eff:{heart:{gilbert:2}}, e:`"공주가 대답할게. 친구 하자!"`}
   ]},
  {id:`g_c`, w:`anne`, f:`anne_grown`, o:`gilbert_grown`, cam:`in`,
   e:`"길버트, 정말 고마워.\n사실 그날 이미 용서했어."`},
  {t:`goto`, to:`g_m`},
  {id:`g_i`, w:`anne`, f:`anne_grown`, o:`gilbert_grown`, cam:`in`,
   e:`"그날의 공주가 이제 대답할게.\n우리, 친구 하자!"`},
  {id:`g_m`, w:`gilbert`, f:`anne_grown`, o:`gilbert_grown`, eff:{met:`gilbert`},
   e:`"좋아! 우리는 좋은 친구가 될 거야.\n집까지 바래다줄게."`},
  {t:`name`, id:`N10`, key:`bend`, free:true, max:30, label:`길모퉁이 너머`, f:`anne_grown`, o:`gilbert_grown`,
   q:{e:`✍️ 앤의 길모퉁이 너머에는\n무엇이 있으면 좋을까요?`},
   pick:[`좋은 선생님이 된 앤`, `친구들과 웃는 날`, `새로운 꿈`],
   ph:`직접 써도 돼요`,
   note:{e:`원작의 앤은 모퉁이 너머에 가장 좋은 것이 있다고 믿어요.`}},
  {t:`ending`},
  {id:`E_canon`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_grown`, cam:`up`, eff:{album:`e_canon`},
   e:`그날 밤 창밖에 별이 반짝였어.\n"세상은 모두 평안하구나."`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_grown`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`나는 내가 이름 지은 길들의 지도를 그렸어.\n'{avenue}', '{spring}', '{vale}'….`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch10`, w:`diana`, f:`anne_grown`, o:`diana_grown`, cam:`in`, eff:{album:`e_bal`, heart:{diana:1, marilla:1}},
   e:`주말이면 길버트와 다이애나가 왔어.\n우리는 함께 공부했어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch10_hill`, w:`anne`, in:1, f:`anne_grown`, cam:`out`,
   e:`모퉁이 너머에는 '{bend}'{bend|이} 있을 거야.\n함께 걸어 줘서 고마워!`},
  {t:`endcard`}
  ]
});
