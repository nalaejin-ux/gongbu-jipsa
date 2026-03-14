import { useState, useEffect } from "react";

// [1. 디자인 시스템 - 기존 사양 그대로]
const DS = {
  color: {
    purple: "#6C5CE7", purpleLight: "#A29BFE", purplePale: "#EDE9FF", purpleDark: "#4834D4",
    yellow: "#FDCB6E", yellowPale: "#FFF8E7", pink: "#FD79A8", pinkPale: "#FFF0F5",
    mint: "#00B894", mintPale: "#E0FAF4", sky: "#74B9FF", skyPale: "#EAF4FF",
    coral: "#FF7675", coralPale: "#FFF0F0", orange: "#E17055", orangePale: "#FFF2EE",
    bg: "#F8F7FF", surface: "#FFFFFF", surfaceAlt: "#F3F2FA", border: "#E8E6F8",
    text: "#2D3436", textSub: "#636E72", textMuted: "#A0A0B8"
  },
  font: {
    display: "clamp(24px, 6vw, 30px)", h1: "clamp(20px, 5vw, 26px)",
    h2: "clamp(18px, 4.5vw, 22px)", h3: "clamp(16px, 4vw, 19px)",
    body: "clamp(14px, 3.5vw, 16px)", small: "clamp(12px, 3vw, 14px)"
  },
  radius: { sm: 10, md: 16, lg: 22, xl: 28, full: 999 }
};

const Pill = ({ children, color, pale, style }) => (
  <span style={{
    padding: "4px 10px", borderRadius: DS.radius.full, background: pale,
    color: color, fontSize: 11, fontWeight: 800, ...style
  }}>{children}</span>
);

export default function App() {
  const [view, setView] = useState("HOME"); // HOME, MAIN
  const [selectedUser, setSelectedUser] = useState(null);
  const [appData, setAppData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("gongbu_v4_data");
    if (saved) setAppData(JSON.parse(saved));
  }, []);

  const c = DS.color;

  // [2. 메인 대시보드 화면 (이미지에서 끊겼던 부분)]
  const renderDashboard = () => (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => setView("HOME")} style={{ border: 'none', background: 'none', fontSize: 20 }}>🏠</button>
        <h2 style={{ fontSize: DS.font.h2, fontWeight: 800 }}>{selectedUser}님의 정원</h2>
        <div style={{ width: 24 }}></div>
      </header>
      
      {/* 여기에 기존 로직대로 씨앗, 꽃, 완료 수치들이 표시됩니다 */}
      <div style={{ background: c.surface, padding: 20, borderRadius: DS.radius.xl, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <p style={{ textAlign: 'center', color: c.textSub }}>공부를 시작해서 꽃을 피워보세요! 🌱</p>
      </div>
    </div>
  );

  // [3. 홈 화면 (프로필 선택)]
  const renderHome = () => (
    <div style={{ padding: "40px 20px" }}>
      <h1 style={{ fontSize: DS.font.display, fontWeight: 900, color: c.purple, marginBottom: 10 }}>공부집사 🌿</h1>
      <p style={{ color: c.textSub, marginBottom: 30 }}>우리 가족 맞춤형 공부 도우미</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {["나은이", "지윤이", "엄마", "아빠"].map(name => (
          <button key={name} onClick={() => { setSelectedUser(name); setView("MAIN"); }}
            style={{
              padding: "25px 15px", background: c.surface, borderRadius: DS.radius.lg,
              border: `1px solid ${c.border}`, boxShadow: "0 4px 12px rgba(0,0,0,0.03)", cursor: 'pointer'
            }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>{name === "엄마" ? "👩‍💻" : name === "아빠" ? "👨‍💻" : "👶"}</div>
            <div style={{ fontWeight: 800, color: c.text }}>{name}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // [4. 최종 렌더링 - 이 부분이 수정 포인트!]
  return (
    <div style={{ 
      maxWidth: 500, margin: "0 auto", minHeight: "100vh", 
      background: c.bg, color: c.text, fontFamily: "sans-serif" 
    }}>
      {view === "HOME" ? renderHome() : renderDashboard()}
    </div>
  );
}
