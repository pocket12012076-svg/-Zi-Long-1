import { useState } from "react";

type Lang = "zh" | "en" | "ja";

export default function AwarenessQuiz({ lang, onBack }: { lang: Lang; onBack?: () => void }) {
  const [phase, setPhase] = useState("intro");
  const [step, setStep] = useState(0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#333333", padding: "5rem 2rem", fontFamily: "serif" }}>
      <button onClick={onBack} style={{ background: "none", border: "1px solid #ccc", color: "#333", cursor: "pointer", padding: "0.5rem 1rem", marginBottom: "2rem" }}>
        返回
      </button>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        測試頁面
      </h1>

      {phase === "intro" && (
        <div>
          <p style={{ marginBottom: "1rem" }}>這是測試。如果你能看到這段文字，代表元件正常運作。</p>
          <p style={{ marginBottom: "1rem" }}>語言：{lang}</p>
          <button onClick={() => setPhase("quiz")} style={{ padding: "1rem 2rem", backgroundColor: "#c9a96e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}>
            開始測驗
          </button>
        </div>
      )}

      {phase === "quiz" && (
        <div>
          <p style={{ marginBottom: "1rem" }}>第 {step + 1} 題</p>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            {step === 0 ? "今天有什麼情緒出現了嗎？" : step === 1 ? "你有想過為什麼嗎？" : "測試完成！"}
          </p>
          <button onClick={() => step < 2 ? setStep(step + 1) : setPhase("result")} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#c9a96e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            下一題
          </button>
        </div>
      )}

      {phase === "result" && (
        <div>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>測試結束，一切正常！</p>
          <button onClick={() => { setPhase("intro"); setStep(0); }} style={{ padding: "0.75rem 1.5rem", border: "1px solid #c9a96e", backgroundColor: "transparent", color: "#c9a96e", borderRadius: "8px", cursor: "pointer" }}>
            重新開始
          </button>
        </div>
      )}
    </div>
  );
}
