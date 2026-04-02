import { useState, useEffect } from "react";
import quizContent from "./quizContent";

type Lang = "zh" | "en" | "ja";

export default function AwarenessQuiz({ lang, onBack }: { lang: Lang; onBack?: () => void }) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);

  const questions = quizContent.questions;
  const currentQuestion = questions[currentIndex];

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

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isNewGroup = currentIndex === 0 || currentQuestion.group !== questions[currentIndex - 1].group;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg, #1A1A1A)", color: "var(--ink, #333)", display: "flex", flexDirection: "column" }}>
      {/* Progress bar */}
      {phase === "quiz" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", backgroundColor: "rgba(255,255,255,0.1)", zIndex: 60 }}>
          <div style={{ height: "100%", backgroundColor: "var(--accent, #c9a96e)", width: progress + "%", transition: "width 0.6s ease" }} />
        </div>
      )}

      {/* Back button */}
      {onBack && (
        <div style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 50 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--accent, #c9a96e)", cursor: "pointer", fontSize: "0.875rem", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            &larr; {"\u8fd4\u56de"}
          </button>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem", paddingTop: "4rem" }}>

        {/* INTRO */}
        {phase === "intro" && (
          <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(1.875rem, 5vw, 2.25rem)", fontFamily: "serif", fontWeight: "bold", marginBottom: "3rem", color: "var(--ink, #333)" }}>
              {lang === "zh" ? "\u5bdf\u89ba\u6e2c\u9a57" : lang === "en" ? "Awareness Quiz" : "\u6c17\u3065\u304d\u306e\u30c6\u30b9\u30c8"}
              <br />
              <span style={{ color: "var(--accent, #c9a96e)" }}>
                {lang === "zh" ? "\u2014 \u8207\u81ea\u5df1\u5c0d\u8a71 \u2014" : lang === "en" ? "\u2014 A Dialogue with Yourself \u2014" : "\u2014 \u81ea\u5206\u3068\u306e\u5bfe\u8a71 \u2014"}
              </span>
            </h1>
            <div style={{ marginBottom: "4rem", lineHeight: 2, fontSize: "1.125rem", opacity: 0.7, color: "var(--ink, #333)" }}>
              {quizContent.intro[lang].map((line, i) => (
                <p key={i} style={{ marginBottom: "1rem" }}>{line}</p>
              ))}
            </div>
            <p style={{ fontSize: "0.875rem", marginBottom: "4rem", color: "var(--muted, #888)" }}>
              {quizContent.beforeStart[lang]}
            </p>
            <button onClick={() => setPhase("quiz")} style={{ padding: "1.25rem 3rem", backgroundColor: "var(--accent, #c9a96e)", color: "var(--bg, #1A1A1A)", border: "none", borderRadius: "9999px", fontWeight: "bold", fontSize: "1.25rem", cursor: "pointer" }}>
              {lang === "zh" ? "\u958b\u59cb" : lang === "en" ? "Begin" : "\u59cb\u3081\u308b"}
            </button>
          </div>
        )}

        {/* QUIZ */}
        {phase === "quiz" && currentQuestion && (
          <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}>{currentIndex + 1} / {questions.length}</span>
            </div>
            {isNewGroup && (
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontFamily: "serif", fontWeight: "bold", color: "var(--accent, #c9a96e)", marginBottom: "0.5rem" }}>
                  {currentQuestion.groupTitle[lang]}
                </h2>
                <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(201,169,110,0.3)" }} />
              </div>
            )}
            <p style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)", fontFamily: "serif", lineHeight: 1.8, color: currentQuestion.isClosing ? "var(--accent, #c9a96e)" : "var(--ink, #333)", fontStyle: currentQuestion.isClosing ? "italic" : "normal" }}>
              {currentQuestion.text[lang]}
            </p>
            <div style={{ height: "8rem" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {currentIndex > 0 ? (
                <button onClick={() => setCurrentIndex((i) => i - 1)} style={{ background: "none", border: "none", color: "var(--muted, #888)", cursor: "pointer", fontSize: "0.875rem", fontFamily: "monospace" }}>
                  &larr; {lang === "zh" ? "\u4e0a\u4e00\u984c" : lang === "en" ? "Previous" : "\u524d\u3078"}
                </button>
              ) : <div />}
              <button onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex((i) => i + 1) : setPhase("result")} style={{ padding: "0.75rem 2rem", backgroundColor: "rgba(201,169,110,0.1)", color: "var(--accent, #c9a96e)", borderRadius: "9999px", fontFamily: "monospace", fontSize: "0.875rem", border: "1px solid rgba(201,169,110,0.2)", cursor: "pointer" }}>
                {currentIndex === questions.length - 1 ? (lang === "zh" ? "\u5b8c\u6210" : lang === "en" ? "Finish" : "\u7d42\u308f\u308b") : (lang === "zh" ? "\u4e0b\u4e00\u984c" : lang === "en" ? "Next" : "\u6b21\u3078")} &rarr;
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: "5rem", lineHeight: 2.2, fontSize: "1.25rem", opacity: 0.8, color: "var(--ink, #333)" }}>
              {quizContent.result[lang].map((line, i) => (
                <p key={i} style={{ marginBottom: "1.5rem", fontStyle: i === quizContent.result[lang].length - 1 ? "italic" : "normal", fontFamily: i === quizContent.result[lang].length - 1 ? "serif" : "inherit", color: i === quizContent.result[lang].length - 1 ? "var(--accent, #c9a96e)" : "inherit" }}>
                  {line}
                </p>
              ))}
            </div>
            <button onClick={() => { setPhase("intro"); setCurrentIndex(0); }} style={{ padding: "1rem 2.5rem", backgroundColor: "rgba(201,169,110,0.1)", color: "var(--accent, #c9a96e)", borderRadius: "9999px", fontFamily: "monospace", fontSize: "0.875rem", border: "1px solid rgba(201,169,110,0.2)", cursor: "pointer" }}>
              {lang === "zh" ? "\u91cd\u65b0\u958b\u59cb" : lang === "en" ? "Start Over" : "\u3082\u3046\u4e00\u5ea6"} &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
