import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM — 공부집사 v4
   "Wellness + Learning Coach" — 트렌디, 가독성, 감성 통합
═══════════════════════════════════════════════════════ */

const DS = {
  // ── 1. COLOR PALETTE ──────────────────────────────
  color: {
    // Primary
    purple:      "#6C5CE7",
    purpleLight: "#A29BFE",
    purplePale:  "#EDE9FF",
    purpleDark:  "#4834D4",

    // Accent
    yellow:      "#FDCB6E",
    yellowPale:  "#FFF8E7",
    pink:        "#FD79A8",
    pinkPale:    "#FFF0F5",
    mint:        "#00B894",
    mintPale:    "#E0FAF4",
    sky:         "#74B9FF",
    skyPale:     "#EAF4FF",
    coral:       "#FF7675",
    coralPale:   "#FFF0F0",
    orange:      "#E17055",
    orangePale:  "#FFF2EE",

    // Neutrals
    bg:          "#F8F7FF",
    surface:     "#FFFFFF",
    surfaceAlt:  "#F3F2FA",
    border:      "#E8E6F8",
    borderDark:  "#D1CEEE",
    text:        "#2D3436",
    textSub:     "#636E72",
    textMuted:   "#A0A0B8",
    white:       "#FFFFFF",
  },

  // ── 2. TYPOGRAPHY ─────────────────────────────────
  font: {
    display:  "clamp(28px, 7vw, 36px)",   // 앱 타이틀
    h1:       "clamp(22px, 5.5vw, 28px)", // 화면 제목
    h2:       "clamp(18px, 4.5vw, 22px)", // 섹션 타이틀
    h3:       "clamp(16px, 4vw, 19px)",   // 카드 제목
    body:     "clamp(14px, 3.5vw, 16px)", // 본문
    small:    "clamp(12px, 3vw, 14px)",   // 보조 텍스트
    xs:       "11px",                      // 뱃지
    button:   "clamp(15px, 3.8vw, 17px)", // 버튼
    buttonSm: "clamp(13px, 3.3vw, 15px)",
  },

  // ── 3. SPACING ────────────────────────────────────
  space: { xs:4, sm:8, md:14, lg:20, xl:28, xxl:40 },

  // ── 4. RADIUS ─────────────────────────────────────
  radius: { sm:10, md:16, lg:22, xl:28, full:999 },

  // ── 5. SHADOW ─────────────────────────────────────
  shadow: {
    card: "0 4px 20px rgba(108,92,231,0.10), 0 1px 4px rgba(0,0,0,0.04)",
    float:"0 8px 32px rgba(108,92,231,0.18), 0 2px 8px rgba(0,0,0,0.06)",
    btn:  "0 4px 14px rgba(108,92,231,0.35)",
  },

  // ── PROFILE COLORS ────────────────────────────────
  profileColor: {
    child1: { main:"#FD79A8", pale:"#FFF0F5", text:"#C0436C" },
    child2: { main:"#FDCB6E", pale:"#FFF8E7", text:"#A07010" },
    mom:    { main:"#00B894", pale:"#E0FAF4", text:"#007A60" },
    dad:    { main:"#74B9FF", pale:"#EAF4FF", text:"#2070C0" },
  },
};

