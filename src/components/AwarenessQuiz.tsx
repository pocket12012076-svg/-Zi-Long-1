import { useState, useEffect } from "react";
import quizContent from "./quizContent";

type Lang = "zh" | "en" | "ja";

export default function AwarenessQuiz({ lang, onBack }: { lang: Lang; onBack?: () => void }) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions = quizContent.questions;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isNewGroup = currentIndex === 0 || currentQuestion.group !== questions[currentIndex - 1].group;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === "quiz") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
          else setPhase("result");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (currentIndex > 0) setCurrentIndex((i) => i - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, currentIndex]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#ffffff", color: "#333333", overflowY: "auto", zIndex: 9999, fontFamily: "serif" }}>

      {phase === "quiz" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", backgroundColor: "#eee", zIndex: 60 }}>
          <div style={{ height: "100%", backgroundColor: "#c9a96e", width: progress + "%", transition: "width 0.6s ease" }} />
        </div>
      )}

      {onBack && (
        <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 99999 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#c9a96e", cursor: "pointer", fontSize: "1rem" }}>
            ← 返回
          </button>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "5rem 2rem" }}>

        {phase === "intro" && (
          <div style={{ maxWidth: "600px", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
              {lang === "zh" ? "察覺測驗" : lang === "en" ? "Awareness Quiz" : "気づきのテスト"}
              <br />
              <span style={{ color: "#c9a96e" }}>
                {lang === "zh" ? "— 與自己對話 —" : lang === "en" ? "— A Dialogue with Yourself —" : "— 自分との対話 —"}
              </span>
            </h1>
            {quizContent.intro[lang].map((line, i) => (
              <p key={i} style={{ marginBottom: "1rem", lineHeight: 2, color: "#666" }}>{line}</p>
            ))}
            <p style={{ fontSize: "0.875rem", marginBottom: "2rem", color: "#999" }}>
              {quizContent.beforeStart[lang]}
            </p>
            <button onClick={() => setPhase("quiz")} style={{ padding: "1rem 3rem", backgroundColor: "#c9a96e", color: "#fff", border: "none", borderRadius: "9999px", fontWeight: "bold", fontSize: "1.25rem", cursor: "pointer" }}>
              {lang === "zh" ? "開始" : lang === "en" ? "Begin" : "始める"}
            </button>
          </div>
        )}

        {phase === "quiz" && currentQuestion && (
          <div style={{ maxWidth: "700px", width: "100%" }}>
            <div style={{ marginBottom: "1.5rem", fontSize: "0.875rem", fontFamily: "monospace" }}>
              {currentIndex + 1} / {questions.length}
            </div>
            {isNewGroup && (
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#c9a96e" }}>
                  {currentQuestion.groupTitle[lang]}
                </h2>
                <div style={{ width: "4rem", height: "1px", backgroundColor: "#c9a96e", opacity: 0.3 }} />
              </div>
            )}
            <p style={{ fontSize: "1.5rem", lineHeight: 1.8, fontStyle: currentQuestion.isClosing ? "italic" : "normal", color: currentQuestion.isClosing ? "#c9a96e" : "#333" }}>
              {currentQuestion.text[lang]}
            </p>
            <div style={{ height: "6rem" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {currentIndex > 0 ? (
                <button onClick={() => setCurrentIndex((i) => i - 1)} style={{ background: "none", border: "none", color: "#999", cursor: "pointer" }}>
                  ← {lang === "zh" ? "上一題" : lang === "en" ? "Previous" : "前へ"}
                </button>
              ) : <div />}
              <button onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex((i) => i + 1) : setPhase("result")} style={{ padding: "0.75rem 2rem", backgroundColor: "#c9a96e", color: "#fff", borderRadius: "9999px", border: "none", cursor: "pointer" }}>
                {currentIndex === questions.length - 1 ? (lang === "zh" ? "完成" : lang === "en" ? "Finish" : "終わる") : (lang === "zh" ? "下一題" : lang === "en" ? "Next" : "次へ")} →
              </button>
            </div>
          </div>
        )}

        {phase === "result" && (
          <div style={{ maxWidth: "600px", textAlign: "center" }}>
            {quizContent.result[lang].map((line, i) => (
              <p key={i} style={{ marginBottom: "1.5rem", lineHeight: 2.2, fontSize: "1.125rem", fontStyle: i === quizContent.result[lang].length - 1 ? "italic" : "normal", color: i === quizContent.result[lang].length - 1 ? "#c9a96e" : "#555" }}>
                {line}
              </p>
            ))}
            <button onClick={() => { setPhase("intro"); setCurrentIndex(0); }} style={{ padding: "1rem 2.5rem", backgroundColor: "transparent", color: "#c9a96e", borderRadius: "9999px", border: "1px solid #c9a96e", cursor: "pointer" }}>
              {lang === "zh" ? "重新開始" : lang === "en" ? "Start Over" : "もう一度"} →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
