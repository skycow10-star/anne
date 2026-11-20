/* 쉬운 이야기 4장 · 홍당무 석판 사건 (원작 15장) */
EASY.push({
  key: `ch4`, num: 4, bgm: `bgm_ch4.mp3`, title: `홍당무 석판 사건`, orig: `원작 15장`, origTitle: `찻잔 속의 폭풍`,
  bgKeys: [`ch4`, `ch4_birch`, `ch4_spruce`, `ch4_yard`],
  endings: {
    canon: {title: `학교에 안 갈래요`, label: `원작 결말`},
    imag:  {title: `용을 이긴 공주`, label: `상상 결말`},
    bal:   {title: `내일은 다시 학교로`, label: `균형 결말`}
  },
  items: {
    slate:{ic:`🪨`, name:`금 간 석판`, desc:`앤이 화가 나서 내리친 석판이에요. 쩍 금이 갔어요.`},
    candy:{ic:`💗`, name:`하트 사탕`, desc:`길버트가 준 "너는 달콤해" 사탕. 앤은 받지 않았어요.`}
  },
  album: [
    {id:`s4_dragon`, ic:`🐉`, name:`불 뿜는 용`},
    {id:`s4_wall`, ic:`🪟`, name:`보이지 않는 유리벽`},
    {id:`s4_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`길버트는 앤을 뭐라고 놀렸나요? 앤은 왜 그렇게 화가 났을까요?`,
        `길버트가 사과했을 때 앤이 받아 주었다면 어떻게 되었을까요?`,
        `화가 많이 날 때, 나는 어떻게 마음을 가라앉히나요?`],
    l: [`길버트는 앤을 뭐라고 놀렸나요? 앤은 왜 그렇게 화가 났을까요?`,
        `길버트가 사과했을 때 앤이 받아 주었다면 어떻게 되었을까요?`,
        `화가 많이 날 때, 나는 어떻게 마음을 가라앉히나요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch4_birch`, w:`anne`, in:1, f:`anne_happy`, o:`diana`, cam:`out`,
   e:`나는 다이애나와 학교에 다녀.\n학교 가는 숲길은 정말 예뻐.`},
  {w:`anne`, f:`anne_dreamy`, o:`diana`,
   e:`"봄이면 제비꽃이 피는 골짜기가 있어.\n이름을 지어 주자!"`},
  {t:`name`, id:`N4`, key:`vale`, canon:`제비꽃 골짜기`, max:14, label:`숲속 골짜기의 이름`, f:`anne_dreamy`, o:`diana`,
   q:{e:`✍️ 제비꽃이 피는 골짜기에 이름을 지어 주세요!`},
   pick:[`제비꽃 골짜기`, `보라 꽃 마을`, `초록 비밀 정원`],
   ph:`직접 써도 돼요`,
   note:{e:`원작의 앤은 '제비꽃 골짜기'라고 불러요.`}},
  {w:`diana`, f:`anne_happy`, o:`diana`,
   e:`"'{vale}'! 멋진 이름이야.\n그런데 오늘 길버트가 학교에 온대."`},
  {w:`diana`, f:`anne_surprised`, o:`diana`,
   e:`"길버트는 공부를 잘해.\n그리고 여자애들을 잘 놀려."`},
  /* ---------- 교실 ---------- */
  {bg:`ch4`, w:`anne`, in:1, f:`anne_surprised`, o:`gilbert`, eff:{met:`gilbert`}, cam:`in`,
   e:`길버트가 나를 자꾸 쳐다봤어.\n하지만 나는 창밖만 봤어.`},
  {w:`gilbert`, f:`anne_angry`, o:`gilbert`, cam:`shake`,
   e:`길버트가 내 머리를 잡아당겼어.\n"홍당무! 홍당무!"`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_angry`, o:`gilbert`,
   q:{e:`지금 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 너무 화가 났어요. 앤이 가장 싫어하는 말이 '홍당무'였거든요.`},
   opts:[
    {type:`feel`, ic:`😊`, e:`즐거워요`},
    {type:`feel`, ic:`😴`, e:`심심해요`},
    {type:`feel`, ic:`😠`, ok:1, eff:{album:`s4_feel`}, e:`화나요`}
   ]},
  {t:`choice`, id:`C1`, kind:`predict`, label:`홍당무!`, f:`anne_angry`, o:`gilbert`,
   q:{e:`원작의 앤은 어떻게 했을까요?`},
   note:{e:`원작의 앤은 석판으로 길버트의 머리를 "퍽!" 내리쳐요. 석판이 쩍 갈라졌어요.`},
   opts:[
    {type:`canon`, go:`h_c`, eff:{item:`slate`}, e:`석판으로 머리를 내리쳐요`},
    {type:`imag`, go:`h_i`, eff:{item:`slate`, album:`s4_dragon`}, e:`불 뿜는 용이 돼요`}
   ]},
  {id:`h_c`, w:`anne`, f:`anne_angry`, o:`gilbert`, cam:`shake`,
   e:`퍽! 나는 석판으로 길버트 머리를 내리쳤어.\n석판이 쩍 갈라졌어.`},
  {t:`goto`, to:`h_m`},
  {id:`h_i`, w:`anne`, f:`anne_angry`, o:`gilbert`, fx:`dream`, cam:`shake`,
   e:`나는 불을 뿜는 용이 됐어!\n쾅! 석판을 책상에 내리쳤어.`},
  {id:`h_m`, w:`phillips`, f:`anne_sad`, o:`phillips`, eff:{met:`phillips`},
   e:`"앤 셜리! 칠판 앞에 서 있어라!"\n선생님이 화를 내셨어.`},
  {bg:`ch4_yard`, w:`gilbert`, f:`anne_angry`, o:`gilbert`, cam:`in`,
   e:`학교가 끝나고 길버트가 말했어.\n"앤, 놀려서 정말 미안해."`},
  {t:`choice`, id:`C2`, kind:`act`, label:`길버트의 사과`, f:`anne_angry`, o:`gilbert`,
   q:{e:`앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 쳐다보지도 않고 지나가요. 아직 너무 화가 났거든요.`},
   opts:[
    {type:`canon`, go:`s_c`, e:`못 들은 척 지나가요`},
    {type:`imag`, go:`s_i`, e:`"별 백 개를 따 와!"`}
   ]},
  {id:`s_c`, w:`anne`, f:`anne_angry`, o:`gilbert`,
   e:`나는 길버트를 쳐다보지도 않고\n휙 지나가 버렸어.`},
  {t:`goto`, to:`s_m`},
  {id:`s_i`, w:`anne`, f:`anne_dreamy`, o:`gilbert`, fx:`dream`,
   e:`"용서받고 싶으면\n하늘에서 별 백 개를 따 와!"`},
  /* ---------- 벌 ---------- */
  {id:`s_m`, bg:`ch4_spruce`, w:`anne`, in:1, f:`anne_happy`, cam:`out`,
   e:`며칠 뒤, 점심시간에 숲에서 놀았어.\n그만 학교에 늦고 말았어.`},
  {bg:`ch4`, w:`phillips`, f:`anne_surprised`, o:`phillips`,
   e:`"앤 셜리, 벌로\n길버트 옆자리에 앉아라!"`},
  {t:`choice`, id:`C3`, kind:`act`, label:`길버트 옆자리`, f:`anne_sad`, o:`gilbert`,
   q:{e:`늦은 아이는 많은데 앤만 벌을 받았어요.\n앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 길버트 옆에 앉아 책상에 얼굴을 파묻어요. 너무 창피했거든요.`},
   opts:[
    {type:`canon`, go:`w_c`, e:`책상에 얼굴을 묻어요`},
    {type:`imag`, go:`w_i`, eff:{album:`s4_wall`}, e:`유리벽이 있다고 상상해요`}
   ]},
  {id:`w_c`, w:`anne`, in:1, f:`anne_sad`,
   e:`나는 책상에 얼굴을 파묻었어.\n너무 창피했어.`},
  {t:`goto`, to:`w_m`},
  {id:`w_i`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`,
   e:`나와 길버트 사이에\n보이지 않는 유리벽이 있어!`},
  {id:`w_m`, w:`gilbert`, f:`anne_sad`, o:`gilbert`, eff:{item:`candy`},
   e:`길버트가 하트 사탕을 내밀었어.\n"너는 달콤해"라고 쓰여 있었어.`},
  {w:`anne`, f:`anne_angry`, o:`gilbert`,
   e:`나는 사탕을 받지 않았어.\n그리고 책을 챙겨 집으로 갔어.`},
  {bg:`ch2`, w:`anne`, f:`anne_angry`, o:`marilla_strict`,
   e:`"아주머니, 저는 이제 학교에 안 갈래요!"`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`마릴라의 마음`, f:`anne_angry`, o:`marilla_strict`,
   q:{e:`마릴라 아주머니의 마음은 어떨까요?`},
   note:{e:`원작의 마릴라 아주머니는 걱정이 됐어요. 그래서 린드 부인께 의논하러 갔어요.`},
   opts:[
    {type:`feel`, ic:`😟`, ok:1, e:`걱정돼요`},
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {w:`marilla`, f:`anne_sad`, o:`marilla_warm`,
   e:`아주머니는 린드 부인께 물어보셨어.\n"잠깐 쉬게 두렴. 곧 다시 갈 거야."`},
  {t:`ending`},
  {id:`E_canon`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_sad`, cam:`in`, eff:{album:`e_canon`},
   e:`나는 집에서 혼자 공부하기로 했어.\n길버트는 절대 용서 안 할 거야!`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`꿈속에서 나는 용을 이긴 공주였어.\n용은 길버트를 꼭 닮았어!`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_sad`, o:`marilla_warm`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`"조금만 쉬고, 다시 학교에 갈게요."\n아주머니가 고개를 끄덕이셨어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch1_home`, w:`matthew`, f:`anne_happy`, o:`matthew`,
   e:`매슈 아저씨가 웃으며 말씀하셨어.\n"앤은 곧 괜찮아질 거다."`},
  {t:`endcard`}
  ]
});
