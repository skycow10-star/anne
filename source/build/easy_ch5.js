/* 쉬운 이야기 5장 · 다과회 소동 (원작 16~17장) */
EASY.push({
  key: `ch5`, num: 5, bgm: `bgm_ch5.mp3`, title: `다과회 소동`, orig: `원작 16~17장`, origTitle: `다이애나를 초대한 다과회의 비극`,
  bgKeys: [`ch5`, `ch5_orchard`, `ch5_dusk`],
  endings: {
    canon: {title: `다시 학교로`, label: `원작 결말`},
    imag:  {title: `언젠가 다시`, label: `상상 결말`},
    bal:   {title: `기다리는 마음`, label: `균형 결말`}
  },
  items: {
    lock:{ic:`🖤`, name:`다이애나의 머리카락`, desc:`헤어지며 받은 다이애나의 곱슬머리 한 타래예요.`},
    pebble:{ic:`🪨`, name:`이름 새긴 조약돌`, desc:`서로의 이름을 새겨 나눠 가진 조약돌이에요.`}
  },
  album: [
    {id:`s5_party`, ic:`👑`, name:`여왕의 연회`},
    {id:`s5_potion`, ic:`🍷`, name:`루비 물약`},
    {id:`s5_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`앤은 다이애나에게 무엇을 잘못 주었나요?`,
        `배리 부인은 왜 앤을 오해했을까요?`,
        `친구와 헤어질 때 앤은 어떤 마음이었을까요?`],
    l: [`앤은 다이애나에게 무엇을 잘못 주었나요?`,
        `배리 부인은 왜 앤을 오해했을까요?`,
        `친구와 헤어질 때 앤은 어떤 마음이었을까요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch5_orchard`, w:`anne`, in:1, f:`anne_happy`, cam:`out`,
   e:`가을이 왔어. 나는 다시 학교에 다녀.\n빨간 단풍잎이 예쁘게 떨어져.`},
  {bg:`ch2`, w:`marilla`, f:`anne_happy`, o:`marilla_warm`,
   e:`"앤, 다이애나를 초대해서\n차를 마셔도 된다."`},
  {w:`anne`, f:`anne_happy`, o:`marilla_warm`, cam:`up`,
   e:`"정말요? 저의 첫 다과회예요!"`},
  {t:`choice`, id:`C1`, kind:`talk`, label:`다과회 계획`, f:`anne_happy`, o:`marilla_warm`,
   q:{e:`앤은 어떤 다과회를 하고 싶을까요?`},
   note:{e:`원작의 앤은 어른처럼 차를 따르고 싶어 해요. 다이애나에게 "설탕 넣을래?" 하고 물어볼 거래요.`},
   opts:[
    {type:`canon`, go:`p_c`, e:`어른처럼 차를 따라요`},
    {type:`imag`, go:`p_i`, eff:{album:`s5_party`}, e:`여왕의 연회를 열어요`}
   ]},
  {id:`p_c`, w:`anne`, f:`anne_happy`, o:`marilla_warm`,
   e:`"제가 차를 따를 거예요.\n'설탕 넣을래?' 하고 물어볼래요!"`},
  {t:`goto`, to:`p_m`},
  {id:`p_i`, w:`anne`, f:`anne_dreamy`, o:`marilla_warm`, fx:`dream`,
   e:`"거실은 여왕의 연회장이에요.\n다이애나는 이웃 나라 공주님이고요!"`},
  {id:`p_m`, w:`marilla`, f:`anne_happy`, o:`marilla_strict`,
   e:`"찬장에 산딸기 주스가 있다.\n그걸 마시렴."`},
  /* ---------- 다과회 ---------- */
  {bg:`ch5`, w:`anne`, in:1, f:`anne_happy`, o:`diana`, cam:`in`,
   e:`다이애나가 왔어!\n우리는 과수원에서 신나게 놀았어.`},
  {w:`anne`, in:1, f:`anne_surprised`,
   e:`찬장에서 빨간 병을 찾았어.\n이게 산딸기 주스인가 봐.`},
  {t:`choice`, id:`C2`, kind:`act`, label:`빨간 병`, f:`anne_happy`, o:`diana`,
   q:{e:`앤은 빨간 병을 어떻게 할까요?`},
   note:{e:`원작의 앤은 큰 잔에 따라 주며 "마음껏 마셔!" 해요. 하지만 그건 주스가 아니었어요.`},
   opts:[
    {type:`canon`, go:`r_c`, e:`큰 잔에 따라 줘요`},
    {type:`imag`, go:`r_i`, eff:{album:`s5_potion`}, e:`'루비 물약'이라 불러요`}
   ]},
  {id:`r_c`, w:`anne`, f:`anne_happy`, o:`diana`,
   e:`"마음껏 마셔, 다이애나!"\n다이애나는 세 잔이나 마셨어.`},
  {t:`goto`, to:`r_m`},
  {id:`r_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`,
   e:`"공주님, 루비 물약을 드세요!"\n다이애나는 세 잔이나 마셨어.`},
  {id:`r_m`, w:`diana`, f:`anne_surprised`, o:`diana`, cam:`shake`,
   e:`"앤, 나 머리가 빙글빙글 돌아….\n집에 갈래."`},
  {bg:`ch2`, w:`marilla`, f:`anne_surprised`, o:`marilla_strict`, cam:`in`,
   e:`"앤! 이건 주스가 아니라\n열매로 담근 술이잖니!"`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_sad`, o:`marilla_strict`,
   q:{e:`이 말을 들은 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 너무 놀랐어요. 일부러 그런 게 아니었으니까요.`},
   opts:[
    {type:`feel`, ic:`😲`, ok:1, eff:{album:`s5_feel`}, e:`깜짝 놀라요`},
    {type:`feel`, ic:`😊`, e:`즐거워요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {w:`anne`, in:1, f:`anne_sad`,
   e:`아주머니가 병을 잘못 두신 거였어.\n나는 정말 몰랐어.`},
  /* ---------- 배리 부인 ---------- */
  {bg:`ch5_dusk`, w:`barry`, f:`anne_sad`, o:`barry`, cam:`in`,
   e:`배리 부인은 몹시 화가 나셨어.\n"이제 다이애나랑 놀지 마라!"`},
  {t:`choice`, id:`C3`, kind:`act`, label:`용서를 빌기`, f:`anne_sad`, o:`barry`,
   q:{e:`앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 "일부러 그런 게 아니에요!" 하고 울면서 빌어요. 하지만 부인은 용서하지 않았어요.`},
   opts:[
    {type:`canon`, go:`b_c`, e:`울면서 용서를 빌어요`},
    {type:`imag`, go:`b_i`, e:`"백 일 동안 말 안 할게요"`}
   ]},
  {id:`b_c`, w:`anne`, f:`anne_sad`, o:`barry`,
   e:`"부인, 일부러 그런 게 아니에요.\n제발 용서해 주세요!"`},
  {t:`goto`, to:`b_m`},
  {id:`b_i`, w:`anne`, f:`anne_dreamy`, o:`barry`, fx:`dream`,
   e:`"용서해 주시면\n백 일 동안 한마디도 안 할게요!"`},
  {id:`b_m`, w:`barry`, f:`anne_sad`, o:`barry`,
   e:`배리 부인은 문을 닫아 버리셨어.\n나는 울면서 집에 왔어.`},
  /* ---------- 작별 ---------- */
  {bg:`ch3_bridge`, w:`diana`, f:`anne_sad`, o:`diana`, cam:`in`,
   e:`다음 날, 다이애나가 샘에 왔어.\n"앤, 딱 십 분만 만날 수 있대."`},
  {t:`choice`, id:`C4`, kind:`act`, label:`작별의 선물`, f:`anne_sad`, o:`diana`,
   q:{e:`헤어지기 전에 무엇을 나눌까요?`},
   note:{e:`원작의 앤은 다이애나의 곱슬머리 한 타래를 받아 소중히 간직해요.`},
   opts:[
    {type:`canon`, go:`g_c`, eff:{item:`lock`, heart:{diana:1}}, e:`머리카락 한 타래`},
    {type:`imag`, go:`g_i`, eff:{item:`pebble`, heart:{diana:1}}, e:`이름 새긴 조약돌`}
   ]},
  {id:`g_c`, w:`anne`, f:`anne_sad`, o:`diana`,
   e:`"네 머리카락 한 타래를 줄래?\n평생 간직할게."`},
  {t:`goto`, to:`g_m`},
  {id:`g_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`,
   e:`우리는 조약돌에 서로 이름을 새겼어.\n하나씩 나눠 가졌어.`},
  {id:`g_m`, w:`diana`, f:`anne_sad`, o:`diana`,
   e:`"앤, 너는 영원히 내 친구야."\n다이애나가 울면서 갔어.`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`헤어진 뒤`, f:`anne_sad`, o:`diana`,
   q:{e:`다이애나와 헤어진 앤의 마음은요?`},
   note:{e:`원작의 앤은 무척 슬펐어요. 하지만 학교에 가면 다이애나를 볼 수 있었어요.`},
   opts:[
    {type:`feel`, ic:`😢`, ok:1, e:`슬퍼요`},
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`😠`, e:`화나요`}
   ]},
  {t:`ending`},
  {id:`E_canon`, bg:`ch4`, w:`anne`, in:1, f:`anne_happy`, cam:`out`, eff:{album:`e_canon`},
   e:`나는 다시 학교에 가기로 했어.\n교실에서는 다이애나를 볼 수 있거든.`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`언젠가 마법처럼 다시 만날 거야.\n나는 그날을 꿈꾸며 잠들었어.`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch2`, w:`marilla`, f:`anne_sad`, o:`marilla_warm`, eff:{album:`e_bal`, heart:{marilla:1}},
   e:`"앤, 내 잘못도 있다.\n기다리면 배리 부인 마음도 풀릴 거다."`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_happy`,
   e:`다이애나와 나는 아직 친구야.\n마음은 늘 함께 있어.`},
  {t:`endcard`}
  ]
});
