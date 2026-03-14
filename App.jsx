import { useState, useEffect } from "react";

// ── CSS ──────────────────────────────────────────────────
const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Nunito+Sans:wght@600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#F8F7FF;font-family:'Nunito Sans','Apple SD Gothic Neo',sans-serif;-webkit-font-smoothing:antialiased}
button,input{font-family:inherit}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes checkPop{0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes bloom{0%{transform:scale(0) rotate(-15deg);opacity:0}65%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
@keyframes confetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(240px) rotate(720deg);opacity:0}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.08)}}
.fadeUp{animation:fadeUp .4s cubic-bezier(.22,.68,0,1.2) both}
.scaleIn{animation:scaleIn .35s cubic-bezier(.22,.68,0,1.2) both}
.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}
`;
function injectCSS(){if(document.getElementById("gjf"))return;const s=document.createElement("style");s.id="gjf";s.textContent=GCSS;document.head.appendChild(s);}

// ── DESIGN TOKENS ─────────────────────────────────────────
const C={purple:"#6C5CE7",purpleL:"#A29BFE",purpleP:"#EDE9FF",yellow:"#FDCB6E",pink:"#FD79A8",mint:"#00B894",sky:"#74B9FF",coral:"#FF7675",orange:"#E17055",bg:"#F8F7FF",surface:"#FFF",surfaceAlt:"#F3F2FA",border:"#E8E6F8",borderDk:"#D1CEEE",text:"#2D3436",sub:"#636E72",muted:"#A0A0B8"};
const F={display:"clamp(26px,7vw,34px)",h1:"clamp(20px,5vw,26px)",h2:"clamp(17px,4.5vw,21px)",h3:"clamp(15px,4vw,18px)",body:"clamp(13px,3.5vw,15px)",sm:"clamp(11px,3vw,13px)",btn:"clamp(14px,3.8vw,16px)"};
const R={sm:10,md:16,lg:22,xl:28,full:999};
const SH={card:"0 4px 20px rgba(108,92,231,.10),0 1px 4px rgba(0,0,0,.04)",float:"0 8px 32px rgba(108,92,231,.18)",btn:"0 4px 14px rgba(108,92,231,.35)"};
const PC = {
  child1: { main: "#FD79A8", pale: "#FFF0F5" },
  child2: { main: "#74B9FF", pale: "#EAF4FF" }, 
  mom:    { main: "#00B894", pale: "#E0FAF4" },
  dad:    { main: "#FDCB6E", pale: "#FFF8E7" }  
};
// ── BRAIN ENGINE ──────────────────────────────────────────
const CP={
  sleepy:     {el:2,cap:6, wu:true, easy:true, desc:"낮은 각성 — 점진적 워밍업 필요"},
  energetic:  {el:9,cap:10,wu:false,easy:false,desc:"고각성 — 어려운 과제 우선 최적"},
  sick:       {el:2,cap:4, wu:false,easy:true, desc:"신체 자원 고갈 — 경량 활동 위주"},
  blank:      {el:3,cap:5, wu:true, easy:true, desc:"전전두엽 저활성 — 쉬운 것부터"},
  focused:    {el:8,cap:10,wu:false,easy:false,desc:"전두엽 최고 활성 — 즉시 고난도 시작"},
  annoyed:    {el:4,cap:5, wu:true, easy:true, desc:"편도체 과활성 — 운동으로 먼저 해소"},
  restless:   {el:7,cap:8, wu:true, easy:false,desc:"신체 각성 과잉 — 에너지 발산 후 집중"},
  unconfident:{el:3,cap:5, wu:false,easy:true, desc:"자기효능감 저하 — 즉각 성공경험 필요"},
};
function score(item,p){let s=0;const r=item.cl/p.cap;if(r<=1)s+=(1-r)*30;else s-=(r-1)*40;if(p.wu&&item.type==="exercise")s+=50;if(p.wu&&item.cl<=3)s+=20;if(p.easy)s+=(10-item.cl)*4;if(p.el>=8&&!p.wu)s+=item.cl*3;if(p.el<=2&&item.type==="exercise")s-=30;return s;}
function interleave(items){if(items.length<=2)return items;const res=[],rem=[...items];while(rem.length){const lg=res.length?res[res.length-1].ig:null;const diff=rem.filter(i=>i.ig!==lg);const pick=diff.length?diff[0]:rem[0];res.push(pick);rem.splice(rem.indexOf(pick),1);}return res;}
function reason(item,cond,pos,total){const p=CP[cond];if(item.type==="exercise"&&pos===0)return`운동 먼저! BDNF 분비로 이후 학습 효율 UP`;if(item.cl>=8&&p.el>=7)return`인지부하 ${item.cl}/10 — 지금이 가장 집중하기 좋은 타이밍`;if(item.cl<=3&&p.easy)return`부담 낮은 과제로 자신감과 도파민 먼저 채워요`;if(item.mt==="recall")return`인출 연습 — 직접 떠올리기가 읽기보다 기억력 2~3배`;if(item.mt==="spacing")return`간격 효과 — 오늘 에너지로 망각 곡선을 이겨내요`;if(item.type==="reading")return`인지 안정 구간에 독서 배치 — 정보 통합에 효과적`;return`교차학습 배치 — 과목 섞기로 장기기억 강화`;}
function recommend(items,cond){const p=CP[cond];const sorted=[...items].map(i=>({...i,_s:score(i,p)})).sort((a,b)=>b._s-a._s);return interleave(sorted).map((item,i)=>({...item,reason:reason(item,cond,i,sorted.length),fm:item.type==="exercise"?(Number(item.amount)||15):item.type==="memory"?Math.ceil((Number(item.amount)||10)*.5):item.type==="reading"?Math.ceil((Number(item.amount)||8)*2):item.type==="workbook"?Math.ceil((Number(item.amount)||4)*5):item.type==="study"?(Number(item.amount)||1)*45:15}));}

// ── SVG CHARACTERS ────────────────────────────────────────
const SW=3;
function RabbitSVG({size=100,mood="happy"}){const col="#6C5CE7";return(<svg width={size} height={size} viewBox="0 0 100 110" strokeLinecap="round" strokeLinejoin="round"><path d="M33 50 Q28 28 30 10 Q32 4 36 10 Q40 28 38 50" fill="#EDE9FF" stroke={col} strokeWidth={SW}/><path d="M62 50 Q60 28 62 10 Q66 4 70 10 Q72 28 67 50" fill="#EDE9FF" stroke={col} strokeWidth={SW}/><path d="M33 46 Q30 30 31 14 Q32 10 34 14 Q37 30 36 46" fill="none" stroke="#FDB0D0" strokeWidth="2"/><path d="M63 46 Q63 30 64 14 Q65 10 67 14 Q69 30 67 46" fill="none" stroke="#FDB0D0" strokeWidth="2"/><ellipse cx="50" cy="84" rx="24" ry="18" fill="#EDE9FF" stroke={col} strokeWidth={SW}/><path d="M42 76 L48 80 L42 84 Z" fill={col}/><path d="M58 76 L52 80 L58 84 Z" fill={col}/><circle cx="50" cy="80" r="3" fill={col}/><circle cx="50" cy="50" r="22" fill="white" stroke={col} strokeWidth={SW}/><ellipse cx="33" cy="55" rx="6" ry="4" fill="#FDB0D0" opacity=".5"/><ellipse cx="67" cy="55" rx="6" ry="4" fill="#FDB0D0" opacity=".5"/>{mood==="happy"?(<><path d="M37 47 Q41 42 45 47" fill="none" stroke={col} strokeWidth="3.5"/><path d="M55 47 Q59 42 63 47" fill="none" stroke={col} strokeWidth="3.5"/></>):mood==="sleepy"?(<><path d="M37 49 Q41 46 45 49" fill="none" stroke={col} strokeWidth={SW}/><path d="M55 49 Q59 46 63 49" fill="none" stroke={col} strokeWidth={SW}/><text x="66" y="38" fontSize="9" fill={col} fontWeight="800">zz</text></>):(<><circle cx="41" cy="48" r="4.5" fill={col}/><circle cx="59" cy="48" r="4.5" fill={col}/><circle cx="42.5" cy="46.5" r="1.5" fill="white"/><circle cx="60.5" cy="46.5" r="1.5" fill="white"/></>)}<ellipse cx="50" cy="56" rx="3" ry="2" fill="#FDB0D0"/><path d={mood==="happy"?"M44 61 Q50 67 56 61":"M44 64 Q50 59 56 64"} fill="none" stroke={col} strokeWidth="2.5"/><line x1="22" y1="55" x2="40" y2="57" stroke={col} strokeWidth="1.5" opacity=".35"/><line x1="60" y1="57" x2="78" y2="55" stroke={col} strokeWidth="1.5" opacity=".35"/><ellipse cx="38" cy="107" rx="11" ry="5" fill="#EDE9FF" stroke={col} strokeWidth="3"/><ellipse cx="62" cy="107" rx="11" ry="5" fill="#EDE9FF" stroke={col} strokeWidth="3"/></svg>);}

function ElephantSVG({size=100}){const col="#74B9FF";return(<svg width={size} height={size} viewBox="0 0 100 110" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="16" cy="42" rx="14" ry="18" fill="#BDD0E8" stroke={col} strokeWidth={SW}/><ellipse cx="84" cy="42" rx="14" ry="18" fill="#BDD0E8" stroke={col} strokeWidth={SW}/><ellipse cx="50" cy="86" rx="28" ry="21" fill="#DDEAF8" stroke={col} strokeWidth={SW}/><path d="M32 72 Q50 67 68 72 L66 96 Q50 100 34 96 Z" fill={col} opacity=".3" stroke={col} strokeWidth="1.5"/><line x1="50" y1="68" x2="50" y2="96" stroke={col} strokeWidth="1.5" opacity=".5"/><ellipse cx="50" cy="44" rx="26" ry="28" fill="white" stroke={col} strokeWidth={SW}/><path d="M50 62 Q44 70 42 78 Q41 84 46 84 Q50 84 49 78 Q48 72 52 66" fill="none" stroke={col} strokeWidth="3.5"/><ellipse cx="33" cy="50" rx="8" ry="5" fill="#FDB0D0" opacity=".4"/><ellipse cx="67" cy="50" rx="8" ry="5" fill="#FDB0D0" opacity=".4"/><circle cx="39" cy="38" r="5" fill="white" stroke="#1C2E5A" strokeWidth="2"/><circle cx="61" cy="38" r="5" fill="white" stroke="#1C2E5A" strokeWidth="2"/><circle cx="40" cy="38" r="2.8" fill="#1C2E5A"/><circle cx="62" cy="38" r="2.8" fill="#1C2E5A"/><circle cx="41" cy="37" r="1.1" fill="white"/><circle cx="63" cy="37" r="1.1" fill="white"/><path d="M40 56 Q50 63 60 56" fill="none" stroke="#1C2E5A" strokeWidth="2.5"/><ellipse cx="34" cy="107" rx="13" ry="5.5" fill="#DDEAF8" stroke={col} strokeWidth="2"/><ellipse cx="66" cy="107" rx="13" ry="5.5" fill="#DDEAF8" stroke={col} strokeWidth="2"/></svg>);}

function SnakeSVG({size=100}){const col="#00B894";return(<svg width={size} height={size} viewBox="0 0 100 110" strokeLinecap="round" strokeLinejoin="round"><path d="M18 98 Q14 80 28 70 Q42 60 50 66 Q58 72 68 62 Q80 50 74 36 Q70 26 60 26" fill="none" stroke="#E0FAF4" strokeWidth="18"/><path d="M18 98 Q14 80 28 70 Q42 60 50 66 Q58 72 68 62 Q80 50 74 36 Q70 26 60 26" fill="none" stroke={col} strokeWidth="6"/><ellipse cx="56" cy="22" rx="18" ry="14" fill="white" stroke={col} strokeWidth={SW}/><circle cx="49" cy="18" r="4.5" fill="white" stroke="#2D3436" strokeWidth="1.8"/><circle cx="63" cy="18" r="4.5" fill="white" stroke="#2D3436" strokeWidth="1.8"/><circle cx="50" cy="18" r="2.5" fill="#2D3436"/><circle cx="64" cy="18" r="2.5" fill="#2D3436"/><circle cx="50.8" cy="17.2" r="1" fill="white"/><circle cx="64.8" cy="17.2" r="1" fill="white"/><circle cx="49" cy="18" r="6" fill="none" stroke="#2D3436" strokeWidth="1.3" opacity=".3"/><circle cx="63" cy="18" r="6" fill="none" stroke="#2D3436" strokeWidth="1.3" opacity=".3"/><line x1="55" y1="18" x2="57" y2="18" stroke="#2D3436" strokeWidth="1.3" opacity=".3"/><path d="M46 28 Q56 34 66 28" fill="none" stroke={col} strokeWidth="2.5"/><line x1="56" y1="34" x2="56" y2="41" stroke="#FF7675" strokeWidth="2.2"/><line x1="56" y1="41" x2="52" y2="46" stroke="#FF7675" strokeWidth="2.2"/><line x1="56" y1="41" x2="60" y2="46" stroke="#FF7675" strokeWidth="2.2"/></svg>);}

function FrogSVG({size=100}){const col="#00B894";return(<svg width={size} height={size} viewBox="0 0 100 110" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="34" r="12" fill="white" stroke={col} strokeWidth={SW}/><circle cx="68" cy="34" r="12" fill="white" stroke={col} strokeWidth={SW}/><ellipse cx="50" cy="83" rx="28" ry="20" fill="#E0FAF4" stroke={col} strokeWidth={SW}/><ellipse cx="50" cy="87" rx="16" ry="11" fill="white" stroke={col} strokeWidth="2"/><ellipse cx="50" cy="54" rx="28" ry="22" fill="white" stroke={col} strokeWidth={SW}/><circle cx="32" cy="34" r="8" fill="white"/><circle cx="68" cy="34" r="8" fill="white"/><circle cx="33" cy="35" r="5.5" fill={col}/><circle cx="69" cy="35" r="5.5" fill={col}/><circle cx="34.5" cy="33.5" r="2" fill="white"/><circle cx="70.5" cy="33.5" r="2" fill="white"/><ellipse cx="26" cy="58" rx="6" ry="4" fill="#FDB0D0" opacity=".45"/><ellipse cx="74" cy="58" rx="6" ry="4" fill="#FDB0D0" opacity=".45"/><path d="M28 64 Q50 79 72 64" fill="none" stroke={col} strokeWidth="3"/><polyline points="34,26 39,15 50,26 61,15 66,26" fill="none" stroke="#FDCB6E" strokeWidth="2.5" strokeLinejoin="miter"/><circle cx="39" cy="15" r="2.5" fill="#FDCB6E"/><circle cx="50" cy="26" r="2.5" fill="#FDCB6E"/><circle cx="61" cy="15" r="2.5" fill="#FDCB6E"/><ellipse cx="34" cy="107" rx="13" ry="5" fill="#E0FAF4" stroke={col} strokeWidth="3"/><ellipse cx="66" cy="107" rx="13" ry="5" fill="#E0FAF4" stroke={col} strokeWidth="3"/></svg>);}

function CharSVG({id,size=100,mood="happy"}){if(id==="rabbit")return <RabbitSVG size={size} mood={mood}/>;if(id==="elephant")return <ElephantSVG size={size}/>;if(id==="snake")return <SnakeSVG size={size}/>;if(id==="frog")return <FrogSVG size={size}/>;return null;}

// ── FLOWER SVG ────────────────────────────────────────────
function FlowerSVG({color="#FD79A8",petals=6,size=52,wilting=false,dead=false}){
  const ang=Array.from({length:petals},(_,i)=>(i/petals)*360);
  const sc=dead?"#AAA":color,fc=dead?"#EEE":`${color}30`,stm=dead?"#AAA":wilting?"#88BB80":"#00B894";
  return(<svg width={size} height={size} viewBox="0 0 52 58" strokeLinecap="round" style={{transform:dead?"rotate(45deg)":wilting?"rotate(14deg)":"none",transition:"transform .5s"}}>
    <path d="M26 50 Q24 40 26 30" stroke={stm} strokeWidth="2.5" fill="none"/>
    <path d="M26 42 Q18 36 17 41 Q19 48 26 42Z" fill={stm} opacity={dead?.3:.6}/>
    {ang.map((a,i)=>{const rad=(a-90)*Math.PI/180,cx=26+11*Math.cos(rad),cy=22+11*Math.sin(rad);return(<ellipse key={i} cx={cx} cy={cy} rx="5.5" ry="9" fill={fc} stroke={sc} strokeWidth="1.8" transform={`rotate(${a},${cx},${cy})`} opacity={dead?.5:wilting?.6:1}/>);})}
    <circle cx="26" cy="22" r="7" fill={dead?"#D8D0B8":"#FDCB6E"} stroke={dead?"#B0A080":color} strokeWidth="1.8"/>
    <circle cx="26" cy="22" r="3.5" fill={dead?"#C0B898":"#FFE088"}/>
  </svg>);
}
const FCLR={rose:"#FD79A8",sunflower:"#FDCB6E",tulip:"#C084FC",daisy:"#FDE68A",cherry:"#F9A8D4",clover:"#34D399",star:"#FCD34D",rainbow:"#A78BFA",crystal:"#67E8F9"};
const FPET={rose:5,sunflower:8,tulip:6,daisy:8,cherry:5,clover:4,star:5,rainbow:6,crystal:7};

// ── DATA ──────────────────────────────────────────────────
const PROFILES = [
  { id: "child1", name: "나은이", emoji: "🌸", ...PC.child1 },
  { id: "child2", name: "지윤이", emoji: "💙", ...PC.child2 },
  { id: "mom",    name: "엄마",   emoji: "💚", ...PC.mom },
  { id: "dad",    name: "아빠",   emoji: "⭐", ...PC.dad }
];
const CHARS=[
  {id:"rabbit", name:"토끼",  bg:"#EDE9FF",accent:"#6C5CE7",phrases:{greet:["안녕! 토끼 집사야! 깡충깡충 시작! 🥕"],study:["과학적 순서야! 믿고 해봐! 💜"],check:["잘했어! 도파민 UP! 🎉","완벽해! 계속 가자!","훌륭해!"],done:["오늘 뇌풀가동 성공!! 🏆"],reward:["씨앗 획득! 꼭 심어줘 🌱"]}},
  {id:"elephant",name:"코끼리",bg:"#EAF4FF",accent:"#74B9FF",phrases:{greet:["든든한 코끼리 집사야! 🐘"],study:["한 발씩 나아가면 돼! 🦶"],check:["훌륭해! 계속!","잘하고 있어! 💙","멋져!"],done:["묵묵히 해냈어! 대단해! 🏆"],reward:["열심히 한 보상이야! 🌱"]}},
  {id:"snake",  name:"뱀",    bg:"#E0FAF4",accent:"#00B894",phrases:{greet:["스르르... 집중할 시간."],study:["집중... 흔들리지 마. 🎯"],check:["음... 잘했어.","좋아. 예상대로야. 💚","인정해."],done:["예상을 뛰어넘었어. 🏆"],reward:["씨앗. 소중히 심어. 🌱"]}},
  {id:"frog",   name:"개구리",bg:"#FFF0F5",accent:"#FD79A8",phrases:{greet:["개굴개굴! 신나게! 🐸"],study:["신나게 가보자고! 🎉"],check:["개굴개굴! 잘했어! 🎊","최고야! 기뻐!","대박!"],done:["개굴개굴!! 완전 최고!! 🎉"],reward:["씨앗! 빨리 심어! 🌱"]}},
];
const CONDITIONS=[
  {id:"sleepy",     label:"졸립다",     emoji:"😴",color:"#9B8FE0",pale:"#F0EEFF"},
  {id:"energetic",  label:"에너지 넘침",emoji:"⚡",color:"#FDCB6E",pale:"#FFF8E7"},
  {id:"sick",       label:"아프다",     emoji:"🤒",color:"#FF7675",pale:"#FFF0F0"},
  {id:"blank",      label:"멍하다",     emoji:"😶",color:"#74B9FF",pale:"#EAF4FF"},
  {id:"focused",    label:"집중 잘 됨", emoji:"🎯",color:"#00B894",pale:"#E0FAF4"},
  {id:"annoyed",    label:"짜증난다",   emoji:"😤",color:"#E17055",pale:"#FFF2EE"},
  {id:"restless",   label:"근질근질",   emoji:"🤸",color:"#FD79A8",pale:"#FFF0F5"},
  {id:"unconfident",label:"자신없다",   emoji:"😟",color:"#A29BFE",pale:"#EDE9FF"},
];
const SC={국어:{bg:"#FFF0F5",bd:"#FFB3CC",tx:"#C0436C"},영어:{bg:"#EAF4FF",bd:"#74B9FF",tx:"#2070C0"},수학:{bg:"#FFF8E7",bd:"#FDCB6E",tx:"#A07010"},과학:{bg:"#E0FAF4",bd:"#00B894",tx:"#007A60"},운동:{bg:"#FFF2EE",bd:"#E17055",tx:"#C04020"},대학원:{bg:"#EDE9FF",bd:"#A29BFE",tx:"#5030A0"},AI:{bg:"#EAF4FF",bd:"#74B9FF",tx:"#2050A0"},작문:{bg:"#FFF8E7",bd:"#FDCB6E",tx:"#806010"},독서:{bg:"#E0FAF4",bd:"#00B894",tx:"#206030"},자기계발:{bg:"#EDE9FF",bd:"#A29BFE",tx:"#6030A0"}};

// item: {id,subject,name,se(emoji),type,cl(cogLoad),ig(interleaveGroup),mt(mnemonicType),unit,tip}
const SI={
  child:[
    {id:"k_dict", subject:"국어",name:"받아쓰기",   se:"📝",type:"memory",  cl:5,ig:"verbal", mt:"recall",     unit:"단어",  tip:"가리고 직접 떠올리기! 그게 핵심이에요."},
    {id:"k_noon", subject:"국어",name:"눈높이",     se:"📗",type:"workbook",cl:5,ig:"verbal", mt:"spacing",    unit:"페이지",tip:"틀린 것만 다시 풀면 효과 2배!"},
    {id:"k_read", subject:"국어",name:"자유독서",   se:"📖",type:"reading", cl:3,ig:"verbal", mt:"elaboration",unit:"페이지",tip:"읽고 한 문장으로 요약해봐요."},
    {id:"e_frob", subject:"영어",name:"프뢰벨",     se:"🏷️",type:"reading", cl:3,ig:"verbal", mt:"elaboration",unit:"페이지",tip:"그림 보고 뜻 먼저 추측!"},
    {id:"e_alp",  subject:"영어",name:"알파벳 쓰기",se:"🔤",type:"writing", cl:2,ig:"motor",  mt:"embodied",   unit:"개",    tip:"보고→머릿속으로 그리고→써요."},
    {id:"e_read", subject:"영어",name:"리딩앤",     se:"📚",type:"reading", cl:4,ig:"verbal", mt:"elaboration",unit:"페이지",tip:"큰 소리로! 소리내기가 핵심이에요."},
    {id:"e_kids", subject:"영어",name:"키즈컬리지", se:"🎒",type:"workbook",cl:5,ig:"verbal", mt:"spacing",    unit:"페이지",tip:"집중해서 한 번에 끝내요."},
    {id:"e_voc",  subject:"영어",name:"단어 외우기",se:"💬",type:"memory",  cl:6,ig:"verbal", mt:"recall",     unit:"단어",  tip:"보고→가리고→말하기! 이 순서!"},
    {id:"m_calc", subject:"수학",name:"눈높이 연산",se:"🔢",type:"workbook",cl:6,ig:"numeric",mt:"spacing",    unit:"페이지",tip:"틀린 것만 다시 확인. 망각 곡선 타파!"},
    {id:"m_sch",  subject:"수학",name:"스쿨수학",   se:"📐",type:"workbook",cl:8,ig:"numeric",mt:"elaboration",unit:"페이지",tip:"'왜 이 방법?'을 생각하며 풀어요."},
    {id:"m_prb",  subject:"수학",name:"문제집 풀기",se:"✏️",type:"workbook",cl:7,ig:"numeric",mt:"spacing",    unit:"페이지",tip:"식 세우기 전에 잠깐 생각하는 시간!"},
    {id:"m_book", subject:"수학",name:"수학도둑",   se:"🦸",type:"reading", cl:2,ig:"verbal", mt:"elaboration",unit:"페이지",tip:"재미있게 읽으면 개념이 스며들어요."},
    {id:"s_prb",  subject:"과학",name:"문제집 풀기",se:"🔬",type:"workbook",cl:7,ig:"numeric",mt:"elaboration",unit:"페이지",tip:"'왜?'를 말로 설명할 수 있어야 진짜!"},
    {id:"ex_j",   subject:"운동",name:"줄넘기",     se:"🪢",type:"exercise",cl:1,ig:"motor",  mt:"embodied",   unit:"분",    tip:"심박수 올리기! 운동 후 30분이 골든타임."},
    {id:"ex_h",   subject:"운동",name:"훌라우프",   se:"⭕",type:"exercise",cl:1,ig:"motor",  mt:"embodied",   unit:"분",    tip:"균형 잡기도 소뇌 운동이에요!"},
    {id:"ex_r",   subject:"운동",name:"달리기",     se:"🏃",type:"exercise",cl:1,ig:"motor",  mt:"embodied",   unit:"분",    tip:"달리고 나서 바로 공부 시작!"},
    {id:"ex_b",   subject:"운동",name:"자전거",     se:"🚴",type:"exercise",cl:1,ig:"motor",  mt:"embodied",   unit:"분",    tip:"리듬감 있게 페달링 — 세로토닌 UP!"},
  ],
  mom:[
    {id:"grad",   subject:"대학원",name:"대학원 공부",se:"🎓",type:"study",  cl:9,ig:"verbal",  mt:"elaboration",unit:"시간",tip:"읽은 내용을 3줄 요약. 기억 공고화 최고 방법."},
    {id:"ai",     subject:"AI",   name:"AI 공부",    se:"🤖",type:"study",  cl:8,ig:"numeric", mt:"elaboration",unit:"단원",tip:"개념 후 바로 '내 예시' 떠올리기."},
    {id:"writ",   subject:"작문", name:"작문 연습",  se:"✍️",type:"writing",cl:7,ig:"creative",mt:"elaboration",unit:"시간",tip:"완벽 말고, 5문장부터. 흘려 써야 아이디어 나와요."},
    {id:"m_rd",   subject:"독서", name:"독서",       se:"📖",type:"reading",cl:4,ig:"verbal",  mt:"elaboration",unit:"페이지",tip:"읽고 핵심 주장 한 문장으로 말해보세요."},
    {id:"m_ex",   subject:"운동", name:"운동",       se:"🏃",type:"exercise",cl:1,ig:"motor",  mt:"embodied",   unit:"분",tip:"운동 후 30분이 뇌 학습 황금타임!"},
  ],
  dad:[
    {id:"d_rd",   subject:"독서",   name:"독서",    se:"📖",type:"reading", cl:4,ig:"verbal",mt:"elaboration",unit:"페이지",tip:"'내 일에 어떻게 쓸까?'를 생각하며 읽어요."},
    {id:"d_ex",   subject:"운동",   name:"운동",    se:"🏋️",type:"exercise",cl:1,ig:"motor", mt:"embodied",   unit:"분",  tip:"강도보다 꾸준함. 신경가소성의 핵심이에요."},
    {id:"d_std",  subject:"자기계발",name:"자기계발",se:"🚀",type:"study",  cl:6,ig:"verbal",mt:"elaboration",unit:"시간",tip:"가족에게 설명해보세요. 프로테제 효과!"},
  ],
};
SI.child2=SI.child;

const FLOWERS=[{id:"rose",name:"장미",rarity:"common"},{id:"sunflower",name:"해바라기",rarity:"common"},{id:"tulip",name:"튤립",rarity:"common"},{id:"daisy",name:"데이지",rarity:"common"},{id:"cherry",name:"벚꽃",rarity:"rare"},{id:"clover",name:"네잎클로버",rarity:"rare"},{id:"star",name:"별꽃",rarity:"rare"},{id:"rainbow",name:"무지개꽃",rarity:"legendary"},{id:"crystal",name:"수정꽃",rarity:"legendary"}];
function getFlower(){const r=Math.random(),pool=r<.04?FLOWERS.filter(f=>f.rarity==="legendary"):r<.22?FLOWERS.filter(f=>f.rarity==="rare"):FLOWERS.filter(f=>f.rarity==="common");return pool[Math.floor(Math.random()*pool.length)];}
function calcHealth(p,lc){const d=lc?Math.floor((Date.now()-new Date(lc).getTime())/86400000):Math.floor((Date.now()-p)/86400000);return Math.max(0,Math.min(100,100-d*20));}
function load(k,fb){try{return JSON.parse(localStorage.getItem(k))??fb}catch{return fb}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
const DEF={character:null,seeds:[],garden:[],streak:0,totalCompleted:0,lastCompleted:null};

// ── UI COMPONENTS ─────────────────────────────────────────
function BtnPrimary({children,onClick,disabled,color,style={}}){const bg=disabled?"#C8C4E0":(color||C.purple);return(<button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"17px 24px",borderRadius:R.lg,background:bg,color:"#fff",fontSize:F.btn,fontWeight:800,letterSpacing:-.3,boxShadow:disabled?"none":SH.btn,border:"none",cursor:disabled?"not-allowed":"pointer",transition:"transform .12s",...style}} onMouseDown={e=>{if(!disabled)e.currentTarget.style.transform="scale(.97)"}} onMouseUp={e=>{if(!disabled)e.currentTarget.style.transform="scale(1)"}}>{children}</button>);}
function BtnGhost({children,onClick,style={}}){return(<button onClick={onClick} style={{width:"100%",padding:"14px 24px",borderRadius:R.lg,background:"transparent",color:C.sub,fontSize:F.btn,fontWeight:700,border:`2px solid ${C.borderDk}`,cursor:"pointer",...style}}>{children}</button>);}
function Label({children,style={}}){return <div style={{fontSize:F.h3,fontWeight:800,color:C.text,marginBottom:12,letterSpacing:-.3,...style}}>{children}</div>;}
function Pill({children,color,pale,style={}}){return <div style={{display:"inline-flex",alignItems:"center",gap:5,background:pale||`${color}20`,color,borderRadius:R.full,padding:"5px 12px",fontSize:F.sm,fontWeight:800,...style}}>{children}</div>;}
function NavBar({title,onBack}){return(<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,paddingTop:4}}>{onBack?<button onClick={onBack} style={{width:40,height:40,borderRadius:R.md,background:C.surfaceAlt,border:`1.5px solid ${C.border}`,fontSize:18,cursor:"pointer",color:C.text}}>←</button>:<div style={{width:40}}/>}<div style={{fontSize:F.h3,fontWeight:800,color:C.text}}>{title}</div><div style={{width:40}}/></div>);}

function Bubble({char,text,side="right"}){
  if(!char||!text)return null;
  const isR=side==="right";
  return(<div style={{display:"flex",alignItems:"flex-end",gap:10,flexDirection:isR?"row":"row-reverse",animation:"scaleIn .3s ease-out"}}>
    <div style={{flexShrink:0,animation:"float 3s ease-in-out infinite"}}><CharSVG id={char.id} size={68}/></div>
    <div style={{background:char.bg,border:`2.5px solid ${char.accent}40`,borderRadius:isR?"20px 20px 20px 6px":"20px 20px 6px 20px",padding:"12px 16px",fontSize:F.body,fontWeight:700,color:C.text,lineHeight:1.55,maxWidth:230,boxShadow:`0 4px 16px ${char.accent}20`}}>{text}</div>
  </div>);
}

function Confetti(){const cols=[C.purple,C.yellow,C.pink,C.mint,C.sky,"#FF9FF3","#FFEAA7"];return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>{Array.from({length:24}).map((_,i)=>(<div key={i} style={{position:"absolute",left:`${4+Math.random()*92}%`,top:-20,width:7+Math.random()*7,height:7+Math.random()*7,background:cols[i%cols.length],borderRadius:Math.random()>.4?"50%":"3px",animation:`confetti ${1.2+Math.random()}s ease-out ${Math.random()*.6}s forwards`}}/>))}</div>);}

function GardenFlower({flower,health}){
  const w=health<50,d=health<=0,rc=flower.rarity==="legendary"?"#FDCB6E":flower.rarity==="rare"?"#A29BFE":"#00B894";
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,animation:"bloom .5s cubic-bezier(.22,.68,0,1.2)"}}>
    <div style={{position:"relative",animation:(!d&&!w)?"float 3s ease-in-out infinite":"none"}}>
      <FlowerSVG color={FCLR[flower.id]||"#FD79A8"} petals={FPET[flower.id]||6} size={46} wilting={w} dead={d}/>
      {!d&&<div style={{position:"absolute",top:-3,right:-4,width:13,height:13,borderRadius:"50%",background:rc,border:"2px solid white",fontSize:7,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900}}>{flower.rarity==="legendary"?"★":flower.rarity==="rare"?"◆":"●"}</div>}
    </div>
    <div style={{width:40,height:5,background:C.border,borderRadius:3,overflow:"hidden"}}>
      <div style={{width:`${health}%`,height:"100%",borderRadius:3,background:health>70?"#00B894":health>40?"#FDCB6E":"#FF7675",transition:"width .5s"}}/>
    </div>
    <div style={{fontSize:9,color:C.muted,fontWeight:700}}>{flower.name}</div>
  </div>);
}

// ── STUDY SELECTOR ────────────────────────────────────────
function StudySelector({items,profileColor,selected,setSelected}){
  const [amounts,setAmounts]=useState({});
  const subjects=[...new Set(items.map(i=>i.subject))];
  const isSel=id=>selected.some(i=>i.id===id);
  function toggle(item){setSelected(prev=>isSel(item.id)?prev.filter(i=>i.id!==item.id):[...prev,{...item,amount:amounts[item.id]||""}]);}
  function setAmt(id,val){setAmounts(p=>({...p,[id]:val}));setSelected(p=>p.map(i=>i.id===id?{...i,amount:val}:i));}
  return(<div style={{display:"flex",flexDirection:"column",gap:20}}>
    {subjects.map(subj=>{
      const sc2=SC[subj]||{bg:"#F5F5F5",bd:"#DDD",tx:"#555"};
      return(<div key={subj}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{width:4,height:20,borderRadius:3,background:sc2.bd}}/>
          <span style={{fontSize:F.h3,fontWeight:800,color:sc2.tx}}>{subj}</span>
        </div>
        {items.filter(i=>i.subject===subj).map(item=>{
          const sel=isSel(item.id);
          return(<div key={item.id} style={{background:sel?sc2.bg:C.surface,border:`2px solid ${sel?sc2.bd:C.border}`,borderRadius:R.md,padding:"13px 15px",marginBottom:7,transition:"all .18s",cursor:"pointer"}} onClick={()=>toggle(item)}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:sel?profileColor:C.surfaceAlt,border:`2px solid ${sel?profileColor:C.borderDk}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:900,animation:sel?"checkPop .3s ease-out":"none"}}>{sel?"✓":""}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  <span style={{fontSize:16}}>{item.se}</span>
                  <span style={{fontSize:F.h3,fontWeight:800,color:C.text}}>{item.name}</span>
                  <span style={{fontSize:10,background:C.surfaceAlt,color:C.muted,borderRadius:6,padding:"2px 6px",fontWeight:700}}>부하{item.cl}</span>
                </div>
              </div>
            </div>
            {sel&&(<div style={{marginTop:11,paddingLeft:39,animation:"fadeUp .2s ease-out"}} onClick={e=>e.stopPropagation()}>
              <div style={{fontSize:F.sm,color:C.sub,fontWeight:700,marginBottom:7}}>
                분량&nbsp;<span style={{color:profileColor,fontWeight:900,fontSize:F.body}}>{amounts[item.id]||"—"}</span>
                <span style={{color:C.muted}}> {item.unit}</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {(item.type==="exercise"||item.type==="study"||item.type==="writing"?[10,15,20,30,45,60]:item.type==="memory"?[5,10,15,20,30,50]:[1,2,3,4,5,6,8,10]).map(n=>{
                  const act=amounts[item.id]===String(n);
                  return(<button key={n} onClick={()=>setAmt(item.id,String(n))} style={{minWidth:42,height:40,borderRadius:R.sm,border:`2px solid ${act?profileColor:sc2.bd}`,background:act?profileColor:C.surface,color:act?"#fff":C.text,fontSize:F.body,fontWeight:800,cursor:"pointer",transition:"all .12s",fontFamily:"inherit"}}>{n}</button>);
                })}
                <button onClick={()=>{const v=window.prompt(`${item.name} 분량 직접 입력 (${item.unit})`);if(v&&!isNaN(Number(v))&&Number(v)>0)setAmt(item.id,v);}} style={{minWidth:42,height:40,borderRadius:R.sm,border:`2px dashed ${sc2.bd}`,background:C.surfaceAlt,color:C.muted,fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>직접</button>
              </div>
            </div>)}
          </div>);
        })}
      </div>);
    })}
  </div>);
}

