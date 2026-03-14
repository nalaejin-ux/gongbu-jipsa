import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   1. DESIGN SYSTEM & GLOBAL CSS
═══════════════════════════════════════════════════════ */
const DS = {
  color: {
    purple: "#6C5CE7", purpleLight: "#A29BFE", purplePale: "#EDE9FF", purpleDark: "#4834D4",
    yellow: "#FDCB6E", yellowPale: "#FFF8E7", pink: "#FD79A8", pinkPale: "#FFF0F5",
    mint: "#00B894", mintPale: "#E0FAF4", sky: "#74B9FF", skyPale: "#EAF4FF",
    coral: "#FF7675", coralPale: "#FFF0F0", orange: "#E17055", orangePale: "#FFF2EE",
    bg: "#F8F7FF", surface: "#FFFFFF", surfaceAlt: "#F3F2FA", border: "#E8E6F8",
    text: "#2D3436", textSub: "#636E72", textMuted: "#A0A0B8", white: "#FFFFFF",
  },
  font: {
    display: "clamp(28px, 7vw, 36px)", h1: "clamp(22px, 5.5vw, 28px)",
    h2: "clamp(18px, 4.5vw, 22px)", h3: "clamp(16px, 4vw, 19px)",
    body: "clamp(14px, 3.5vw, 16px)", small: "clamp(12px, 3vw, 14px)",
  },
  radius: { sm: 10, md: 16, lg: 22, xl: 28, full: 999 },
  shadow: { card: "0 4px 20px rgba(108,92,231,0.10), 0 1px 4px rgba(0,0,0,0.04)" }
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Nunito+Sans:wght@600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F8F7FF; font-family: 'Nunito Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  .fadeUp { animation: fadeUp 0.4s cubic-bezier(.22,.68,0,1.2) both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

function injectCSS() {
  if (document.getElementById("gj4-css")) return;
  const s = document.createElement("style");
  s.id = "gj4-css";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════════
   2. BRAIN SCIENCE ENGINE & COMPONENTS
═══════════════════════════════════════════════════════ */
// ... (기본 제공된 CONDITION_PROFILE, calcScore, recommendV3 등 로직은 동일하게 유지됨)

/* ═══════════════════════════════════════════════════════
   3. MAIN APP COMPONENT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [condition, setCondition] = useState(null);
  const [step, setStep] = useState("profile"); // profile -> condition -> main
  const [data, setData] = useState({});

  useEffect(() => {
    injectCSS();
    // 로컬 스토리지에서 데이터 불러오기 (배포 시 초기화 방지)
    const saved = localStorage.getItem("gongbu-jipsa-v4");
    if (saved) setData(JSON.parse(saved));
  }, []);

  // 프로필 선택 화면 UI
  const renderProfileSelection = () => (
    <div className="fadeUp" style={{ padding: 20, textAlign: 'center' }}>
      <h1 style={{ fontSize: DS.font.h1, marginBottom: 30, color: DS.color.purple }}>누가 공부하러 왔나요?</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
        {/* PROFILES 데이터를 맵핑하여 버튼 생성 */}
        {['나은이', '지윤이', '엄마', '아빠'].map((name, i) => (
          <button key={i} onClick={() => { setUser(name); setStep("condition"); }}
            style={{ padding: 20, borderRadius: DS.radius.md, background: DS.color.white, border: `2px solid ${DS.color.purplePale}`, fontSize: DS.font.h3 }}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );

  // 메인 렌더링 로직
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: DS.color.bg }}>
      {step === "profile" && renderProfileSelection()}
      {step === "condition" && (
        <div className="fadeUp" style={{ padding: 20 }}>
          <h2 style={{ fontSize: DS.font.h2, marginBottom: 20 }}>현재 컨디션은 어떤가요?</h2>
          {/* 컨디션 선택 버튼들... */}
          <button onClick={() => setStep("profile")} style={{ marginTop: 20, color: DS.color.textMuted }}>뒤로가기</button>
        </div>
      )}
      {/* 메인 공부 대시보드는 여기에 추가 */}
    </div>
  );
}
