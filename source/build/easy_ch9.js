/* 쉬운 이야기 9장 · 불운한 백합 아가씨 (원작 28장) */
EASY.push({
  key: `ch9`, num: 9, bgm: `bgm_ch9.mp3`, title: `불운한 백합 아가씨`, orig: `원작 28장`, origTitle: `불운한 백합 아가씨`,
  look: `grow`, /* 다시 자란 머리의 앤 */
  bgKeys: [`ch9`, `ch9_drift`, `ch9_bridge`],
  endings: {
    canon: {title: `조금은 간직하렴`, label: `원작 결말`},
    imag:  {title: `스스로 노 젓는 공주`, label: `상상 결말`},
    bal:   {title: `새 배를 위한 약속`, label: `균형 결말`}
  },
  items: {
    shawl:{ic:`🖤`, name:`검은 숄`, desc:`연극할 때 배를 덮은 검은 숄이에요.`},
    pile:{ic:`🪵`, name:`다리 기둥`, desc:`가라앉는 배에서 앤이 붙잡은 다리 기둥이에요.`}
  },
  album: [
    {id:`s9_sunset`, ic:`🌅`, name:`노을빛 공주`},
    {id:`s9_maybe`, ic:`⚔️`, name:`"생각해 볼게"`},
    {id:`s9_feel`, ic:`💗`, name:`마음 읽기 성공`}
  ],
  talk: {
    e: [`배에 물이 샐 때 앤은 어떻게 했나요?`,
        `길버트가 친구가 되자고 했을 때, 앤은 왜 거절했을까요?`,
        `매슈 아저씨가 말한 '조금은 간직할 낭만'은 무엇일까요?`],
    l: [`배에 물이 샐 때 앤은 어떻게 했나요?`,
        `길버트가 친구가 되자고 했을 때, 앤은 왜 거절했을까요?`,
        `매슈 아저씨가 말한 '조금은 간직할 낭만'은 무엇일까요?`]
  },
  nodes: [
  {id:`b1`, bg:`ch9`, w:`anne`, in:1, f:`anne_happy`, o:`diana`, cam:`out`,
   e:`여름이야. 우리는 연못가에 모였어.\n오늘은 연극 놀이를 할 거야!`},
  {w:`anne`, f:`anne_dreamy`, o:`diana`,
   e:`옛이야기 속 공주가\n배를 타고 떠내려가는 연극이야.`},
  {w:`diana`, f:`anne_sad`, o:`diana`, cam:`in`,
   e:`"앤, 네가 공주를 해!"\n"빨강 머리 공주는 이상하잖아…."`},
  {t:`choice`, id:`C1`, kind:`talk`, label:`공주 역할`, f:`anne_sad`, o:`diana`,
   q:{e:`앤은 공주 역할을 할까요?`},
   note:{e:`원작에서 다이애나가 "네 머리 색이 짙어져서 예뻐."라고 말해 줘요. 앤은 기뻐하며 공주를 맡아요.`},
   opts:[
    {type:`canon`, go:`e_c`, eff:{item:`shawl`, heart:{diana:1}}, e:`기뻐하며 맡아요`},
    {type:`imag`, go:`e_i`, eff:{item:`shawl`, album:`s9_sunset`}, e:`노을빛 공주가 돼요`}
   ]},
  {id:`e_c`, w:`diana`, f:`anne_happy`, o:`diana`,
   e:`"네 머리는 예전보다 짙어졌어.\n정말 예뻐!" 나는 공주를 맡았어.`},
  {t:`goto`, to:`e_m`},
  {id:`e_i`, w:`anne`, f:`anne_dreamy`, o:`diana`, fx:`dream`,
   e:`"좋아! 나는 노을빛 머리의 공주야.\n노을이 머리를 물들인 거지!"`},
  /* ---------- 위기 ---------- */
  {id:`e_m`, bg:`ch9_drift`, w:`anne`, in:1, f:`anne_dreamy`, cam:`up`,
   e:`나는 배에 누웠어.\n배가 천천히 떠내려갔어.`},
  {w:`anne`, in:1, f:`anne_surprised`, cam:`shake`,
   e:`그런데 등이 축축해!\n배에 물이 들어오고 있어!`},
  {t:`choice`, id:`F1`, kind:`feel`, label:`앤의 마음`, f:`anne_surprised`,
   q:{e:`지금 앤의 마음은 어떨까요?`},
   note:{e:`원작의 앤은 무척 무서웠어요. 하지만 침착하려고 애썼어요.`},
   opts:[
    {type:`feel`, ic:`😨`, ok:1, eff:{album:`s9_feel`}, e:`무서워요`},
    {type:`feel`, ic:`😆`, e:`재밌어요`},
    {type:`feel`, ic:`😴`, e:`졸려요`}
   ]},
  {t:`choice`, id:`C2`, kind:`act`, label:`가라앉는 배`, f:`anne_surprised`,
   q:{e:`노도 없어요! 앤은 어떻게 할까요?`},
   note:{e:`원작의 앤은 기도하며 눈을 크게 뜨고 다리 기둥을 지켜봐요. 그리고 기둥에 매달려요.`},
   opts:[
    {type:`canon`, go:`s_c`, eff:{item:`pile`}, e:`다리 기둥을 붙잡아요`},
    {type:`imag`, go:`s_i`, eff:{item:`pile`}, e:`물의 요정을 상상하며 버텨요`}
   ]},
  {id:`s_c`, bg:`ch9_bridge`, w:`anne`, in:1, f:`anne_surprised`, cam:`in`,
   e:`배가 다리 기둥에 부딪혔어.\n나는 기둥을 꽉 붙잡았어!`},
  {t:`goto`, to:`s_m`},
  {id:`s_i`, bg:`ch9_bridge`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`,
   e:`물의 요정이 손을 내미는 것 같았어.\n나는 다리 기둥을 꽉 붙잡았어!`},
  {id:`s_m`, w:`anne`, in:1, f:`anne_sad`,
   e:`배는 가라앉아 버렸어.\n나는 기둥에 매달려 있었어. 팔이 아팠어.`},
  /* ---------- 길버트 ---------- */
  {w:`gilbert`, f:`anne_surprised`, o:`gilbert`, cam:`in`,
   e:`그때 작은 배가 왔어. 길버트였어!\n"앤! 내 손 잡아!"`},
  {w:`anne`, f:`anne_angry`, o:`gilbert`,
   e:`나는 길버트의 배를 타고 내렸어.\n"고마워." 나는 차갑게 말했어.`},
  {w:`gilbert`, f:`anne_surprised`, o:`gilbert`,
   e:`"앤, 우리 친구가 될 수 없을까?\n그때 놀려서 정말 미안해."`},
  {t:`choice`, id:`C3`, kind:`talk`, label:`"친구가 되자"`, f:`anne_surprised`, o:`gilbert`,
   q:{e:`앤은 뭐라고 대답할까요?`},
   note:{e:`원작의 앤은 "싫어!" 하고 거절해요. 하지만 집에 가면서 조금 후회했어요.`},
   opts:[
    {type:`canon`, go:`g_c`, e:`"싫어!" 하고 거절해요`},
    {type:`imag`, go:`g_i`, eff:{flag:`gilbertMaybe`, heart:{gilbert:1}, album:`s9_maybe`}, e:`"생각해 볼게" 하고 말해요`}
   ]},
  {id:`g_c`, w:`gilbert`, f:`anne_angry`, o:`gilbert`, cam:`shake`,
   e:`"싫어! 너랑은 친구 안 해!"\n길버트는 화가 나서 가 버렸어.`},
  {w:`anne`, in:1, f:`anne_sad`,
   e:`그런데 이상하게 후회가 됐어.\n다르게 말할걸 그랬나?`},
  {t:`goto`, to:`g_m`},
  {id:`g_i`, w:`gilbert`, f:`anne_dreamy`, o:`gilbert`,
   e:`"구해 줘서 고마워.\n친구는… 생각해 볼게."\n길버트가 웃었어.`},
  {id:`g_m`, bg:`ch9`, w:`diana`, f:`anne_sad`, o:`diana`, cam:`in`,
   e:`다이애나가 달려왔어.\n"앤! 살았구나! 정말 다행이야!"`},
  {bg:`ch2`, w:`marilla`, f:`anne_happy`, o:`marilla_strict`,
   e:`"앤, 너는 언제 철이 들겠니?"\n"이제 진짜 철들 거예요!"`},
  {t:`choice`, id:`F2`, kind:`feel`, label:`마릴라의 마음`, f:`anne_happy`, o:`marilla_strict`,
   q:{e:`마릴라 아주머니의 마음은 어떨까요?`},
   note:{e:`원작의 마릴라 아주머니는 앤이 걱정되었어요. 앤이 무사해서 다행이라고 생각했어요.`},
   opts:[
    {type:`feel`, ic:`😆`, e:`신나요`},
    {type:`feel`, ic:`😴`, e:`졸려요`},
    {type:`feel`, ic:`😟`, ok:1, e:`걱정돼요`}
   ]},
  {w:`matthew`, f:`anne_happy`, o:`matthew`, cam:`in`,
   e:`아저씨가 내 어깨에 손을 얹으셨어.\n"앤, 상상하는 마음을 조금은 간직하렴."`},
  {t:`name`, id:`N9`, key:`romance`, free:true, max:30, label:`간직하고 싶은 것`, f:`anne_happy`, o:`matthew`,
   q:{e:`✍️ 앤이 꼭 간직하고 싶은 것은 무엇일까요?`},
   pick:[`꽃에 이름 붙이기`, `이야기 짓기`, `별 보며 꿈꾸기`],
   ph:`직접 써도 돼요`,
   note:{e:`매슈 아저씨는 앤의 상상하는 마음을 정말 좋아했어요.`}},
  {t:`ending`},
  {id:`E_canon`, w:`matthew`, f:`anne_happy`, o:`matthew`, cam:`in`, eff:{album:`e_canon`, heart:{matthew:1}},
   e:`"네, 아저씨. '{romance}'만큼은\n꼭 간직할게요."`},
  {t:`goto`, to:`E_last`},
  {id:`E_imag`, bg:`ch9_drift`, w:`anne`, in:1, f:`anne_dreamy`, fx:`dream`, cam:`up`, eff:{album:`e_imag`},
   e:`나는 새 이야기를 썼어.\n공주가 직접 노를 저어 가는 이야기야!`},
  {t:`goto`, to:`E_last`},
  {id:`E_bal`, bg:`ch9`, w:`diana`, f:`anne_happy`, o:`diana`, eff:{album:`e_bal`, heart:{diana:1}},
   e:`나는 배리 아저씨께 사과했어.\n"새 배는 둘이 같이 칠해 주렴."`},
  {t:`goto`, to:`E_last`},
  {id:`E_last`, bg:`ch2_room`, w:`anne`, in:1, f:`anne_dreamy`, cam:`up`,
   e:`길버트를 보았을 때\n왜 가슴이 두근거렸을까?`},
  {t:`endcard`}
  ]
});