// ── MAIN APP ──────────────────────────────────────────────
export default function App(){
  useEffect(()=>injectCSS(),[]);
  const [screen,setScreen]=useState("home");
  const [profiles,setProfiles]=useState(()=>load("gj5",{child1:{...DEF},child2:{...DEF},mom:{...DEF},dad:{...DEF}}));
  const [pid,setPid]=useState(null);
  const [cond,setCond]=useState(null);
  const [sel,setSel]=useState([]);
  const [list,setList]=useState([]);
  const [checked,setChecked]=useState({});
  const [reward,setReward]=useState(null);
  const [confetti,setConfetti]=useState(false);
  const [phrase,setPhrase]=useState("");
  const [plantIdx,setPlantIdx]=useState(null);

  useEffect(()=>save("gj5",profiles),[profiles]);

  const prof=PROFILES.find(p=>p.id===pid);
  const pdata=pid?profiles[pid]:null;
  const char=pdata?.character?CHARS.find(c=>c.id===pdata.character):null;
  const getItems=id=>id==="mom"?SI.mom:id==="dad"?SI.dad:SI.child;
  const doneCount=list.filter(i=>checked[i.id]).length;
  const allDone=list.length>0&&doneCount===list.length;
  const totalMin=list.reduce((s,i)=>s+(i.fm||0),0);
  function pick(t){if(!char)return"";const a=char.phrases[t];return a[Math.floor(Math.random()*a.length)];}

  function goStudy(){if(!cond||!sel.length)return;const rec=recommend(sel,cond);setList(rec);setChecked({});setPhrase(pick("study"));setScreen("study");}
  function handleCheck(id){
    const idx=list.findIndex(i=>i.id===id);
    if(!list.slice(0,idx).every(i=>checked[i.id])){setPhrase("앞 공부를 먼저 완료해야 해요! 순서대로 해봐요 💪");return;}
    const was=checked[id];setChecked(p=>({...p,[id]:!was}));if(!was)setPhrase(pick("check"));
  }
  function handleComplete(){
    const f=getFlower();setReward(f);setConfetti(true);setTimeout(()=>setConfetti(false),2800);setPhrase(pick("done"));
    setProfiles(prev=>{const p={...prev[pid]};p.seeds=[...(p.seeds||[]),f];p.totalCompleted=(p.totalCompleted||0)+1;const today=new Date().toDateString(),yest=new Date(Date.now()-86400000).toDateString();p.streak=p.lastCompleted===yest?(p.streak||0)+1:1;p.lastCompleted=today;return{...prev,[pid]:p};});
    setScreen("reward");
  }
  function plantSeed(idx){
    setProfiles(prev=>{const p={...prev[pid]};const seed=p.seeds[idx];p.seeds=p.seeds.filter((_,i)=>i!==idx);p.garden=[...(p.garden||[]),{...seed,plantedAt:Date.now()}];return{...prev,[pid]:p};});
    setPlantIdx(null);setPhrase(pick("reward"));
  }

  const seeds=pdata?.seeds||[];
  const garden=pdata?.garden||[];
  const condObj=CONDITIONS.find(c=>c.id===cond);

  // ── HOME ────────────────────────────────────────────────
  if(screen==="home")return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"0 0 80px"}}>
        {/* header */}
        <div style={{padding:"20px 20px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:F.display,fontWeight:900,color:C.purple,letterSpacing:-1.5,fontFamily:"'Nunito',sans-serif"}}>공부집사</div>
            <div style={{fontSize:10,fontWeight:600,color:C.purpleL,letterSpacing:2,marginTop:1}}>MIND FIT STUDY COACH</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={BS.icon} onClick={()=>setScreen("garden")}>🌷</button>
            <button style={BS.icon} onClick={()=>setScreen("family")}>👨‍👩‍👧‍👦</button>
          </div>
        </div>

        {/* hero */}
        {!pid&&<div style={{margin:"0 16px 20px",background:`linear-gradient(135deg,${C.purple},${C.purpleL})`,borderRadius:R.xl,padding:"26px 22px",boxShadow:SH.float,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:-10,top:-10,fontSize:72,opacity:.12}}>🧠</div>
          <div style={{fontSize:F.h1,fontWeight:900,color:"#fff",lineHeight:1.3,marginBottom:6}}>오늘의 공부를<br/>뇌과학으로 설계해줄게!</div>
          <div style={{fontSize:F.body,color:"rgba(255,255,255,.85)",fontWeight:600}}>누가 공부할지 선택해봐요 👇</div>
        </div>}

        {/* profiles */}
        <div style={{padding:"0 16px",marginBottom:24}}>
          <Label>누가 공부할까요?</Label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            {PROFILES.map((p,i)=>{const pd=profiles[p.id],s=pid===p.id;return(
              <button key={p.id} className={`fadeUp d${i+1}`} onClick={()=>{setPid(p.id);setCond(null);setSel([]);setPhrase("");}} style={{background:s?p.main:p.pale,border:`3px solid ${s?p.main:"transparent"}`,borderRadius:R.lg,padding:"17px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:7,cursor:"pointer",transition:"all .2s",transform:s?"scale(1.04)":"scale(1)",boxShadow:s?`0 6px 20px ${p.main}50`:"none",fontFamily:"inherit"}}>
                <span style={{fontSize:32}}>{p.emoji}</span>
                <span style={{fontSize:F.h3,fontWeight:900,color:s?"#fff":C.text}}>{p.name}</span>
                <div style={{display:"flex",gap:5}}>
                  <Pill color={s?"#fff":p.main} pale={s?"rgba(255,255,255,.25)":p.pale} style={{fontSize:10}}>🌱{(pd?.seeds||[]).length}</Pill>
                  <Pill color={s?"#fff":p.main} pale={s?"rgba(255,255,255,.25)":p.pale} style={{fontSize:10}}>🌷{(pd?.garden||[]).length}</Pill>
                </div>
              </button>
            );})}
          </div>
        </div>

        {/* char select */}
        {pid&&!pdata?.character&&<div style={{padding:"0 16px",marginBottom:24}} className="fadeUp">
          <Label>집사 캐릭터를 골라요!</Label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            {CHARS.map((ch,i)=>(
              <button key={ch.id} className={`fadeUp d${i+1}`} onClick={()=>{setProfiles(prev=>({...prev,[pid]:{...prev[pid],character:ch.id}}));setPhrase(ch.phrases.greet[0]);}} style={{background:ch.bg,border:`2.5px solid ${ch.accent}40`,borderRadius:R.lg,padding:"18px 10px 13px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",fontFamily:"inherit"}}>
                <div style={{animation:`float ${2.4+i*.4}s ease-in-out infinite`}}><CharSVG id={ch.id} size={86}/></div>
                <div style={{fontSize:F.h3,fontWeight:800,color:C.text}}>{ch.name} 집사</div>
              </button>
            ))}
          </div>
        </div>}

        {pid&&pdata?.character&&<>
          <div style={{padding:"0 16px",marginBottom:20}} className="fadeUp">
            <Bubble char={char} text={phrase||char.phrases.greet[0]}/>
          </div>

          {/* conditions */}
          <div style={{padding:"0 16px",marginBottom:20}}>
            <Label>오늘 기분이 어때요? 😊</Label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {CONDITIONS.map((co,i)=>{const s=cond===co.id;return(
                <button key={co.id} className={`fadeUp d${i%4+1}`} onClick={()=>setCond(co.id)} style={{background:s?co.color:co.pale,border:`2.5px solid ${s?co.color:"transparent"}`,borderRadius:R.md,padding:"13px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",transition:"all .18s",transform:s?"scale(1.04)":"scale(1)",boxShadow:s?`0 4px 14px ${co.color}50`:"none",fontFamily:"inherit"}}>
                  <span style={{fontSize:24}}>{co.emoji}</span>
                  <span style={{fontSize:F.body,fontWeight:800,color:s?"#fff":C.text}}>{co.label}</span>
                </button>
              );})}
            </div>
            {condObj&&<div className="fadeUp" style={{marginTop:11,background:condObj.pale,border:`1.5px solid ${condObj.color}40`,borderRadius:R.md,padding:"11px 14px",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:20}}>{condObj.emoji}</span>
              <div style={{fontSize:F.sm,fontWeight:800,color:condObj.color}}>🧠 {CP[condObj.id]?.desc}</div>
            </div>}
          </div>

          {/* study select */}
          {cond&&<div style={{padding:"0 16px",marginBottom:20}} className="fadeUp">
            <Label>오늘 할 공부를 골라요!</Label>
            <StudySelector items={getItems(pid)} profileColor={prof.main} selected={sel} setSelected={setSel}/>
          </div>}

          {cond&&<div style={{padding:"0 16px"}}>
            <BtnPrimary onClick={goStudy} disabled={!sel.length} color={prof.main}>🧠 뇌과학 맞춤 순서로 시작!</BtnPrimary>
            <button onClick={()=>setProfiles(prev=>({...prev,[pid]:{...prev[pid],character:null}}))} style={{display:"block",textAlign:"center",width:"100%",padding:"11px",background:"none",border:"none",color:C.muted,fontSize:F.sm,fontWeight:600,cursor:"pointer",marginTop:7}}>집사 바꾸기</button>
          </div>}
        </>}
      </div>
    </div>
  );

  // ── STUDY ──────────────────────────────────────────────
  if(screen==="study")return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"20px 16px 80px"}}>
        <NavBar title={`${prof.name}의 공부 리스트`} onBack={()=>setScreen("home")}/>
        <div style={{marginBottom:18}} className="fadeUp"><Bubble char={char} text={phrase}/></div>
        {/* progress */}
        <div className="fadeUp d1" style={{background:C.surface,borderRadius:R.lg,padding:"15px 17px",marginBottom:14,boxShadow:SH.card,border:`1.5px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11}}>
            <Pill color={condObj.color} pale={condObj.pale}>{condObj.emoji} {condObj.label}</Pill>
            <span style={{fontSize:F.body,fontWeight:800,color:C.text}}>{doneCount}/{list.length} · {totalMin}분</span>
          </div>
          <div style={{background:C.border,borderRadius:99,height:11,overflow:"hidden"}}>
            <div style={{width:`${(doneCount/list.length)*100}%`,height:"100%",borderRadius:99,background:`linear-gradient(90deg,${prof.main},${C.purple})`,transition:"width .5s cubic-bezier(.22,.68,0,1.2)"}}/>
          </div>
        </div>
        {/* items */}
        {list.map((item,idx)=>{
          const sc2=SC[item.subject]||{bg:"#F5F5F5",bd:"#DDD",tx:"#555"};
          const done=checked[item.id];
          const allPrevDone=list.slice(0,idx).every(i=>checked[i.id]);
          const locked=!done&&!allPrevDone;
          const cog=item.cl>=7?"#FF7675":item.cl>=5?"#FDCB6E":"#00B894";
          return(
            <div key={item.id} className={`fadeUp d${Math.min(idx+1,4)}`} style={{background:done?C.surfaceAlt:C.surface,borderRadius:R.lg,border:`2px solid ${done?C.border:sc2.bd}`,padding:"15px 17px",marginBottom:11,opacity:done?.6:1,transition:"all .25s",boxShadow:done?"none":SH.card}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:13}}>
                <div style={{width:34,height:34,borderRadius:"50%",flexShrink:0,background:done?C.border:sc2.bd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:F.body,fontWeight:900,color:done?"#fff":sc2.tx,marginTop:2}}>{idx+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7,flexWrap:"wrap"}}>
                    <span style={{background:sc2.bg,color:sc2.tx,borderRadius:8,padding:"3px 9px",fontSize:F.sm,fontWeight:800}}>{item.se} {item.subject}</span>
                    <span style={{fontSize:F.h3,fontWeight:900,color:done?"#aaa":C.text,textDecoration:done?"line-through":"none"}}>{item.name}</span>
                    {item.amount&&<Pill color={C.sub} pale={C.surfaceAlt} style={{fontSize:10}}>{item.amount}{item.unit}</Pill>}
                  </div>
                  {!done&&<>
                    <div style={{fontSize:F.body,color:C.purple,fontWeight:700,marginBottom:5,lineHeight:1.5}}>💡 {item.reason}</div>
                    <div style={{fontSize:F.sm,color:C.sub,fontStyle:"italic",marginBottom:6,lineHeight:1.5}}>✏️ {item.tip}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,background:`${cog}20`,color:cog,borderRadius:6,padding:"2px 7px",fontWeight:800}}>🧠 인지부하 {item.cl}/10</span>
                      <span style={{fontSize:10,background:C.purpleP,color:C.purpleL,borderRadius:6,padding:"2px 7px",fontWeight:700}}>⏱️ ~{item.fm}분</span>
                    </div>
                  </>}
                </div>
                <button onClick={()=>handleCheck(item.id)} style={{width:44,height:44,borderRadius:"50%",flexShrink:0,background:done?prof.main:C.surfaceAlt,border:`2.5px solid ${done?prof.main:locked?C.border:C.borderDk}`,color:done?"#fff":locked?C.border:C.muted,fontSize:locked?15:20,fontWeight:900,cursor:locked?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",animation:done?"checkPop .3s ease-out":"none",boxShadow:done?`0 4px 12px ${prof.main}50`:"none",opacity:locked?.4:1}}>
                  {done?"✓":locked?"🔒":""}
                </button>
              </div>
            </div>
          );
        })}
        {allDone&&<div className="scaleIn" style={{marginTop:8}}><BtnPrimary onClick={handleComplete} color={prof.main} style={{animation:"pulse 1s infinite"}}>🎉 오늘 공부 모두 완료!</BtnPrimary></div>}
      </div>
    </div>
  );

  // ── REWARD ─────────────────────────────────────────────
  if(screen==="reward")return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${C.purple},${C.purpleL})`}}>
      {confetti&&<Confetti/>}
      <div style={{maxWidth:480,margin:"0 auto",padding:"40px 20px 60px",textAlign:"center"}}>
        <div className="scaleIn" style={{display:"flex",justifyContent:"center",marginBottom:14,animation:"heartbeat 1.2s ease-in-out 3"}}>
          <svg width="80" height="80" viewBox="0 0 80 80"><rect x="28" y="66" width="24" height="6" rx="3" fill="#E8A030"/><rect x="24" y="70" width="32" height="5" rx="2.5" fill="#FDCB6E"/><rect x="36" y="58" width="8" height="12" rx="2" fill="#FDCB6E"/><path d="M18 20 Q16 48 40 54 Q64 48 62 20Z" fill="#FDCB6E"/><path d="M22 20 Q20 46 40 51 Q60 46 58 20Z" fill="#FFE088"/><path d="M18 22 Q8 28 10 38 Q12 46 20 44" fill="none" stroke="#FDCB6E" strokeWidth="5" strokeLinecap="round"/><path d="M62 22 Q72 28 70 38 Q68 46 60 44" fill="none" stroke="#FDCB6E" strokeWidth="5" strokeLinecap="round"/><polygon points="40,26 42.5,33 50,33 44,37.5 46.5,44.5 40,40 33.5,44.5 36,37.5 30,33 37.5,33" fill="#E8A030"/></svg>
        </div>
        <div style={{fontSize:F.h1,fontWeight:900,color:"#fff",marginBottom:6,letterSpacing:-.5}}>오늘 공부 완료!</div>
        <div style={{fontSize:F.h3,color:"rgba(255,255,255,.85)",marginBottom:28,fontWeight:600}}>{prof.name}이(가) 정말 대단해요 🎊</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}><Bubble char={char} text={phrase} side="left"/></div>
        {reward&&<div className="scaleIn" style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(10px)",borderRadius:R.xl,padding:"24px 22px",marginBottom:24,border:"2px solid rgba(255,255,255,.3)"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:11,animation:"bloom .7s cubic-bezier(.22,.68,0,1.2)"}}>
            <FlowerSVG color={FCLR[reward.id]||"#FD79A8"} petals={FPET[reward.id]||6} size={76}/>
          </div>
          <div style={{fontSize:F.h2,fontWeight:900,color:"#fff",marginBottom:7}}>{reward.name} 씨앗 획득!</div>
          <div style={{display:"inline-block",borderRadius:R.full,padding:"5px 16px",fontSize:F.body,fontWeight:800,color:"#fff",background:reward.rarity==="legendary"?"#FDCB6E":reward.rarity==="rare"?"#A29BFE":"#00B894"}}>
            {reward.rarity==="legendary"?"✨ 전설급!":reward.rarity==="rare"?"💜 희귀":"🌿 일반"}
          </div>
        </div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:11,marginBottom:28}}>
          {[{n:(pdata?.seeds||[]).length,l:"씨앗",e:"🌱"},{n:pdata?.streak||0,l:"연속일",e:"🔥"},{n:pdata?.totalCompleted||0,l:"총 완료",e:"🏆"}].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.15)",borderRadius:R.md,padding:"13px 7px",backdropFilter:"blur(6px)",border:"1.5px solid rgba(255,255,255,.25)"}}>
              <div style={{fontSize:24}}>{s.e}</div>
              <div style={{fontSize:F.h2,fontWeight:900,color:"#fff"}}>{s.n}</div>
              <div style={{fontSize:F.sm,color:"rgba(255,255,255,.75)",fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setScreen("garden")} style={{width:"100%",padding:"17px",borderRadius:R.lg,background:"#fff",color:C.purple,fontSize:F.btn,fontWeight:900,border:"none",cursor:"pointer",marginBottom:11,boxShadow:"0 6px 20px rgba(0,0,0,.15)"}}>🌷 정원에 씨앗 심기</button>
        <BtnGhost onClick={()=>{setScreen("home");setList([]);setChecked({});setReward(null);}} style={{borderColor:"rgba(255,255,255,.4)",color:"rgba(255,255,255,.85)"}}>🏠 홈으로 돌아가기</BtnGhost>
      </div>
    </div>
  );

  // ── GARDEN ─────────────────────────────────────────────
  if(screen==="garden"){
    const ds=pdata?.lastCompleted?Math.floor((Date.now()-new Date(pdata.lastCompleted).getTime())/86400000):999;
    return(
      <div style={{minHeight:"100vh",background:C.bg}}>
        <div style={{maxWidth:480,margin:"0 auto",padding:"20px 16px 80px"}}>
          <NavBar title={`${prof?.name||"나"}의 텃밭 🌷`} onBack={()=>setScreen("home")}/>
          {char&&<div style={{marginBottom:18}} className="fadeUp"><Bubble char={char} text={phrase||(seeds.length>0?`씨앗 ${seeds.length}개! 심어볼까? 🌱`:garden.length>0?"꾸준히 공부해야 꽃이 건강해! 💪":"공부 완료하면 씨앗을 받을 수 있어!")}/></div>}
          {/* stats */}
          <div className="fadeUp d1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
            {[{n:seeds.length,l:"씨앗",e:"🌱"},{n:garden.length,l:"꽃",e:"🌷"},{n:pdata?.streak||0,l:"연속일",e:"🔥"}].map((s,i)=>(
              <div key={i} style={{background:C.surface,borderRadius:R.lg,padding:"15px 7px",textAlign:"center",boxShadow:SH.card,border:`1.5px solid ${C.border}`}}>
                <div style={{fontSize:26}}>{s.e}</div>
                <div style={{fontSize:F.h1,fontWeight:900,color:C.text}}>{s.n}</div>
                <div style={{fontSize:F.sm,color:C.muted,fontWeight:700}}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* wilt warning */}
          {ds>=1&&garden.length>0&&<div className="fadeUp" style={{background:"#FFF2EE",border:`2px solid ${C.coral}`,borderRadius:R.md,padding:"11px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:9}}>
            <span style={{fontSize:22}}>⚠️</span>
            <div>
              <div style={{fontSize:F.body,fontWeight:800,color:C.coral}}>{ds}일 쉬었어요!</div>
              <div style={{fontSize:F.sm,color:"#C04020",fontWeight:600}}>꽃이 {Math.min(100,ds*20)}% 시들고 있어요. 빨리 공부해요!</div>
            </div>
          </div>}
          {/* seeds */}
          {seeds.length>0&&<div className="fadeUp d2" style={{background:C.surface,borderRadius:R.lg,padding:"17px 15px",marginBottom:20,boxShadow:SH.card,border:`1.5px solid ${C.border}`}}>
            <Label style={{marginBottom:13}}>씨앗 보관함 ({seeds.length}개) 🌱</Label>
            <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
              {seeds.map((seed,i)=>(
                <button key={i} onClick={()=>setPlantIdx(i)} style={{background:C.surfaceAlt,border:`2px dashed ${C.border}`,borderRadius:R.md,padding:"11px 13px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,fontFamily:"inherit",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.purple;e.currentTarget.style.background=C.purpleP;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.surfaceAlt;}}>
                  <FlowerSVG color={FCLR[seed.id]||"#FD79A8"} petals={FPET[seed.id]||6} size={42}/>
                  <span style={{fontSize:F.sm,fontWeight:700,color:C.sub}}>심기</span>
                </button>
              ))}
            </div>
          </div>}
          {/* plant modal */}
          {plantIdx!==null&&seeds[plantIdx]&&<div style={{position:"fixed",inset:0,background:"rgba(44,34,100,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"0 20px"}}>
            <div className="scaleIn" style={{background:C.surface,borderRadius:R.xl,padding:"30px 22px",textAlign:"center",width:"100%",maxWidth:340,boxShadow:SH.float}}>
              <div style={{display:"flex",justifyContent:"center",animation:"bloom .6s ease-out",marginBottom:11}}><FlowerSVG color={FCLR[seeds[plantIdx].id]||"#FD79A8"} petals={FPET[seeds[plantIdx].id]||6} size={76}/></div>
              <div style={{fontSize:F.h2,fontWeight:900,color:C.text,marginBottom:7}}>{seeds[plantIdx].name}을 심을까요?</div>
              <div style={{fontSize:F.body,color:C.sub,marginBottom:22,lineHeight:1.6,fontWeight:600}}>매일 공부하면 건강하게 자라요! 🌱<br/>공부를 안 하면 하루 20%씩 시들어요.</div>
              <BtnPrimary onClick={()=>plantSeed(plantIdx)} color={prof?.main||C.purple} style={{marginBottom:9}}>🌱 텃밭에 심기</BtnPrimary>
              <BtnGhost onClick={()=>setPlantIdx(null)}>나중에</BtnGhost>
            </div>
          </div>}
          {/* garden */}
          <div className="fadeUp d3" style={{background:C.surface,borderRadius:R.xl,overflow:"hidden",boxShadow:SH.card,border:`1.5px solid ${C.border}`}}>
            <div style={{background:"linear-gradient(180deg,#C8E8F8 0%,#A0D8C0 55%,#78B890 55%)",padding:"13px 11px 0",minHeight:garden.length>0?110:170,position:"relative"}}>
              <div style={{position:"absolute",top:9,left:14,fontSize:17,opacity:.6}}>☀️</div>
              <div style={{position:"absolute",top:11,left:46,fontSize:12,opacity:.4}}>☁️</div>
              {garden.length===0?(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:150,color:"rgba(255,255,255,.7)",fontWeight:800,gap:9,textAlign:"center"}}>
                  <span style={{fontSize:40}}>🌱</span>
                  <div><div style={{fontSize:F.h3}}>아직 비어있어요</div><div style={{fontSize:F.sm,opacity:.8,marginTop:3}}>씨앗을 심어보세요!</div></div>
                </div>
              ):(
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"0 8px",alignItems:"flex-end"}}>
                  {garden.map((flower,i)=><GardenFlower key={i} flower={flower} health={calcHealth(flower.plantedAt,pdata?.lastCompleted)}/>)}
                </div>
              )}
            </div>
            <div style={{background:"linear-gradient(180deg,#6B4423,#5A3618)",padding:"7px 12px 10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:11,color:"#C8A870",fontWeight:700,opacity:.8}}>🌿 우리 가족 텃밭</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FAMILY ─────────────────────────────────────────────
  if(screen==="family")return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"20px 16px 80px"}}>
        <NavBar title="우리 가족 현황 👨‍👩‍👧‍👦" onBack={()=>setScreen("home")}/>
        {PROFILES.map((p,i)=>{
          const pd=profiles[p.id],ch=pd?.character?CHARS.find(c=>c.id===pd.character):null;
          const ds=pd?.lastCompleted?Math.floor((Date.now()-new Date(pd.lastCompleted).getTime())/86400000):999;
          return(
            <div key={p.id} className={`fadeUp d${i+1}`} style={{background:C.surface,borderRadius:R.xl,padding:"19px 17px",marginBottom:11,boxShadow:SH.card,border:`2.5px solid ${p.pale}`}}>
              <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:13}}>
                <div style={{width:52,height:52,borderRadius:R.md,background:p.pale,border:`2px solid ${p.main}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{p.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:F.h3,fontWeight:900,color:C.text,display:"flex",alignItems:"center",gap:7}}>
                    {p.name}{ch&&<CharSVG id={ch.id} size={26}/>}
                  </div>
                  <div style={{fontSize:F.sm,color:C.muted,fontWeight:600}}>집사: {ch?ch.name:"미선택"}</div>
                </div>
                {ds>=2&&(pd?.garden||[]).length>0&&<Pill color={C.coral} pale="#FFF0F0" style={{fontSize:10}}>⚠️ {ds}일</Pill>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
                {[{n:(pd?.seeds||[]).length,l:"🌱씨앗"},{n:(pd?.garden||[]).length,l:"🌷꽃"},{n:pd?.totalCompleted||0,l:"🏆완료"},{n:pd?.streak||0,l:"🔥연속"}].map((s,j)=>(
                  <div key={j} style={{background:p.pale,borderRadius:R.sm,padding:"9px 4px",textAlign:"center"}}>
                    <div style={{fontSize:F.h3,fontWeight:900,color:C.text}}>{s.n}</div>
                    <div style={{fontSize:9,color:C.muted,fontWeight:700}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
 );
 // App 함수 끝

/* ═══════════════════════════════════════════════════════
   Shared Micro-Styles & Export
═══════════════════════════════════════════════════════ */
const S = {
  iconBtn: {
    width: 40, height: 40, borderRadius: R.md,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.2s"
  },
  card: {
    background: C.surface, borderRadius: R.xl, padding: 20,
    boxShadow: "0 8px 24px rgba(108,92,231,0.06)"
  }
};

export default App;
