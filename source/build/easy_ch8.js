/* 쉬운 이야기 8장 · 초록 머리 (원작 27장) */
EASY.push({
  key: `ch8`, num: 8, bgm: `bgm_ch8.mp3`, title: `초록 머리`, orig: `원작 27장`, origTitle: `허영심과 마음고생`,
  bgKeys: [`ch8`, `ch8_porch`, `ch8_attic`, `ch8_mirror`],
  endings: {
    canon: {title: `이젠 익숙해진 수다`, label: `원작 결말`},
    imag:  {title: `붉은 머리를 사랑한 공주`, label: `상상 결말`},
    bal:   {title: `서로를 돌보는 저녁`, label: `균형 결말`}
  },
  items: {
    dye:{ic:`🧴`, name:`빈 염색약 병`, desc:`까맣게 된다고 했지만, 머리가 초록색이 된 염색약이에요.`},
    ribbon:{ic:`🎀`, name:`검은 리본`, desc:`짧은 머리에 두를 검은 벨벳 리본이에요.`}
  },
  album: [
    {id:`s8_potion`, ic:`⚗️`, name:`까마귀 물약`},
    {id:`s8_hero`, ic:`📚`, name:`책 속 주인공처럼`},
    {id:`s8_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`앤은 왜 머리를 염색하고 싶었을까요?`,
        `행상인의 말을 그대로 믿으면 안 되는 까닭은 무엇일까요?`,
        `내 모습 중에 좋은 점은 무엇인가요?`],
    l: [`앤은 왜 머리를 염색하고 싶었을까요?`,
        `행상인의 말을 그대로 믿으면 안 되는 까닭은 무엇일까요?`,
        `내 모습 중에 좋은 점은 무엇인가요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch4`, w:`anne`, in:1, f:`anne_happy`, cam:`out`,
   e:`시간이 흘러 봄이 왔어.\n하지만 나는 여전히 빨강 머리가 싫어.`},
  /* ---------- 행상인 ---------- */
  {bg:`ch8_porch`, w:`anne`, in:1, f:`anne_happy`, cam:`in`,
   e:`어느 날 물건 파는 아저씨가 왔어.\n상자에 신기한 물건이 가득했어.`},
  {w:`anne`, in:1, f:`anne_dreamy`,
   e:`"이 약을 바르면 머리가\n까마귀처럼 새까매진단다!"`},
  {t:`choice`, id:`C1`, kind:`act`, label:`염색약`, f:`anne_dreamy`,
   q:{e:`앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 염색약을 사서 바로 머리에 발라요. 새까만 머리가 너무 갖고 싶었거든요.`},
   opts:[
    {type:`canon`, go:`p_c`, eff:{item:`dye`}, e:`사서 바로 발라요`},
    {type:`imag`, go:`p_i`, eff:{item:`dye`, album:`s8_potion`}, e:`마법 물약이라 상상해요`}
   ]},
  {id:`p_c`, bg:`ch8_mirror`, w:`anne`, in:1, f:`anne_happy`,
   e:`나는 염색약을 샀어.\n다락방에서 머리에 몽땅 발랐어.`},
  {t:`goto`, to:`p_m`},
  {id:`p_i`, bg:`ch8_mirror`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`,
   e:`"까마귀의 마법이여!"\n나는 주문을 외우며 약을 발랐어.`},
  {id:`p_m`, w:`anne`, in:1, f:`anne_green_hair`, cam:`shake`,
   e:`그런데… 머리가 까매지지 않았어.\n초록색이 됐어!`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_green_hair`,
   q:{e:`초록 머리가 된 앤의 마음은요?`},
   note:{e:`원작의 앤은 너무 속상해서 베개에 얼굴을 묻고 울었어요.`},
   opts:[
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`😭`, ok:1, eff:{album:`s8_feel`}, e:`속상해요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {w:`marilla`, f:`anne_green_hair`, o:`marilla_strict`, cam:`in`,
   e:`아주머니가 다락방에 오셨어.\n"앤! 머리가 초록색이잖니!"`},
  {t:`choice`, id:`C2`, kind:`talk`, label:`솔직하게`, f:`anne_green_hair`, o:`marilla_strict`,
   q:{e:`앤은 뭐라고 말할까요?`},
   note:{e:`원작의 앤은 "빨강 머리가 싫어서 염색했어요."라고 솔직하게 말해요.`},
   opts:[
    {type:`canon`, go:`r_c`, e:`"빨강 머리가 싫었어요"`},
    {type:`imag`, go:`r_i`, e:`"공주가 되고 싶었어요"`}
   ]},
  {id:`r_c`, w:`anne`, f:`anne_green_hair`, o:`marilla_strict`,
   e:`"빨강 머리가 너무 싫었어요.\n까만 머리가 되고 싶었어요."`},
  {t:`goto`, to:`r_m`},
  {id:`r_i`, w:`anne`, f:`anne_green_hair`, o:`marilla_strict`, fx:`dream`,
   e:`"까만 머리 공주가 되고 싶었어요.\n딱 하루만이라도요."`},
  {id:`r_m`, w:`marilla`, f:`anne_green_hair`, o:`marilla_strict`,
   e:`"모르는 사람 말을\n그대로 믿으면 안 된다."`},
  {w:`anne`, in:1, f:`anne_green_hair`,
   e:`일주일 동안 머리를 감았어.\n그래도 초록색이 안 지워졌어.`},
  /* ---------- 자르기 ---------- */
  {bg:`ch2`, w:`marilla`, f:`anne_green_hair`, o:`marilla_strict`, cam:`in`,
   e:`"앤, 머리를 잘라야겠다.\n다른 방법이 없구나."`},
  {t:`choice`, id:`C3`, kind:`act`, label:`머리 자르기`, f:`anne_green_hair`, o:`marilla_strict`,
   q:{e:`머리를 자를 때 앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 "너무 슬퍼요!" 하며 자르는 내내 울어요.`},
   opts:[
    {type:`canon`, go:`h_c`, e:`자르는 내내 울어요`},
    {type:`imag`, go:`h_i`, eff:{album:`s8_hero`}, e:`책 속 주인공이라 상상해요`}
   ]},
  {id:`h_c`, look:`green`, w:`anne`, f:`anne_sad`, o:`marilla_strict`,
   e:`"너무 슬퍼요.\n자르시는 동안 울게요."`},
  {t:`goto`, to:`h_m`},
  {id:`h_i`, w:`anne`, f:`anne_dreamy`, o:`marilla_strict`, fx:`dream`,
   e:`나는 착한 일을 하려고\n머리카락을 판 책 속 주인공이야.`},
  {id:`h_m`, look:`short`, bg:`ch8_mirror`, w:`anne`, in:1, f:`anne_sad`, cam:`in`,
   e:`머리가 아주 짧아졌어.\n거울을 보니 너무 어색했어.`},
  {w:`anne`, in:1, f:`anne_happy`,
   e:`하지만 괜찮아.\n머리는 다시 자랄 거야.`},
  /* ---------- 학교 ---------- */
  {bg:`ch4`, w:`anne`, in:1, f:`anne_sad`, cam:`out`,
   e:`학교에서 조시가 놀렸어.\n"앤, 꼭 허수아비 같아!"`},
  {t:`choice`, id:`C4`, kind:`act`, label:`놀림받을 때`, f:`anne_sad`,
   q:{e:`앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 아무 말도 하지 않고 조시를 용서해요.`},
   opts:[
    {type:`canon`, go:`j_c`, e:`말없이 용서해요`},
    {type:`imag`, go:`j_i`, e:`"허수아비는 용감해!"`}
   ]},
  {id:`j_c`, w:`anne`, in:1, f:`anne_happy`,
   e:`나는 아무 말도 하지 않았어.\n그리고 조시를 용서했어.`},
  {t:`goto`, to:`j_m`},
  {id:`j_i`, w:`anne`, f:`anne_dreamy`, fx:`dream`,
   e:`"고마워! 허수아비는\n들판을 지키는 용감한 파수꾼이야."`},
  {id:`j_m`, bg:`ch2`, w:`anne`, f:`anne_happy`, o:`marilla_warm`, eff:{item:`ribbon`},
   e:`"다이애나가 그러는데,\n짧은 머리에 검은 리본을 두르래요!"`},
  {t:`name`, id:`N8`, key:`snood`, canon:`스누드`, max:14, label:`검은 리본의 이름`, f:`anne_happy`, o:`marilla_warm`,
   q:{e:`✍️ 검은 리본에 예쁜 이름을 지어 주세요!`},
   pick:[`스누드`, `밤하늘 리본`, `까만 나비`],
   ph:`직접 써도 돼요`,
   note:{e:`원작의 앤은 리본을 '스누드'라고 불러요. 옛날 아가씨들이 머리에 두르던 띠의 이름이에요.`}},
  {w:`anne`, f:`anne_happy`, o:`marilla_warm`,
   e:`"'{snood}'! 멋지죠?\n그런데 제가 말을 너무 많이 하나요?"`},
  {t:`ending`},
  {id:`E_canon`, w:`marilla`, f:`anne_happy`, o:`marilla_warm`, cam:`in`, eff:{album:`e_canon`},
   e:`"아니다. 네 수다는 싫지 않다.\n이젠 익숙해졌거든."`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch8_attic`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`나는 새 이야기를 썼어.\n"공주는 자기 빨강 머리를 사랑하게 되었어요."`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, w:`anne`, f:`anne_happy`, o:`marilla_warm`, cam:`in`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`아주머니가 머리가 아프시대.\n나는 찬 수건을 이마에 올려 드렸어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch8_attic`, w:`anne`, in:1, f:`anne_happy`, cam:`up`,
   e:`빨강 머리도, 짧은 머리도 다 나야.\n같은 실수는 두 번 안 할 거야!`},
  {t:`endcard`}
  ]
});