/* ═══════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&family=Nunito+Sans:wght@500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #F8F7FF;
    font-family: 'Nunito Sans', 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  button { font-family: inherit; cursor: pointer; border: none; outline: none; }
  input  { font-family: inherit; outline: none; }

  /* Animations */
  @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
  @keyframes float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes wiggle    { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
  @keyframes checkPop  { 0%{transform:scale(0)} 60%{transform:scale(1.25)} 100%{transform:scale(1)} }
  @keyframes confetti  { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(260px) rotate(720deg);opacity:0} }
  @keyframes bloom     { 0%{transform:scale(0) rotate(-15deg);opacity:0} 65%{transform:scale(1.15) rotate(3deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.15)} 28%{transform:scale(1)} 42%{transform:scale(1.08)} 70%{transform:scale(1)} }
  @keyframes slideIn   { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes pulseSoft { 0%,100%{opacity:1} 50%{opacity:0.7} }
  @keyframes spin360   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .fadeUp   { animation: fadeUp   0.4s cubic-bezier(.22,.68,0,1.2) both; }
  .scaleIn  { animation: scaleIn  0.35s cubic-bezier(.22,.68,0,1.2) both; }
  .float    { animation: float    3s ease-in-out infinite; }
  .wiggle   { animation: wiggle   0.5s ease-in-out; }
  .slideIn  { animation: slideIn  0.35s ease-out both; }

  /* Stagger delays */
  .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s}
  .d4{animation-delay:.24s} .d5{animation-delay:.30s} .d6{animation-delay:.36s}

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D1CEEE; border-radius: 4px; }
`;

function injectCSS() {
  if (document.getElementById("gj4-css")) return;
  const s = document.createElement("style");
  s.id = "gj4-css";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════
   BRAIN SCIENCE ENGINE (from v3, preserved)
═══════════════════════════════════════════════════════ */
const CONDITION_PROFILE = {
  sleepy:      { energyLevel:2, cogLoadCap:6,  needsWarmup:true,  needsEasy:true,  desc:"낮은 각성 — 점진적 워밍업 필요" },
  energetic:   { energyLevel:9, cogLoadCap:10, needsWarmup:false, needsEasy:false, desc:"고각성 — 어려운 과제 우선 최적" },
  sick:        { energyLevel:2, cogLoadCap:4,  needsWarmup:false, needsEasy:true,  desc:"신체 자원 고갈 — 경량 활동 위주" },
  blank:       { energyLevel:3, cogLoadCap:5,  needsWarmup:true,  needsEasy:true,  desc:"전전두엽 저활성 — 쉬운 것부터" },
  focused:     { energyLevel:8, cogLoadCap:10, needsWarmup:false, needsEasy:false, desc:"전두엽 최고 활성 — 즉시 고난도 시작" },
  annoyed:     { energyLevel:4, cogLoadCap:5,  needsWarmup:true,  needsEasy:true,  desc:"편도체 과활성 — 운동으로 먼저 해소" },
  restless:    { energyLevel:7, cogLoadCap:8,  needsWarmup:true,  needsEasy:false, desc:"신체 각성 과잉 — 에너지 발산 후 집중" },
  unconfident: { energyLevel:3, cogLoadCap:5,  needsWarmup:false, needsEasy:true,  desc:"자기효능감 저하 — 즉각 성공경험 필요" },
};

function calcScore(item, profile) {
  let s = 0;
  const ratio = item.cogLoad / profile.cogLoadCap;
  if (ratio <= 1.0) s += (1 - ratio) * 30; else s -= (ratio - 1) * 40;
  if (profile.needsWarmup && item.type === "exercise") s += 50;
  if (profile.needsWarmup && item.cogLoad <= 3) s += 20;
  if (profile.needsEasy) s += (10 - item.cogLoad) * 4;
  if (profile.energyLevel >= 8 && !profile.needsWarmup) s += item.cogLoad * 3;
  if (profile.energyLevel <= 2 && item.type === "exercise") s -= 30;
  return s;
}

function applyInterleaving(items) {
  if (items.length <= 2) return items;
  const result = [], rem = [...items];
  while (rem.length > 0) {
    const lastGrp = result.length > 0 ? result[result.length-1].interleaveGroup : null;
    const diff = rem.filter(i => i.interleaveGroup !== lastGrp);
    const pick = diff.length > 0 ? diff[0] : rem[0];
    result.push(pick);
    rem.splice(rem.indexOf(pick), 1);
  }
  return result;
}

function generateReason(item, condition, pos, total) {
  const p = CONDITION_PROFILE[condition];
  if (item.type === "exercise" && pos === 0) return `운동 먼저! BDNF 분비로 이후 학습 효율이 높아져요`;
  if (item.cogLoad >= 8 && p.energyLevel >= 7) return `인지부하 ${item.cogLoad}/10 — 지금이 가장 집중하기 좋은 타이밍`;
  if (item.cogLoad <= 3 && p.needsEasy) return `부담 낮은 과제로 자신감과 도파민 먼저 채워요`;
  if (item.mnemonicType === "recall") return `인출 연습 효과 — 직접 떠올리기가 읽기보다 기억력 2~3배`;
  if (item.mnemonicType === "spacing") return `간격 효과 — 오늘 에너지로 망각 곡선을 이겨내요`;
  if (item.type === "reading") return `인지 안정 구간에 독서 배치 — 정보 통합에 효과적`;
  return `교차학습 배치 — 과목 섞기로 장기기억 강화`;
}

function recommendV3(items, condition) {
  const p = CONDITION_PROFILE[condition];
  const scored = [...items].map(i => ({ ...i, _s: calcScore(i, p) })).sort((a,b) => b._s - a._s);
  const interleaved = applyInterleaving(scored);
  return interleaved.map((item, i) => ({
    ...item,
    reason: generateReason(item, condition, i, interleaved.length),
    focusMin: item.type === "exercise" ? (Number(item.amount)||15)
            : item.type === "memory"   ? Math.ceil((Number(item.amount)||10)*0.5)
            : item.type === "reading"  ? Math.ceil((Number(item.amount)||8)*2)
            : item.type === "workbook" ? Math.ceil((Number(item.amount)||4)*5)
            : item.type === "study"    ? (Number(item.amount)||1)*45
            : 15,
  }));
}

/* ═══════════════════════════════════════════════════════
   SVG CHARACTER ILLUSTRATIONS — 심플 선형 스타일
   선 위주 + 동그란 눈 + 최소한의 채색
═══════════════════════════════════════════════════════ */

const SW = 3;   // 기본 선 굵기
const SWB = 3.5; // 굵은 선

/* 🐰 토끼 — 긴 귀, 나비넥타이, 수염 */
function RabbitSVG({ size = 100, mood = "happy" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" strokeLinejoin="round">
      {/* 귀 — 왼 */}
      <path d="M34 46 Q28 22 32 8 Q34 2 38 8 Q42 22 40 46" fill="#EDE9FF" stroke="#6C5CE7" strokeWidth={SW}/>
      <path d="M34 40 Q31 24 33 14 Q34 10 36 14 Q38 24 37 40" fill="#FDB0D0" stroke="none"/>
      {/* 귀 — 오른 */}
      <path d="M60 46 Q58 22 62 8 Q66 2 68 8 Q72 22 66 46" fill="#EDE9FF" stroke="#6C5CE7" strokeWidth={SW}/>
      <path d="M62 40 Q63 24 64 14 Q65 10 66 14 Q68 24 66 40" fill="#FDB0D0" stroke="none"/>
      {/* 몸 */}
      <ellipse cx="50" cy="88" rx="26" ry="20" fill="#EDE9FF" stroke="#6C5CE7" strokeWidth={SW}/>
      {/* 나비넥타이 */}
      <polygon points="38,78 45,82 38,86" fill="#6C5CE7"/>
      <polygon points="62,78 55,82 62,86" fill="#6C5CE7"/>
      <circle cx="50" cy="82" r="3.5" fill="#4834D4"/>
      {/* 머리 */}
      <circle cx="50" cy="52" r="24" fill="white" stroke="#6C5CE7" strokeWidth={SW}/>
      {/* 볼터치 */}
      <ellipse cx="32" cy="58" rx="7" ry="4.5" fill="#FDB0D0" opacity="0.5"/>
      <ellipse cx="68" cy="58" rx="7" ry="4.5" fill="#FDB0D0" opacity="0.5"/>
      {/* 눈 */}
      {mood === "happy" ? (
        <>
          <path d="M37 50 Q41 44 45 50" fill="none" stroke="#2D1B6B" strokeWidth={SWB}/>
          <path d="M55 50 Q59 44 63 50" fill="none" stroke="#2D1B6B" strokeWidth={SWB}/>
        </>
      ) : mood === "sleepy" ? (
        <>
          <path d="M37 52 Q41 49 45 52" fill="none" stroke="#2D1B6B" strokeWidth={SW}/>
          <path d="M55 52 Q59 49 63 52" fill="none" stroke="#2D1B6B" strokeWidth={SW}/>
          <text x="67" y="40" fontSize="9" fill="#A29BFE" fontWeight="800" fontFamily="Nunito,sans-serif">zz</text>
        </>
      ) : (
        <>
          <circle cx="41" cy="50" r="4.5" fill="#2D1B6B"/>
          <circle cx="59" cy="50" r="4.5" fill="#2D1B6B"/>
          <circle cx="42.5" cy="48.5" r="1.5" fill="white"/>
          <circle cx="60.5" cy="48.5" r="1.5" fill="white"/>
        </>
      )}
      {/* 코 */}
      <ellipse cx="50" cy="58" rx="3.5" ry="2.5" fill="#FDB0D0"/>
      {/* 입 */}
      <path d={mood==="happy" ? "M44 63 Q50 69 56 63" : "M44 66 Q50 61 56 66"}
        fill="none" stroke="#C04878" strokeWidth="2.5"/>
      {/* 수염 */}
      <line x1="20" y1="57" x2="40" y2="60" stroke="#C8B4E8" strokeWidth="1.5" opacity="0.7"/>
      <line x1="20" y1="62" x2="40" y2="62" stroke="#C8B4E8" strokeWidth="1.5" opacity="0.7"/>
      <line x1="60" y1="60" x2="80" y2="57" stroke="#C8B4E8" strokeWidth="1.5" opacity="0.7"/>
      <line x1="60" y1="62" x2="80" y2="62" stroke="#C8B4E8" strokeWidth="1.5" opacity="0.7"/>
      {/* 발 */}
      <ellipse cx="37" cy="107" rx="12" ry="5.5" fill="#EDE9FF" stroke="#6C5CE7" strokeWidth="2"/>
      <ellipse cx="63" cy="107" rx="12" ry="5.5" fill="#EDE9FF" stroke="#6C5CE7" strokeWidth="2"/>
    </svg>
  );
}

/* 🐘 코끼리 — 큰 귀, 코 위치 수정, 조끼 */
function ElephantSVG({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" strokeLinejoin="round">
      {/* 귀 — 왼 */}
      <ellipse cx="16" cy="42" rx="14" ry="18" fill="#BDD0E8" stroke="#74B9FF" strokeWidth={SW}/>
      {/* 귀 — 오른 */}
      <ellipse cx="84" cy="42" rx="14" ry="18" fill="#BDD0E8" stroke="#74B9FF" strokeWidth={SW}/>
      {/* 몸 */}
      <ellipse cx="50" cy="86" rx="28" ry="21" fill="#DDEAF8" stroke="#74B9FF" strokeWidth={SW}/>
      {/* 조끼 */}
      <path d="M32 72 Q50 67 68 72 L66 96 Q50 100 34 96 Z" fill="#74B9FF" opacity="0.35" stroke="#74B9FF" strokeWidth="1.5"/>
      <line x1="50" y1="68" x2="50" y2="96" stroke="#74B9FF" strokeWidth="1.5" opacity="0.5"/>
      {/* 머리 — 코끼리는 얼굴 아래쪽이 길쭉한 편 */}
      <ellipse cx="50" cy="44" rx="26" ry="28" fill="white" stroke="#74B9FF" strokeWidth={SW}/>
      {/* 코 — 얼굴 아랫부분 중앙에서 자연스럽게 내려옴 */}
      <path d="M50 62 Q44 70 42 78 Q41 84 46 84 Q50 84 49 78 Q48 72 52 66"
        fill="none" stroke="#74B9FF" strokeWidth="3.5"/>
      {/* 볼 */}
      <ellipse cx="33" cy="50" rx="8" ry="5" fill="#FDB0D0" opacity="0.4"/>
      <ellipse cx="67" cy="50" rx="8" ry="5" fill="#FDB0D0" opacity="0.4"/>
      {/* 눈 — 코 위 양쪽 */}
      <circle cx="39" cy="38" r="5" fill="white" stroke="#1C2E5A" strokeWidth="2"/>
      <circle cx="61" cy="38" r="5" fill="white" stroke="#1C2E5A" strokeWidth="2"/>
      <circle cx="40" cy="38" r="2.8" fill="#1C2E5A"/>
      <circle cx="62" cy="38" r="2.8" fill="#1C2E5A"/>
      <circle cx="41" cy="37" r="1.1" fill="white"/>
      <circle cx="63" cy="37" r="1.1" fill="white"/>
      {/* 웃음 — 코 위 */}
      <path d="M40 56 Q50 63 60 56" fill="none" stroke="#1C2E5A" strokeWidth="2.5"/>
      {/* 발 */}
      <ellipse cx="34" cy="107" rx="13" ry="5.5" fill="#DDEAF8" stroke="#74B9FF" strokeWidth="2"/>
      <ellipse cx="66" cy="107" rx="13" ry="5.5" fill="#DDEAF8" stroke="#74B9FF" strokeWidth="2"/>
    </svg>
  );
}

/* 🐍 뱀 — 똬리 선형, 안경, 혀 */
function SnakeSVG({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" strokeLinejoin="round">
      {/* 몸통 — 선형 똬리 */}
      <path d="M18 98 Q14 80 28 70 Q42 60 50 66 Q58 72 68 62 Q80 50 74 36 Q70 26 60 26"
        fill="none" stroke="#00B894" strokeWidth="12"/>
      <path d="M18 98 Q14 80 28 70 Q42 60 50 66 Q58 72 68 62 Q80 50 74 36 Q70 26 60 26"
        fill="none" stroke="#E0FAF4" strokeWidth="5" opacity="0.8"/>
      <path d="M18 98 Q14 80 28 70 Q42 60 50 66 Q58 72 68 62 Q80 50 74 36 Q70 26 60 26"
        fill="none" stroke="#00B894" strokeWidth="2" strokeDasharray="6 9" opacity="0.6"/>
      {/* 머리 */}
      <ellipse cx="56" cy="22" rx="18" ry="14" fill="white" stroke="#00B894" strokeWidth={SW}/>
      {/* 눈 (동그란) */}
      <circle cx="49" cy="18" r="5" fill="white" stroke="#2D3436" strokeWidth="2"/>
      <circle cx="63" cy="18" r="5" fill="white" stroke="#2D3436" strokeWidth="2"/>
      <circle cx="50" cy="18" r="2.5" fill="#2D3436"/>
      <circle cx="64" cy="18" r="2.5" fill="#2D3436"/>
      <circle cx="50.8" cy="17.2" r="1" fill="white"/>
      <circle cx="64.8" cy="17.2" r="1" fill="white"/>
      {/* 안경 */}
      <circle cx="49" cy="18" r="6.5" fill="none" stroke="#2D3436" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="63" cy="18" r="6.5" fill="none" stroke="#2D3436" strokeWidth="1.5" opacity="0.3"/>
      <line x1="55.5" y1="18" x2="56.5" y2="18" stroke="#2D3436" strokeWidth="1.5" opacity="0.3"/>
      {/* 미소 */}
      <path d="M46 28 Q56 34 66 28" fill="none" stroke="#00B894" strokeWidth="2.5"/>
      {/* 혀 */}
      <line x1="56" y1="34" x2="56" y2="41" stroke="#FF7675" strokeWidth="2"/>
      <line x1="56" y1="41" x2="52" y2="46" stroke="#FF7675" strokeWidth="2"/>
      <line x1="56" y1="41" x2="60" y2="46" stroke="#FF7675" strokeWidth="2"/>
    </svg>
  );
}

/* 🐸 개구리 — 왕관, 큰 눈, 넓은 입 */
function FrogSVG({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" strokeLinejoin="round">
      {/* 몸 */}
      <ellipse cx="50" cy="86" rx="28" ry="20" fill="#E0FAF4" stroke="#00B894" strokeWidth={SW}/>
      {/* 배 */}
      <ellipse cx="50" cy="90" rx="16" ry="12" fill="white" stroke="#00B894" strokeWidth="1.5"/>
      {/* 눈 볼록 (머리 위) */}
      <circle cx="34" cy="34" r="13" fill="white" stroke="#00B894" strokeWidth={SW}/>
      <circle cx="66" cy="34" r="13" fill="white" stroke="#00B894" strokeWidth={SW}/>
      {/* 머리 */}
      <ellipse cx="50" cy="54" rx="28" ry="22" fill="white" stroke="#00B894" strokeWidth={SW}/>
      {/* 눈 (큰) */}
      <circle cx="34" cy="34" r="9" fill="white"/>
      <circle cx="66" cy="34" r="9" fill="white"/>
      <circle cx="35" cy="35" r="6" fill="#1A3A1A"/>
      <circle cx="67" cy="35" r="6" fill="#1A3A1A"/>
      <circle cx="36.5" cy="33.5" r="2.2" fill="white"/>
      <circle cx="68.5" cy="33.5" r="2.2" fill="white"/>
      {/* 볼 */}
      <ellipse cx="26" cy="58" rx="7" ry="5" fill="#FDB0D0" opacity="0.45"/>
      <ellipse cx="74" cy="58" rx="7" ry="5" fill="#FDB0D0" opacity="0.45"/>
      {/* 큰 웃음 */}
      <path d="M28 64 Q50 78 72 64" fill="none" stroke="#00B894" strokeWidth="3"/>
      {/* 왕관 */}
      <polyline points="36,26 40,16 50,26 60,16 64,26"
        fill="none" stroke="#FDCB6E" strokeWidth="2.5" strokeLinejoin="miter"/>
      <circle cx="40" cy="16" r="2.5" fill="#FDCB6E"/>
      <circle cx="50" cy="26" r="2.5" fill="#FDCB6E"/>
      <circle cx="60" cy="16" r="2.5" fill="#FDCB6E"/>
      {/* 발 */}
      <ellipse cx="34" cy="107" rx="14" ry="5.5" fill="#E0FAF4" stroke="#00B894" strokeWidth="2"/>
      <ellipse cx="66" cy="107" rx="14" ry="5.5" fill="#E0FAF4" stroke="#00B894" strokeWidth="2"/>
    </svg>
  );
}

/* ── 캐릭터 라우터 ── */
function CharSVG({ id, size = 100, mood = "happy" }) {
  if (id === "rabbit")   return <RabbitSVG   size={size} mood={mood}/>;
  if (id === "elephant") return <ElephantSVG size={size}/>;
  if (id === "snake")    return <SnakeSVG    size={size}/>;
  if (id === "frog")     return <FrogSVG     size={size}/>;
  return null;
}

/* ═══════════════════════════════════════════════════════
   SVG FLOWER — 심플 선형
═══════════════════════════════════════════════════════ */
function FlowerSVG({ color = "#FD79A8", petals = 6, size = 52, wilting = false, dead = false }) {
  const angles = Array.from({ length: petals }, (_, i) => (i / petals) * 360);
  const tilt = dead ? "rotate(45deg)" : wilting ? "rotate(14deg)" : "none";
  const strokeC = dead ? "#B0B0B0" : color;
  const fillC   = dead ? "#E8E8E8" : `${color}40`;
  const stemC   = dead ? "#B0B0B0" : wilting ? "#98C890" : "#00B894";
  return (
    <svg width={size} height={size} viewBox="0 0 52 58" xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" style={{ transform: tilt, transition:"transform 0.5s" }}>
      {/* 줄기 */}
      <path d="M26 50 Q24 40 26 30" stroke={stemC} strokeWidth="2.5" fill="none"/>
      {/* 잎 */}
      <path d="M26 42 Q18 36 17 41 Q19 48 26 42Z" fill={stemC} opacity={dead?0.4:0.7}/>
      {/* 꽃잎 */}
      {angles.map((a, i) => {
        const rad = (a - 90) * Math.PI / 180;
        const cx  = 26 + 11 * Math.cos(rad);
        const cy  = 22 + 11 * Math.sin(rad);
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="5.5" ry="9"
            fill={fillC} stroke={strokeC} strokeWidth="1.8"
            transform={`rotate(${a},${cx},${cy})`}
            opacity={dead ? 0.5 : wilting ? 0.6 : 1}/>
        );
      })}
      {/* 중심 */}
      <circle cx="26" cy="22" r="7" fill={dead?"#D8D0B8":"#FDCB6E"} stroke={dead?"#B0A080":"#E8A030"} strokeWidth="1.8"/>
      <circle cx="26" cy="22" r="3.5" fill={dead?"#C0B898":"#FFE088"}/>
    </svg>
  );
}

/* ─── 꽃 색상 / 꽃잎 수 ─── */
const FLOWER_COLORS = {
  rose:"#FD79A8", sunflower:"#FDCB6E", tulip:"#C084FC",
  daisy:"#FDE68A", cherry:"#F9A8D4",  clover:"#34D399",
  star:"#FCD34D",  rainbow:"#A78BFA",  crystal:"#67E8F9",
};
const FLOWER_PETALS = { rose:5, sunflower:8, tulip:6, daisy:8, cherry:5, clover:4, star:5, rainbow:6, crystal:7 };

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const PROFILES = [
  { id:"child1", name:"나은이", emoji:"🌸", ...DS.profileColor.child1 },
  { id:"child2", name:"지윤이", emoji:"⭐", ...DS.profileColor.child2 },
  { id:"mom",    name:"엄마",   emoji:"💚", ...DS.profileColor.mom },
  { id:"dad",    name:"아빠",   emoji:"💙", ...DS.profileColor.dad },
];

const CHARS = [
  { id:"rabbit",  name:"토끼",   bg:"#EDE9FF", accent:"#6C5CE7",
    phrases: { greet:["안녕! 토끼 집사야! 오늘도 깡충깡충!","오늘 뇌 최적화 같이 해볼까? 🥕"],
               study:["과학적 순서야! 믿고 해봐! 💜","하나씩 클리어하면 돼!"],
               check:["잘했어! 도파민 UP! 🎉","완벽해! 계속 가자!","훌륭해! 기억이 쌓여!"],
               done:["오늘 뇌풀가동 성공!! 🏆","최고야! 공부 챔피언!"],
               reward:["씨앗 획득! 꼭 심어줘 🌱","정원이 더 예뻐질 거야!"] } },
  { id:"elephant",name:"코끼리", bg:"#EAF4FF", accent:"#74B9FF",
    phrases: { greet:["든든한 코끼리 집사야! 🐘","차근차근, 확실하게!"],
               study:["한 발씩 나아가면 돼! 🦶","순서에는 과학적 이유가 있어!"],
               check:["훌륭해! 계속 나아가자!","잘하고 있어! 💙","멋져! 기억이 강해져!"],
               done:["묵묵히 해냈어! 대단해! 🏆","코끼리 집사가 감동받았어!"],
               reward:["열심히 한 보상이야! 🌱","씨앗이 꽃으로 필 거야!"] } },
  { id:"snake",   name:"뱀",     bg:"#E0FAF4", accent:"#00B894",
    phrases: { greet:["스르르... 집중할 시간.","침착하게, 날카롭게."],
               study:["집중... 흔들리지 마. 🎯","순서에는 이유가 있어."],
               check:["음... 잘했어.","좋아. 예상대로야. 💚","인정해."],
               done:["예상을 뛰어넘었어. 대단해. 🏆","진심으로 최고야."],
               reward:["씨앗. 소중히 심어. 🌱","노력의 결실이야."] } },
  { id:"frog",    name:"개구리", bg:"#FFF0F5", accent:"#FD79A8",
    phrases: { greet:["개굴개굴! 신나게 점프! 🐸","나랑 같이 뇌 풀가동!"],
               study:["신나게 가보자고! 🎉","집중! 순서대로면 문제없어!"],
               check:["개굴개굴! 잘했어! 🎊","최고야! 기뻐! 🐸","대박! 기억에 팍!"],
               done:["개굴개굴!! 완전 최고!! 🎉","해냈다! 자랑스러워!"],
               reward:["씨앗! 빨리 심어! 🌱","꽃 피울 거야!"] } },
];

const CONDITIONS = [
  { id:"sleepy",      label:"졸립다",      emoji:"😴", color:"#9B8FE0", pale:"#F0EEFF" },
  { id:"energetic",   label:"에너지 넘침", emoji:"⚡", color:"#FDCB6E", pale:"#FFF8E7" },
  { id:"sick",        label:"아프다",      emoji:"🤒", color:"#FF7675", pale:"#FFF0F0" },
  { id:"blank",       label:"멍하다",      emoji:"😶", color:"#74B9FF", pale:"#EAF4FF" },
  { id:"focused",     label:"집중 잘 됨",  emoji:"🎯", color:"#00B894", pale:"#E0FAF4" },
  { id:"annoyed",     label:"짜증난다",    emoji:"😤", color:"#E17055", pale:"#FFF2EE" },
  { id:"restless",    label:"근질근질",    emoji:"🤸", color:"#FD79A8", pale:"#FFF0F5" },
  { id:"unconfident", label:"자신없다",    emoji:"😟", color:"#A29BFE", pale:"#EDE9FF" },
];

const STUDY_ITEMS = {
  child: [
    { id:"k_dict",   subject:"국어", name:"받아쓰기",   subjectEmoji:"📝", type:"memory",   cogLoad:5, interleaveGroup:"verbal",  mnemonicType:"recall",      difficulty:2, unit:"단어",   tip:"가리고 직접 떠올리기! 그게 핵심이에요." },
    { id:"k_noon",   subject:"국어", name:"눈높이",     subjectEmoji:"📗", type:"workbook", cogLoad:5, interleaveGroup:"verbal",  mnemonicType:"spacing",     difficulty:2, unit:"페이지", tip:"틀린 것만 다시 풀면 효과 2배!" },
    { id:"k_read",   subject:"국어", name:"자유독서",   subjectEmoji:"📖", type:"reading",  cogLoad:3, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:1, unit:"페이지", tip:"읽고 한 문장으로 요약해봐요." },
    { id:"e_froebel",subject:"영어", name:"프뢰벨",     subjectEmoji:"🏷️", type:"reading",  cogLoad:3, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:1, unit:"페이지", tip:"그림 보고 뜻 먼저 추측!" },
    { id:"e_alpha",  subject:"영어", name:"알파벳 쓰기",subjectEmoji:"🔤", type:"writing",  cogLoad:2, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"개",     tip:"보고→머릿속으로 그리고→써요." },
    { id:"e_reading",subject:"영어", name:"리딩앤",     subjectEmoji:"📚", type:"reading",  cogLoad:4, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:2, unit:"페이지", tip:"큰 소리로! 소리내기가 핵심이에요." },
    { id:"e_kids",   subject:"영어", name:"키즈컬리지", subjectEmoji:"🎒", type:"workbook", cogLoad:5, interleaveGroup:"verbal",  mnemonicType:"spacing",     difficulty:2, unit:"페이지", tip:"집중해서 한 번에 끝내요." },
    { id:"e_vocab",  subject:"영어", name:"단어 외우기",subjectEmoji:"💬", type:"memory",   cogLoad:6, interleaveGroup:"verbal",  mnemonicType:"recall",      difficulty:2, unit:"단어",   tip:"보고 → 가리고 → 말하기! 이 순서!" },
    { id:"m_calc",   subject:"수학", name:"눈높이 연산",subjectEmoji:"🔢", type:"workbook", cogLoad:6, interleaveGroup:"numeric", mnemonicType:"spacing",     difficulty:2, unit:"페이지", tip:"틀린 것만 다시 확인. 망각 곡선 타파!" },
    { id:"m_school", subject:"수학", name:"스쿨수학",   subjectEmoji:"📐", type:"workbook", cogLoad:8, interleaveGroup:"numeric", mnemonicType:"elaboration", difficulty:3, unit:"페이지", tip:"'왜 이 방법?'을 생각하며 풀어요." },
    { id:"m_problem",subject:"수학", name:"문제집 풀기",subjectEmoji:"✏️", type:"workbook", cogLoad:7, interleaveGroup:"numeric", mnemonicType:"spacing",     difficulty:3, unit:"페이지", tip:"식 세우기 전에 잠깐 생각하는 시간!" },
    { id:"m_book",   subject:"수학", name:"수학도둑",   subjectEmoji:"🦸", type:"reading",  cogLoad:2, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:1, unit:"페이지", tip:"재미있게 읽으면 개념이 스며들어요." },
    { id:"s_prob",   subject:"과학", name:"문제집 풀기",subjectEmoji:"🔬", type:"workbook", cogLoad:7, interleaveGroup:"numeric", mnemonicType:"elaboration", difficulty:2, unit:"페이지", tip:"'왜?'를 말로 설명할 수 있어야 진짜!" },
    { id:"ex_jump",  subject:"운동", name:"줄넘기",     subjectEmoji:"🪢", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"심박수 올리기! 운동 후 30분이 골든타임." },
    { id:"ex_hula",  subject:"운동", name:"훌라우프",   subjectEmoji:"⭕", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"균형 잡기도 소뇌 운동이에요!" },
    { id:"ex_run",   subject:"운동", name:"달리기",     subjectEmoji:"🏃", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"달리고 나서 바로 공부 시작!" },
    { id:"ex_bike",  subject:"운동", name:"자전거",     subjectEmoji:"🚴", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"리듬감 있게 페달링 — 세로토닌 UP!" },
  ],
  mom: [
    { id:"grad",    subject:"대학원",  name:"대학원 공부", subjectEmoji:"🎓", type:"study",    cogLoad:9, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:3, unit:"시간",   tip:"읽은 내용을 3줄 요약. 기억 공고화 최고 방법." },
    { id:"ai",      subject:"AI",     name:"AI 공부",     subjectEmoji:"🤖", type:"study",    cogLoad:8, interleaveGroup:"numeric", mnemonicType:"elaboration", difficulty:3, unit:"단원",   tip:"개념 후 바로 '내 예시' 떠올리기." },
    { id:"writing", subject:"작문",   name:"작문 연습",   subjectEmoji:"✍️", type:"writing",  cogLoad:7, interleaveGroup:"creative",mnemonicType:"elaboration", difficulty:2, unit:"시간",   tip:"완벽 말고, 5문장부터. 흘려 써야 아이디어 나와요." },
    { id:"m_read",  subject:"독서",   name:"독서",        subjectEmoji:"📖", type:"reading",  cogLoad:4, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:1, unit:"페이지", tip:"읽고 핵심 주장 한 문장으로 말해보세요." },
    { id:"m_ex",    subject:"운동",   name:"운동",        subjectEmoji:"🏃", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"운동 후 30분이 뇌 학습 황금타임!" },
  ],
  dad: [
    { id:"d_read",  subject:"독서",    name:"독서",       subjectEmoji:"📖", type:"reading",  cogLoad:4, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:1, unit:"페이지", tip:"'내 일에 어떻게 쓸까?'를 생각하며 읽어요." },
    { id:"d_ex",    subject:"운동",    name:"운동",       subjectEmoji:"🏋️", type:"exercise", cogLoad:1, interleaveGroup:"motor",   mnemonicType:"embodied",    difficulty:1, unit:"분",     tip:"강도보다 꾸준함. 신경가소성의 핵심이에요." },
    { id:"d_study", subject:"자기계발", name:"자기계발",  subjectEmoji:"🚀", type:"study",    cogLoad:6, interleaveGroup:"verbal",  mnemonicType:"elaboration", difficulty:2, unit:"시간",   tip:"가족에게 설명해보세요. 프로테제 효과!" },
  ],
};

const FLOWERS = [
  { id:"rose",     name:"장미",      emoji:"🌹", rarity:"common" },
  { id:"sunflower",name:"해바라기",  emoji:"🌻", rarity:"common" },
  { id:"tulip",    name:"튤립",      emoji:"🌷", rarity:"common" },
  { id:"daisy",    name:"데이지",    emoji:"🌼", rarity:"common" },
  { id:"cherry",   name:"벚꽃",      emoji:"🌸", rarity:"rare" },
  { id:"clover",   name:"네잎클로버",emoji:"🍀", rarity:"rare" },
  { id:"star",     name:"별꽃",      emoji:"⭐", rarity:"rare" },
  { id:"rainbow",  name:"무지개꽃",  emoji:"🌈", rarity:"legendary" },
  { id:"crystal",  name:"수정꽃",    emoji:"💎", rarity:"legendary" },
];

const SUBJECT_COLORS = {
  국어: { bg:"#FFF0F5", border:"#FFB3CC", text:"#C0436C", light:"#FFD6E7" },
  영어: { bg:"#EAF4FF", border:"#74B9FF", text:"#2070C0", light:"#BDD9FF" },
  수학: { bg:"#FFF8E7", border:"#FDCB6E", text:"#A07010", light:"#FFE4A0" },
  과학: { bg:"#E0FAF4", border:"#00B894", text:"#007A60", light:"#80DFC8" },
  운동: { bg:"#FFF2EE", border:"#E17055", text:"#C04020", light:"#FFB89A" },
  대학원:{ bg:"#EDE9FF", border:"#A29BFE", text:"#5030A0", light:"#C8C0FF" },
  AI:   { bg:"#EAF4FF", border:"#74B9FF", text:"#2050A0", light:"#BDD9FF" },
  작문: { bg:"#FFF8E7", border:"#FDCB6E", text:"#806010", light:"#FFE4A0" },
  독서: { bg:"#E0FAF4", border:"#00B894", text:"#206030", light:"#80DFC8" },
  자기계발:{ bg:"#EDE9FF", border:"#A29BFE", text:"#6030A0", light:"#C8C0FF" },
};

function getFlower() {
  const r = Math.random();
  const pool = r < 0.04 ? FLOWERS.filter(f=>f.rarity==="legendary")
             : r < 0.22 ? FLOWERS.filter(f=>f.rarity==="rare")
             : FLOWERS.filter(f=>f.rarity==="common");
  return pool[Math.floor(Math.random()*pool.length)];
}
function calcHealth(plantedAt, lastCompleted) {
  const d = lastCompleted ? Math.floor((Date.now()-new Date(lastCompleted).getTime())/86400000)
          : Math.floor((Date.now()-plantedAt)/86400000);
  return Math.max(0, Math.min(100, 100 - d*20));
}

function load(k,fb){ try{return JSON.parse(localStorage.getItem(k))??fb}catch{return fb} }
function save(k,v){ try{localStorage.setItem(k,JSON.stringify(v))}catch{} }
const DEF = { character:null, seeds:[], garden:[], streak:0, totalCompleted:0, lastCompleted:null };

/* ═══════════════════════════════════════════════════════
   REUSABLE UI COMPONENTS
═══════════════════════════════════════════════════════ */

// ─ Primary Button
function BtnPrimary({ children, onClick, disabled, color, style={} }) {
  const bg = disabled ? "#C8C4E0" : (color || DS.color.purple);
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:"100%", padding:"18px 24px", borderRadius:DS.radius.lg,
      background: bg, color:"#fff",
      fontSize: DS.font.button, fontWeight:800, letterSpacing:-0.3,
      boxShadow: disabled ? "none" : DS.shadow.btn,
      border:"none", cursor: disabled?"not-allowed":"pointer",
      transition:"transform 0.12s, box-shadow 0.12s",
      ...style,
    }}
    onMouseDown={e=>{ if(!disabled) e.currentTarget.style.transform="scale(0.97)" }}
    onMouseUp={e=>{ if(!disabled) e.currentTarget.style.transform="scale(1)" }}
    onTouchStart={e=>{ if(!disabled) e.currentTarget.style.transform="scale(0.97)" }}
    onTouchEnd={e=>{ if(!disabled) e.currentTarget.style.transform="scale(1)" }}
    >
      {children}
    </button>
  );
}

// ─ Ghost Button
function BtnGhost({ children, onClick, style={} }) {
  return (
    <button onClick={onClick} style={{
      width:"100%", padding:"15px 24px", borderRadius:DS.radius.lg,
      background:"transparent", color:DS.color.textSub,
      fontSize:DS.font.buttonSm, fontWeight:700,
      border:`2px solid ${DS.color.borderDark}`,
      transition:"all 0.12s", ...style,
    }}>
      {children}
    </button>
  );
}

// ─ Section Label
function SectionLabel({ children, style={} }) {
  return (
    <div style={{ fontSize:DS.font.h3, fontWeight:800, color:DS.color.text,
      marginBottom:12, letterSpacing:-0.3, ...style }}>
      {children}
    </div>
  );
}

// ─ Character Speech Bubble
function Bubble({ char, text, side="right" }) {
  if (!char || !text) return null;
  const isRight = side === "right";
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10,
      flexDirection: isRight ? "row" : "row-reverse",
      animation:"scaleIn 0.3s ease-out" }}>
      <div style={{ flexShrink:0, animation:"float 3s ease-in-out infinite" }}>
        <CharSVG id={char.id} size={72}/>
      </div>
      <div style={{
        background: char.bg,
        border: `2.5px solid ${char.accent}40`,
        borderRadius: isRight ? "20px 20px 20px 6px" : "20px 20px 6px 20px",
        padding:"14px 18px",
        fontSize:DS.font.body, fontWeight:700, color:DS.color.text,
        lineHeight:1.55, maxWidth:230,
        boxShadow:`0 4px 16px ${char.accent}20`,
      }}>
        {text}
      </div>
    </div>
  );
}

// ─ Confetti
function Confetti() {
  const colors = [DS.color.purple,DS.color.yellow,DS.color.pink,DS.color.mint,DS.color.sky,"#FF9FF3","#FFEAA7"];
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden" }}>
      {Array.from({length:26}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute", left:`${4+Math.random()*92}%`, top:-20,
          width: 8+Math.random()*8, height:8+Math.random()*8,
          background:colors[i%colors.length],
          borderRadius:Math.random()>0.4?"50%":"3px",
          animation:`confetti ${1.2+Math.random()*1}s ease-out ${Math.random()*0.6}s forwards`,
        }}/>
      ))}
    </div>
  );
}

// ─ Top Nav Bar
function NavBar({ title, onBack, rightEl }) {
  return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
      marginBottom:DS.space.xl, paddingTop:4 }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width:40, height:40, borderRadius:DS.radius.md,
          background:DS.color.surfaceAlt, border:`1.5px solid ${DS.color.border}`,
          fontSize:18, display:"flex",alignItems:"center",justifyContent:"center",
          color:DS.color.text, cursor:"pointer", flexShrink:0,
        }}>←</button>
      ) : <div style={{width:40}}/>}
      <div style={{ fontSize:DS.font.h3, fontWeight:800, color:DS.color.text }}>{title}</div>
      {rightEl || <div style={{width:40}}/>}
    </div>
  );
}

// ─ Pill Badge
function Pill({ children, color, pale, style={} }) {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background: pale || `${color}20`,
      color: color, borderRadius:DS.radius.full,
      padding:"5px 12px", fontSize:DS.font.small, fontWeight:800,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STUDY SELECTOR
═══════════════════════════════════════════════════════ */
function StudySelector({ items, profileColor, selected, setSelected }) {
  const [amounts, setAmounts] = useState({});
  const subjects = [...new Set(items.map(i=>i.subject))];
  const isSel = id => selected.some(i=>i.id===id);

  function toggle(item) {
    setSelected(prev => isSel(item.id)
      ? prev.filter(i=>i.id!==item.id)
      : [...prev, {...item, amount:amounts[item.id]||""}]
    );
  }
  function setAmt(id,val) {
    setAmounts(p=>({...p,[id]:val}));
    setSelected(p=>p.map(i=>i.id===id?{...i,amount:val}:i));
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:DS.space.lg }}>
      {subjects.map(subj => {
        const sc = SUBJECT_COLORS[subj] || { bg:"#F5F5F5",border:"#E0E0E0",text:"#555",light:"#DDD" };
        return (
          <div key={subj}>
            {/* Subject header */}
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
              <div style={{ width:5,height:22,borderRadius:3,background:sc.border }}/>
              <span style={{ fontSize:DS.font.h3,fontWeight:800,color:sc.text }}>{subj}</span>
            </div>
            {/* Items */}
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {items.filter(i=>i.subject===subj).map(item => {
                const sel = isSel(item.id);
                return (
                  <div key={item.id} style={{
                    background: sel ? sc.bg : DS.color.surface,
                    border:`2px solid ${sel ? sc.border : DS.color.border}`,
                    borderRadius:DS.radius.md, padding:"14px 16px",
                    transition:"all 0.18s", cursor:"pointer",
                  }} onClick={()=>toggle(item)}>
                    <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                      {/* Toggle circle */}
                      <div style={{
                        width:30, height:30, borderRadius:"50%", flexShrink:0,
                        background: sel ? profileColor : DS.color.surfaceAlt,
                        border: `2px solid ${sel ? profileColor : DS.color.borderDark}`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:15, color:"#fff", fontWeight:900,
                        transition:"all 0.18s",
                        animation: sel ? "checkPop 0.3s ease-out" : "none",
                      }}>
                        {sel ? "✓" : ""}
                      </div>
                      {/* Name + emoji */}
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                          <span style={{fontSize:18}}>{item.subjectEmoji}</span>
                          <span style={{ fontSize:DS.font.h3, fontWeight:800, color:DS.color.text }}>
                            {item.name}
                          </span>
                          <span style={{ fontSize:DS.font.xs, background:DS.color.surfaceAlt,
                            color:DS.color.textMuted, borderRadius:6, padding:"2px 7px", fontWeight:700 }}>
                            부하{item.cogLoad}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Amount — 숫자 버튼 선택 (키보드 없이) */}
                    {sel && (
                      <div style={{ marginTop:12, paddingLeft:42, animation:"fadeUp 0.2s ease-out" }}
                        onClick={e=>e.stopPropagation()}>
                        <div style={{ fontSize:DS.font.small, color:DS.color.textSub, fontWeight:700, marginBottom:8 }}>
                          분량&nbsp;
                          <span style={{color:profileColor, fontWeight:900, fontSize:DS.font.body}}>
                            {amounts[item.id]||"—"}
                          </span>
                          <span style={{color:DS.color.textMuted}}> {item.unit}</span>
                        </div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                          {(item.type==="exercise"||item.type==="study"||item.type==="writing"
                              ? [10,15,20,30,45,60]
                              : item.type==="memory"
                              ? [5,10,15,20,30,50]
                              : [1,2,3,4,5,6,8,10]
                          ).map(n => {
                            const active = amounts[item.id]===String(n);
                            return (
                              <button key={n} onClick={()=>setAmt(item.id,String(n))} style={{
                                minWidth:44, height:42, borderRadius:DS.radius.sm,
                                border:`2px solid ${active ? profileColor : sc.border}`,
                                background: active ? profileColor : DS.color.surface,
                                color: active ? "#fff" : DS.color.text,
                                fontSize:DS.font.body, fontWeight:800,
                                cursor:"pointer", transition:"all 0.12s", fontFamily:"inherit",
                              }}>{n}</button>
                            );
                          })}
                          <button onClick={()=>{
                            const v=window.prompt(`${item.name} 분량 직접 입력 (${item.unit})`);
                            if(v&&!isNaN(Number(v))&&Number(v)>0) setAmt(item.id,v);
                          }} style={{
                            minWidth:44, height:42, borderRadius:DS.radius.sm,
                            border:`2px dashed ${sc.border}`,
                            background:DS.color.surfaceAlt, color:DS.color.textMuted,
                            fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"inherit",
                          }}>직접</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   GARDEN FLOWER COMPONENT
═══════════════════════════════════════════════════════ */
function GardenFlower({ flower, health }) {
  const wilting = health < 50, dead = health <= 0;
  const rarityColor = flower.rarity==="legendary"?"#FDCB6E":flower.rarity==="rare"?"#A29BFE":"#00B894";
  const flowerColor = FLOWER_COLORS[flower.id] || "#FD79A8";
  const petalCount  = FLOWER_PETALS[flower.id]  || 6;
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5,
      animation:"bloom 0.5s cubic-bezier(.22,.68,0,1.2)" }}>
      <div style={{ position:"relative",
        animation: (!dead&&!wilting) ? "float 3s ease-in-out infinite" : "none",
        animationDelay:`${Math.random()*2}s` }}>
        <FlowerSVG
          color={flowerColor} petals={petalCount} size={48}
          wilting={wilting} dead={dead}
        />
        {!dead && (
          <div style={{ position:"absolute",top:-3,right:-5,
            width:14,height:14,borderRadius:"50%",
            background:rarityColor,border:"2px solid white",
            fontSize:7,display:"flex",alignItems:"center",justifyContent:"center",
            color:"white",fontWeight:900 }}>
            {flower.rarity==="legendary"?"★":flower.rarity==="rare"?"◆":"●"}
          </div>
        )}
      </div>
      {/* Health bar */}
      <div style={{ width:44,height:5,background:DS.color.border,borderRadius:3,overflow:"hidden" }}>
        <div style={{
          width:`${health}%`, height:"100%", borderRadius:3,
          background: health>70?"#00B894":health>40?"#FDCB6E":"#FF7675",
          transition:"width 0.5s",
        }}/>
      </div>
      <div style={{ fontSize:10,color:DS.color.textMuted,fontWeight:700 }}>{flower.name}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
export default function App() {
  useEffect(()=>{ injectCSS(); },[]);

  const [screen,        setScreen]        = useState("home");
  const [profiles,      setProfiles]      = useState(()=>load("gj4_p",{child1:{...DEF},child2:{...DEF},mom:{...DEF},dad:{...DEF}}));
  const [pid,           setPid]           = useState(null);
  const [condition,     setCondition]     = useState(null);
  const [selected,      setSelected]      = useState([]);
  const [studyList,     setStudyList]     = useState([]);
  const [checked,       setChecked]       = useState({});
  const [rewardFlower,  setRewardFlower]  = useState(null);
  const [showConfetti,  setShowConfetti]  = useState(false);
  const [phrase,        setPhrase]        = useState("");
  const [plantIdx,      setPlantIdx]      = useState(null);

  useEffect(()=>{ save("gj4_p",profiles); },[profiles]);

  const profile   = PROFILES.find(p=>p.id===pid);
  const pData     = pid ? profiles[pid] : null;
  const character = pData?.character ? CHARS.find(c=>c.id===pData.character) : null;
  const getItems  = id => id==="mom"?STUDY_ITEMS.mom:id==="dad"?STUDY_ITEMS.dad:STUDY_ITEMS.child;

  const doneCount = studyList.filter(i=>checked[i.id]).length;
  const allDone   = studyList.length>0 && doneCount===studyList.length;
  const totalMin  = studyList.reduce((s,i)=>s+(i.focusMin||0),0);

  function pickPhrase(type) {
    if (!character) return "";
    const arr = character.phrases[type];
    return arr[Math.floor(Math.random()*arr.length)];
  }

  function goStudy() {
    if (!condition||!selected.length) return;
    const rec = recommendV3(selected, condition);
    setStudyList(rec); setChecked({});
    setPhrase(pickPhrase("study"));
    setScreen("study");
  }

  function handleCheck(id) {
    // 순서 강제: 이전 항목이 모두 완료된 경우에만 현재 항목 체크 가능
    const idx = studyList.findIndex(i => i.id === id);
    const allPrevDone = studyList.slice(0, idx).every(i => checked[i.id]);
    if (!allPrevDone) {
      setPhrase("앞 공부를 먼저 완료해야 해요! 순서대로 해봐요 💪");
      return;
    }
    const was = checked[id];
    setChecked(p=>({...p,[id]:!was}));
    if (!was) setPhrase(pickPhrase("check"));
  }

  function handleComplete() {
    const flower = getFlower();
    setRewardFlower(flower);
    setShowConfetti(true);
    setTimeout(()=>setShowConfetti(false),2800);
    setPhrase(pickPhrase("done"));
    setProfiles(prev=>{
      const p={...prev[pid]};
      p.seeds=[...(p.seeds||[]),flower];
      p.totalCompleted=(p.totalCompleted||0)+1;
      const today=new Date().toDateString();
      const yest=new Date(Date.now()-86400000).toDateString();
      p.streak=p.lastCompleted===yest?(p.streak||0)+1:1;
      p.lastCompleted=today;
      return {...prev,[pid]:p};
    });
    setScreen("reward");
  }

  function plantSeed(idx) {
    setProfiles(prev=>{
      const p={...prev[pid]};
      const seed=p.seeds[idx];
      p.seeds=p.seeds.filter((_,i)=>i!==idx);
      p.garden=[...(p.garden||[]),{...seed,plantedAt:Date.now()}];
      return {...prev,[pid]:p};
    });
    setPlantIdx(null);
    setPhrase(pickPhrase("reward"));
  }

  const c = DS.color;
  const seeds  = pData?.seeds  || [];
  const garden = pData?.garden || [];

  /* ════════════════════════════════════════
     SCREEN: HOME
  ════════════════════════════════════════ */
  if (screen === "home") {
    const condObj = CONDITIONS.find(c=>c.id===condition);
    return (
      <div style={{ minHeight:"100vh", background:c.bg, fontFamily:"'Nunito Sans','Apple SD Gothic Neo',sans-serif" }}>
        <div style={{ maxWidth:480, margin:"0 auto", padding:"0 0 80px" }}>

          {/* ── Header Bar ── */}
          <div style={{
            padding:"20px 22px 16px",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <div style={{ fontSize:DS.font.display, fontWeight:900, color:c.purple,
                letterSpacing:-1.5, lineHeight:1.1, fontFamily:"'Nunito',sans-serif" }}>
                공부집사
              </div>
              <div style={{ fontSize:DS.font.small, fontWeight:600, color:c.purpleLight,
                letterSpacing:2, marginTop:2 }}>
                MIND FIT STUDY COACH
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button style={S.iconBtn} onClick={()=>setScreen("garden")}>🌷</button>
              <button style={S.iconBtn} onClick={()=>setScreen("family")}>👨‍👩‍👧‍👦</button>
            </div>
          </div>

          {/* ── Hero Banner (no profile) ── */}
          {!pid && (
            <div style={{
              margin:"0 16px 20px",
              background:`linear-gradient(135deg, ${c.purple} 0%, ${c.purpleLight} 100%)`,
              borderRadius:DS.radius.xl, padding:"28px 24px",
              boxShadow:DS.shadow.float, position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", right:-10, top:-10, fontSize:80, opacity:0.18, transform:"rotate(15deg)" }}>🧠</div>
              <div style={{ fontSize:DS.font.h2, fontWeight:900, color:"#fff", lineHeight:1.3, marginBottom:8 }}>
                오늘의 공부를<br/>뇌과학으로 설계해줄게!
              </div>
              <div style={{ fontSize:DS.font.body, color:"rgba(255,255,255,0.85)", fontWeight:600 }}>
                누가 공부할지 선택해봐요 👇
              </div>
            </div>
          )}

          {/* ── Profile Grid ── */}
          <div style={{ padding:"0 16px", marginBottom:DS.space.xl }}>
            <SectionLabel>누가 공부할까요?</SectionLabel>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {PROFILES.map((p,i) => {
                const pd = profiles[p.id], sel = pid===p.id;
                return (
                  <button key={p.id} className={`fadeUp d${i+1}`}
                    onClick={()=>{ setPid(p.id); setCondition(null); setSelected([]); setPhrase(""); }}
                    style={{
                      background: sel ? p.main : p.pale,
                      border:`3px solid ${sel ? p.main : "transparent"}`,
                      borderRadius:DS.radius.lg, padding:"18px 14px",
                      display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                      cursor:"pointer", transition:"all 0.2s",
                      transform: sel ? "scale(1.04)" : "scale(1)",
                      boxShadow: sel ? `0 6px 20px ${p.main}50` : "none",
                    }}>
                    <span style={{ fontSize:36 }}>{p.emoji}</span>
                    <span style={{ fontSize:DS.font.h3, fontWeight:900,
                      color: sel ? "#fff" : c.text }}>
                      {p.name}
                    </span>
                    <div style={{ display:"flex", gap:6 }}>
                      <Pill color={sel?"#fff":p.main} pale={sel?"rgba(255,255,255,0.25)":p.pale}
                        style={{ fontSize:11 }}>
                        🌱 {(pd?.seeds||[]).length}
                      </Pill>
                      <Pill color={sel?"#fff":p.main} pale={sel?"rgba(255,255,255,0.25)":p.pale}
                        style={{ fontSize:11 }}>
                        🌷 {(pd?.garden||[]).length}
                      </Pill>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Character Select ── */}
          {pid && !pData?.character && (
            <div style={{ padding:"0 16px", marginBottom:DS.space.xl }} className="fadeUp">
              <SectionLabel>집사 캐릭터를 골라요!</SectionLabel>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {CHARS.map((ch,i) => (
                  <button key={ch.id} className={`fadeUp d${i+1}`}
                    onClick={()=>{
                      setProfiles(prev=>({...prev,[pid]:{...prev[pid],character:ch.id}}));
                      setPhrase(ch.phrases.greet[0]);
                    }}
                    style={{
                      background:ch.bg, border:`2.5px solid ${ch.accent}40`,
                      borderRadius:DS.radius.lg, padding:"20px 14px",
                      display:"flex",flexDirection:"column",alignItems:"center",gap:10,
                      cursor:"pointer", transition:"all 0.2s",
                    }}>
                    <div style={{ animation:`float ${2.4+i*0.4}s ease-in-out infinite` }}>
                      <CharSVG id={ch.id} size={90}/>
                    </div>
                    <div style={{ fontSize:DS.font.h3, fontWeight:800, color:c.text }}>{ch.name} 집사</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {pid && pData?.character && (
            <>
              {/* ── Bubble ── */}
              <div style={{ padding:"0 16px", marginBottom:DS.space.xl }} className="fadeUp">
                <Bubble char={character}
                  text={phrase || character.phrases.greet[Math.floor(Math.random()*character.phrases.greet.length)]}/>
              </div>

              {/* ── Condition ── */}
              <div style={{ padding:"0 16px", marginBottom:DS.space.xl }}>
                <SectionLabel>오늘 기분이 어때요? 😊</SectionLabel>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {CONDITIONS.map((cond,i) => {
                    const sel = condition===cond.id;
                    return (
                      <button key={cond.id} className={`fadeUp d${i%4+1}`}
                        onClick={()=>setCondition(cond.id)}
                        style={{
                          background: sel ? cond.color : cond.pale,
                          border:`2.5px solid ${sel ? cond.color : "transparent"}`,
                          borderRadius:DS.radius.md, padding:"14px 10px",
                          display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                          cursor:"pointer", transition:"all 0.18s",
                          transform: sel?"scale(1.04)":"scale(1)",
                          boxShadow: sel?`0 4px 14px ${cond.color}50`:"none",
                        }}>
                        <span style={{ fontSize:26 }}>{cond.emoji}</span>
                        <span style={{ fontSize:DS.font.body, fontWeight:800,
                          color: sel ? "#fff" : c.text }}>
                          {cond.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Condition explanation */}
                {condObj && (
                  <div className="fadeUp" style={{
                    marginTop:12, background:condObj.pale,
                    border:`1.5px solid ${condObj.color}40`,
                    borderRadius:DS.radius.md, padding:"12px 16px",
                    display:"flex",alignItems:"center",gap:10,
                  }}>
                    <span style={{fontSize:22}}>{condObj.emoji}</span>
                    <div>
                      <div style={{fontSize:DS.font.small,fontWeight:800,color:condObj.color}}>
                        🧠 {CONDITION_PROFILE[condObj.id]?.desc}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Study Select ── */}
              {condition && (
                <div style={{ padding:"0 16px", marginBottom:DS.space.xl }} className="fadeUp">
                  <SectionLabel>오늘 할 공부를 골라요!</SectionLabel>
                  <StudySelector
                    items={getItems(pid)} profileColor={profile.main}
                    selected={selected} setSelected={setSelected}
                  />
                </div>
              )}

              {/* ── Start Button ── */}
              {condition && (
                <div style={{ padding:"0 16px" }} className="fadeUp">
                  <BtnPrimary onClick={goStudy} disabled={selected.length===0} color={profile.main}>
                    🧠 뇌과학 맞춤 순서로 시작!
                  </BtnPrimary>
                  <button onClick={()=>setProfiles(prev=>({...prev,[pid]:{...prev[pid],character:null}}))}
                    style={{ display:"block",textAlign:"center",width:"100%",padding:"12px",
                      background:"none",border:"none",color:c.textMuted,fontSize:DS.font.small,
                      fontWeight:600,cursor:"pointer",marginTop:8 }}>
                    집사 바꾸기
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════
     SCREEN: STUDY
  ════════════════════════════════════════ */
  if (screen === "study") {
    const condObj = CONDITIONS.find(c=>c.id===condition);
    const condPro = CONDITION_PROFILE[condition];
    return (
      <div style={{ minHeight:"100vh", background:c.bg }}>
        <div style={{ maxWidth:480, margin:"0 auto", padding:"20px 16px 80px" }}>

          <NavBar title={`${profile.name}의 공부 리스트`} onBack={()=>setScreen("home")}/>

          {/* Character bubble */}
          <div style={{ marginBottom:DS.space.xl }} className="fadeUp">
            <Bubble char={character} text={phrase}/>
          </div>

          {/* Condition + progress card */}
          <div className="fadeUp d1" style={{
            background:DS.color.surface, borderRadius:DS.radius.lg,
            padding:"16px 18px", marginBottom:DS.space.lg,
            boxShadow:DS.shadow.card, border:`1.5px solid ${DS.color.border}`,
          }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
              <Pill color={condObj.color} pale={condObj.pale}>
                {condObj.emoji} {condObj.label}
              </Pill>
              <span style={{ fontSize:DS.font.body, fontWeight:800, color:c.text }}>
                {doneCount} / {studyList.length}
              </span>
            </div>
            {/* Progress bar */}
            <div style={{ background:c.border, borderRadius:99, height:12, overflow:"hidden" }}>
              <div style={{
                width:`${(doneCount/studyList.length)*100}%`,
                height:"100%", borderRadius:99,
                background:`linear-gradient(90deg, ${profile.main}, ${c.purple})`,
                transition:"width 0.5s cubic-bezier(.22,.68,0,1.2)",
              }}/>
            </div>
            <div style={{ fontSize:DS.font.small, color:c.textMuted, marginTop:6, fontWeight:600 }}>
              예상 총 {totalMin}분 · {condPro.desc}
            </div>
          </div>

          {/* Study cards */}
          {studyList.map((item,idx) => {
            const sc = SUBJECT_COLORS[item.subject] || {bg:"#F5F5F5",border:"#DDD",text:"#555",light:"#EEE"};
            const done = checked[item.id];
            const cogColor = item.cogLoad>=7?"#FF7675":item.cogLoad>=5?"#FDCB6E":"#00B894";
            return (
              <div key={item.id} className={`fadeUp d${Math.min(idx+1,6)}`} style={{
                background: done ? DS.color.surfaceAlt : DS.color.surface,
                borderRadius:DS.radius.lg,
                border:`2px solid ${done ? DS.color.border : sc.border}`,
                padding:"16px 18px", marginBottom:12,
                opacity: done ? 0.6 : 1,
                transition:"all 0.25s",
                boxShadow: done ? "none" : DS.shadow.card,
              }}>
                <div style={{ display:"flex",alignItems:"flex-start",gap:14 }}>
                  {/* Number badge */}
                  <div style={{
                    width:36, height:36, borderRadius:"50%", flexShrink:0,
                    background: done ? c.border : sc.border,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:DS.font.body, fontWeight:900, color: done?"#fff":sc.text,
                    marginTop:2, transition:"all 0.2s",
                  }}>{idx+1}</div>

                  <div style={{ flex:1, minWidth:0 }}>
                    {/* Title row */}
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap" }}>
                      <span style={{
                        background:sc.bg, color:sc.text,
                        borderRadius:8, padding:"3px 10px",
                        fontSize:DS.font.small, fontWeight:800,
                      }}>{item.subjectEmoji} {item.subject}</span>
                      <span style={{
                        fontSize:DS.font.h3, fontWeight:900, color:c.text,
                        textDecoration: done ? "line-through" : "none",
                      }}>{item.name}</span>
                      {item.amount && (
                        <Pill color={c.textSub} pale={c.surfaceAlt} style={{fontSize:11}}>
                          {item.amount}{item.unit}
                        </Pill>
                      )}
                    </div>

                    {/* Reason */}
                    {!done && (
                      <>
                        <div style={{ fontSize:DS.font.body, color:c.purple, fontWeight:700,
                          marginBottom:5, lineHeight:1.5 }}>
                          💡 {item.reason}
                        </div>
                        <div style={{ fontSize:DS.font.small, color:c.textSub, fontStyle:"italic",
                          marginBottom:6, lineHeight:1.5 }}>
                          ✏️ {item.tip}
                        </div>
                        {/* Badges */}
                        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                          <span style={{ fontSize:10, background:`${cogColor}20`, color:cogColor,
                            borderRadius:6, padding:"2px 8px", fontWeight:800 }}>
                            🧠 인지부하 {item.cogLoad}/10
                          </span>
                          <span style={{ fontSize:10, background:c.purplePale, color:c.purpleLight,
                            borderRadius:6, padding:"2px 8px", fontWeight:700 }}>
                            ⏱️ ~{item.focusMin}분
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Check button — 순서 잠금 시각화 */}
                  {(() => {
                    const allPrevDone = studyList.slice(0,idx).every(i=>checked[i.id]);
                    const locked = !done && !allPrevDone;
                    return (
                      <button onClick={()=>handleCheck(item.id)} style={{
                        width:44, height:44, borderRadius:"50%", flexShrink:0,
                        background: done ? profile.main : locked ? c.surfaceAlt : c.surfaceAlt,
                        border: `2.5px solid ${done ? profile.main : locked ? c.border : c.borderDark}`,
                        color: done ? "#fff" : locked ? c.border : c.textMuted,
                        fontSize: locked ? 16 : 20,
                        fontWeight:900, cursor: locked ? "not-allowed" : "pointer",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"all 0.2s",
                        animation: done ? "checkPop 0.3s ease-out" : "none",
                        boxShadow: done ? `0 4px 12px ${profile.main}50` : "none",
                        opacity: locked ? 0.4 : 1,
                      }}>
                        {done ? "✓" : locked ? "🔒" : ""}
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}

          {/* Complete button */}
          {allDone && (
            <div className="scaleIn" style={{ marginTop:8 }}>
              <BtnPrimary onClick={handleComplete} color={profile.main}>
                🎉 오늘 공부 모두 완료!
              </BtnPrimary>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════
     SCREEN: REWARD
  ════════════════════════════════════════ */
  if (screen === "reward") return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${c.purple} 0%,${c.purpleLight} 100%)` }}>
      {showConfetti && <Confetti/>}
      <div style={{ maxWidth:480, margin:"0 auto", padding:"40px 20px 60px", textAlign:"center" }}>

        {/* Trophy */}
        <div className="scaleIn" style={{ display:"flex", justifyContent:"center", marginBottom:16,
          animation:"heartbeat 1.2s ease-in-out 3" }}>
          <svg width="90" height="90" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <rect x="28" y="66" width="24" height="6" rx="3" fill="#E8A030"/>
            <rect x="24" y="70" width="32" height="5" rx="2.5" fill="#FDCB6E"/>
            <rect x="36" y="58" width="8" height="12" rx="2" fill="#FDCB6E"/>
            <path d="M18 20 Q16 48 40 54 Q64 48 62 20 Z" fill="#FDCB6E"/>
            <path d="M22 20 Q20 46 40 51 Q60 46 58 20 Z" fill="#FFE088"/>
            <path d="M18 22 Q8 28 10 38 Q12 46 20 44" fill="none" stroke="#FDCB6E" strokeWidth="5" strokeLinecap="round"/>
            <path d="M62 22 Q72 28 70 38 Q68 46 60 44" fill="none" stroke="#FDCB6E" strokeWidth="5" strokeLinecap="round"/>
            <polygon points="40,26 42.5,33 50,33 44,37.5 46.5,44.5 40,40 33.5,44.5 36,37.5 30,33 37.5,33" fill="#E8A030"/>
            <ellipse cx="28" cy="28" rx="4" ry="7" fill="white" opacity="0.22" transform="rotate(-20 28 28)"/>
          </svg>
        </div>

        <div style={{ fontSize:DS.font.h1, fontWeight:900, color:"#fff",
          marginBottom:8, letterSpacing:-0.5 }}>
          오늘 공부 완료!
        </div>
        <div style={{ fontSize:DS.font.h3, color:"rgba(255,255,255,0.85)", marginBottom:32, fontWeight:600 }}>
          {profile.name}이(가) 정말 대단해요 🎊
        </div>

        {/* Bubble */}
        <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}>
          <Bubble char={character} text={phrase} side="left"/>
        </div>

        {/* Seed reward card */}
        {rewardFlower && (
          <div className="scaleIn" style={{
            background:"rgba(255,255,255,0.15)", backdropFilter:"blur(10px)",
            borderRadius:DS.radius.xl, padding:"28px 24px", marginBottom:28,
            border:"2px solid rgba(255,255,255,0.3)",
          }}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:12,
              animation:"bloom 0.7s cubic-bezier(.22,.68,0,1.2)" }}>
              <FlowerSVG
                color={FLOWER_COLORS[rewardFlower.id]||"#FD79A8"}
                petals={FLOWER_PETALS[rewardFlower.id]||6}
                size={80}
              />
            </div>
            <div style={{ fontSize:DS.font.h2, fontWeight:900, color:"#fff", marginBottom:8 }}>
              {rewardFlower.name} 씨앗 획득!
            </div>
            <div style={{
              display:"inline-block", borderRadius:DS.radius.full,
              padding:"6px 18px", fontSize:DS.font.body, fontWeight:800,
              background: rewardFlower.rarity==="legendary"?"#FDCB6E"
                        : rewardFlower.rarity==="rare"?"#A29BFE":"#00B894",
              color:"#fff",
            }}>
              {rewardFlower.rarity==="legendary"?"✨ 전설급!"
               :rewardFlower.rarity==="rare"?"💜 희귀":"🌿 일반"}
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:32 }}>
          {[
            {n:(pData?.seeds||[]).length, l:"씨앗", e:"🌱"},
            {n:pData?.streak||0,          l:"연속일", e:"🔥"},
            {n:pData?.totalCompleted||0,  l:"총 완료", e:"🏆"},
          ].map((s,i)=>(
            <div key={i} style={{
              background:"rgba(255,255,255,0.15)", borderRadius:DS.radius.md,
              padding:"14px 8px", backdropFilter:"blur(6px)",
              border:"1.5px solid rgba(255,255,255,0.25)",
            }}>
              <div style={{fontSize:26}}>{s.e}</div>
              <div style={{fontSize:DS.font.h2,fontWeight:900,color:"#fff"}}>{s.n}</div>
              <div style={{fontSize:DS.font.small,color:"rgba(255,255,255,0.75)",fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>

        <button onClick={()=>setScreen("garden")} style={{
          width:"100%", padding:"18px", borderRadius:DS.radius.lg,
          background:"#fff", color:c.purple,
          fontSize:DS.font.button, fontWeight:900,
          border:"none", cursor:"pointer", marginBottom:12,
          boxShadow:"0 6px 20px rgba(0,0,0,0.15)",
        }}>
          🌷 정원에 씨앗 심기
        </button>
        <BtnGhost onClick={()=>{ setScreen("home");setStudyList([]);setChecked({});setRewardFlower(null); }}
          style={{ borderColor:"rgba(255,255,255,0.4)", color:"rgba(255,255,255,0.85)" }}>
          🏠 홈으로 돌아가기
        </BtnGhost>
      </div>
    </div>
  );

  /* ════════════════════════════════════════
     SCREEN: GARDEN
  ════════════════════════════════════════ */
  if (screen === "garden") {
    const daysSince = pData?.lastCompleted
      ? Math.floor((Date.now()-new Date(pData.lastCompleted).getTime())/86400000) : 999;
    return (
      <div style={{ minHeight:"100vh", background:c.bg }}>
        <div style={{ maxWidth:480, margin:"0 auto", padding:"20px 16px 80px" }}>
          <NavBar title={`${profile?.name||"나"}의 텃밭 🌷`} onBack={()=>setScreen("home")}/>

          {/* Character bubble */}
          {character && (
            <div style={{ marginBottom:DS.space.xl }} className="fadeUp">
              <Bubble char={character} text={
                phrase || (seeds.length>0 ? `씨앗 ${seeds.length}개! 심어볼까? 🌱`
                : garden.length>0 ? "꾸준히 공부해야 꽃이 건강해! 💪"
                : "공부 완료하면 씨앗을 받을 수 있어!")
              }/>
            </div>
          )}

          {/* Stats row */}
          <div className="fadeUp d1" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:DS.space.xl }}>
            {[
              {n:seeds.length,  l:"씨앗",  e:"🌱", color:c.mint},
              {n:garden.length, l:"꽃",    e:"🌷", color:c.pink},
              {n:pData?.streak||0,l:"연속일",e:"🔥",color:c.orange},
            ].map((s,i)=>(
              <div key={i} style={{
                background:DS.color.surface, borderRadius:DS.radius.lg,
                padding:"16px 8px", textAlign:"center",
                boxShadow:DS.shadow.card, border:`1.5px solid ${DS.color.border}`,
              }}>
                <div style={{fontSize:28}}>{s.e}</div>
                <div style={{fontSize:DS.font.h1,fontWeight:900,color:DS.color.text}}>{s.n}</div>
                <div style={{fontSize:DS.font.small,color:DS.color.textMuted,fontWeight:700}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Wilt warning */}
          {daysSince >= 1 && garden.length > 0 && (
            <div className="fadeUp" style={{
              background:"#FFF2EE", border:`2px solid ${c.coral}`,
              borderRadius:DS.radius.md, padding:"12px 16px", marginBottom:DS.space.lg,
              display:"flex",alignItems:"center",gap:10,
            }}>
              <span style={{fontSize:24}}>⚠️</span>
              <div>
                <div style={{fontSize:DS.font.body,fontWeight:800,color:c.coral}}>
                  {daysSince}일 쉬었어요!
                </div>
                <div style={{fontSize:DS.font.small,color:"#C04020",fontWeight:600}}>
                  꽃이 {Math.min(100,daysSince*20)}% 시들고 있어요. 빨리 공부해요!
                </div>
              </div>
            </div>
          )}

          {/* Seed inventory */}
          {seeds.length > 0 && (
            <div className="fadeUp d2" style={{
              background:DS.color.surface, borderRadius:DS.radius.lg,
              padding:"18px 16px", marginBottom:DS.space.xl,
              boxShadow:DS.shadow.card, border:`1.5px solid ${DS.color.border}`,
            }}>
              <SectionLabel style={{marginBottom:14}}>씨앗 보관함 ({seeds.length}개) 🌱</SectionLabel>
              <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
                {seeds.map((seed,i)=>(
                  <button key={i} onClick={()=>setPlantIdx(i)} style={{
                    background:c.surfaceAlt, border:`2px dashed ${c.border}`,
                    borderRadius:DS.radius.md, padding:"12px 14px",
                    cursor:"pointer", display:"flex",flexDirection:"column",
                    alignItems:"center",gap:5, transition:"all 0.15s",
                    fontFamily:"inherit",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=c.purple; e.currentTarget.style.background=c.purplePale;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border; e.currentTarget.style.background=c.surfaceAlt;}}>
                    <FlowerSVG
                      color={FLOWER_COLORS[seed.id]||"#FD79A8"}
                      petals={FLOWER_PETALS[seed.id]||6}
                      size={44}/>
                    <span style={{fontSize:DS.font.small,fontWeight:700,color:c.textSub}}>심기</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Planting modal */}
          {plantIdx !== null && seeds[plantIdx] && (
            <div style={{
              position:"fixed",inset:0,background:"rgba(44,34,100,0.5)",
              display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,
              padding:"0 20px",
            }}>
              <div className="scaleIn" style={{
                background:DS.color.surface, borderRadius:DS.radius.xl,
                padding:"32px 24px", textAlign:"center", width:"100%",maxWidth:360,
                boxShadow:DS.shadow.float,
              }}>
                <div style={{display:"flex",justifyContent:"center",animation:"bloom 0.6s ease-out",marginBottom:12}}>
                  <FlowerSVG
                    color={FLOWER_COLORS[seeds[plantIdx].id]||"#FD79A8"}
                    petals={FLOWER_PETALS[seeds[plantIdx].id]||6}
                    size={80}/>
                </div>
                <div style={{fontSize:DS.font.h2,fontWeight:900,color:c.text,marginBottom:8}}>
                  {seeds[plantIdx].name}을 심을까요?
                </div>
                <div style={{fontSize:DS.font.body,color:c.textSub,marginBottom:24,lineHeight:1.6,fontWeight:600}}>
                  매일 공부하면 건강하게 자라요! 🌱<br/>
                  공부를 안 하면 하루 20%씩 시들어요.
                </div>
                <BtnPrimary onClick={()=>plantSeed(plantIdx)} color={profile?.main||c.purple}
                  style={{marginBottom:10}}>
                  🌱 텃밭에 심기
                </BtnPrimary>
                <BtnGhost onClick={()=>setPlantIdx(null)}>나중에</BtnGhost>
              </div>
            </div>
          )}

          {/* Garden visualization */}
          <div className="fadeUp d3" style={{
            background:DS.color.surface, borderRadius:DS.radius.xl,
            overflow:"hidden", boxShadow:DS.shadow.card,
            border:`1.5px solid ${DS.color.border}`,
          }}>
            {/* 하늘 + 잔디 영역 */}
            <div style={{
              background:"linear-gradient(180deg,#C8E8F8 0%,#A0D8C0 55%,#78B890 55%)",
              padding:"14px 12px 0", minHeight:garden.length>0?120:180, position:"relative",
            }}>
              <div style={{position:"absolute",top:10,left:16,fontSize:18,opacity:0.6}}>☀️</div>
              <div style={{position:"absolute",top:12,left:50,fontSize:13,opacity:0.4}}>☁️</div>
              <div style={{position:"absolute",top:12,right:24,fontSize:11,opacity:0.35}}>☁️</div>

              {garden.length === 0 ? (
                <div style={{
                  display:"flex",flexDirection:"column",alignItems:"center",
                  justifyContent:"center",height:150,
                  color:"rgba(255,255,255,0.7)",fontWeight:800,gap:10,textAlign:"center",
                }}>
                  <span style={{fontSize:44}}>🌱</span>
                  <div>
                    <div style={{fontSize:DS.font.h3}}>아직 비어있어요</div>
                    <div style={{fontSize:DS.font.small,opacity:0.8,marginTop:4}}>씨앗을 심어보세요!</div>
                  </div>
                </div>
              ) : (
                /* 꽃 그리드 — 잔디/하늘 영역 안에서 아랫쪽에 붙음 */
                <div style={{
                  display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0 8px",
                  alignItems:"flex-end",
                }}>
                  {garden.map((flower,i)=>(
                    <GardenFlower key={i} flower={flower}
                      health={calcHealth(flower.plantedAt,pData?.lastCompleted)}/>
                  ))}
                </div>
              )}
            </div>

            {/* 흙 영역 — 꽃 뿌리가 묻히는 곳 */}
            <div style={{
              background:"linear-gradient(180deg,#6B4423 0%,#5A3618 100%)",
              padding:"6px 12px 10px",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <span style={{fontSize:11,color:"#C8A870",fontWeight:700,opacity:0.8}}>
                🌿 우리 가족 텃밭
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════
     SCREEN: FAMILY
  ════════════════════════════════════════ */
  if (screen === "family") return (
    <div style={{ minHeight:"100vh", background:c.bg }}>
      <div style={{ maxWidth:480, margin:"0 auto", padding:"20px 16px 80px" }}>
        <NavBar title="우리 가족 현황 👨‍👩‍👧‍👦" onBack={()=>setScreen("home")}/>
        {PROFILES.map((p,i) => {
          const pd=profiles[p.id];
          const ch=pd?.character?CHARS.find(cc=>cc.id===pd.character):null;
          const ds=pd?.lastCompleted?Math.floor((Date.now()-new Date(pd.lastCompleted).getTime())/86400000):999;
          return (
            <div key={p.id} className={`fadeUp d${i+1}`} style={{
              background:DS.color.surface, borderRadius:DS.radius.xl,
              padding:"20px 18px", marginBottom:DS.space.md,
              boxShadow:DS.shadow.card, border:`2.5px solid ${p.pale}`,
            }}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                <div style={{
                  width:54,height:54,borderRadius:DS.radius.md,
                  background:p.pale,border:`2px solid ${p.main}40`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  overflow:"hidden",
                }}>
                  <span style={{fontSize:26}}>{p.emoji}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:DS.font.h3,fontWeight:900,color:c.text,display:"flex",alignItems:"center",gap:8}}>
                    {p.name}
                    {ch && <CharSVG id={ch.id} size={28}/>}
                  </div>
                  <div style={{fontSize:DS.font.small,color:c.textMuted,fontWeight:600}}>
                    집사: {ch?ch.name:"미선택"}
                  </div>
                </div>
                {ds>=2&&(pd?.garden||[]).length>0&&(
                  <Pill color={c.coral} pale="#FFF0F0" style={{fontSize:10}}>
                    ⚠️ {ds}일 쉬었음
                  </Pill>
                )}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                {[
                  {n:(pd?.seeds||[]).length,l:"씨앗",e:"🌱"},
                  {n:(pd?.garden||[]).length,l:"꽃",e:"🌷"},
                  {n:pd?.totalCompleted||0,l:"완료",e:"🏆"},
                  {n:pd?.streak||0,l:"연속",e:"🔥"},
                ].map((s,j)=>(
                  <div key={j} style={{
                    background:p.pale, borderRadius:DS.radius.sm,
                    padding:"10px 4px", textAlign:"center",
                  }}>
                    <div style={{fontSize:20}}>{s.e}</div>
                    <div style={{fontSize:DS.font.h3,fontWeight:900,color:c.text}}>{s.n}</div>
                    <div style={{fontSize:10,color:c.textMuted,fontWeight:700}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return null;
}

/* Shared micro-styles */
const S = {
  iconBtn: {
    width:40, height:40, borderRadius:DS.radius.md,
    background:DS.color.surface, border:`1.5px solid ${DS.color.border}`,
    fontSize:18, cursor:"pointer", display:"flex",
    alignItems:"center", justifyContent:"center",
    boxShadow:"0 2px 8px rgba(108,92,231,0.08)",
  },
};
