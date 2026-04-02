import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import quizContent, { QuizQuestion } from "./quizContent";

type Lang = "zh" | "en" | "ja";

interface AwarenessQuizProps {
  lang: Lang;
  onBack?: () => void;
}

export default function AwarenessQuiz({ lang, onBack }: AwarenessQuizProps) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);

  const questions = quizContent.questions;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === "quiz") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          goNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goPrev();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, currentIndex]);

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  const isNewGroup = currentIndex === 0 || currentQuestion.group !== questions[currentIndex - 1].group;
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {phase === "quiz" && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/10 z-[60]">
          <motion.div
            className="h-full bg-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}

      {onBack && (
        <div className="fixed top-6 left-6 z-[50]">
          <button
            onClick={onBack}
            className="text-muted hover:text-accent transition-colors text-sm font-mono tracking-wider"
          >
            ← 返回
          </button>
        </div>
      )}

      <div className="fixed top-6 right-6 z-[50] flex gap-2">
        {(["zh", "en", "ja"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => {}}
            className={ px-3 py-1 text-xs font-mono rounded-full transition-all ${
              l === lang
                ? "bg-accent text-bg"
                : "text-muted hover:text-accent border border-accent/20"
            }}
          >
            {l === "zh" ? "中" : l === "en" ? "EN" : "日"}
          </button>
        ))}
      </div>
         <div className="flex-1 flex items-center justify-center px-6 py-24">
        <AnimatePresence mode="wait">

          {phase === "intro" && (
            <motion.div
              key="intro"
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-ink">
                {lang === "zh" ? "察覺測驗" : lang === "en" ? "Awareness Quiz" : "気づきのテスト"}
                <br />
                <span className="text-accent">
                  {lang === "zh" ? "— 與自己對話 —" : lang === "en" ? "— A Dialogue with Yourself —" : "— 自分との対話 —"}
                </span>
              </h1>

              <div className="space-y-4 text-ink/70 text-lg leading-[2] mb-16">
                {quizContent.intro[lang].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}>
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p className="text-muted text-sm mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {quizContent.beforeStart[lang]}
              </motion.p>

              <motion.button
                onClick={() => setPhase("quiz")}
                className="px-12 py-5 bg-accent text-bg rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                {lang === "zh" ? "開始" : lang === "en" ? "Begin" : "始める"}
              </motion.button>
            </motion.div>
          )}
                    {phase === "intro" && (
            <motion.div
              key="intro"
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-ink">
                {lang === "zh" ? "察覺測驗" : lang === "en" ? "Awareness Quiz" : "気づきのテスト"}
                <br />
                <span className="text-accent">
                  {lang === "zh" ? "— 與自己對話 —" : lang === "en" ? "— A Dialogue with Yourself —" : "— 自分との対話 —"}
                </span>
              </h1>

              <div className="space-y-4 text-ink/70 text-lg leading-[2] mb-16">
                {quizContent.intro[lang].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}>
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p className="text-muted text-sm mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {quizContent.beforeStart[lang]}
              </motion.p>

              <motion.button
                onClick={() => setPhase("quiz")}
                className="px-12 py-5 bg-accent text-bg rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                {lang === "zh" ? "開始" : lang === "en" ? "Begin" : "始める"}
              </motion.button>
            </motion.div>
          )}
                   {phase === "quiz" && currentQuestion && (
            <motion.div
              key={q-${currentIndex}}
              className="max-w-3xl mx-auto w-full"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-8">
                <span className="mono-label">{currentIndex + 1} / {questions.length}</span>
              </div>

              {isNewGroup && (
                <motion.div className="mb-12" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-xl font-serif font-bold text-accent mb-2">
                    {currentQuestion.groupTitle[lang]}
                  </h2>
                  <div className="w-16 h-px bg-accent/30" />
                </motion.div>
              )}

              <motion.p
                className={text-2xl md:text-3xl font-serif leading-[1.8] text-ink ${currentQuestion.isClosing ? "text-accent italic" : ""}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentQuestion.text[lang]}
              </motion.p>

              <div className="h-32" />

              <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                {currentIndex > 0 ? (
                  <button onClick={goPrev} className="text-muted hover:text-accent transition-colors text-sm font-mono tracking-wider">
                    ← {lang === "zh" ? "上一題" : lang === "en" ? "Previous" : "前へ"}
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={goNext}
                  className="px-8 py-3 bg-accent/10 text-accent rounded-full font-mono text-sm tracking-wider hover:bg-accent/20 transition-all border border-accent/20"
                >
                  {currentIndex === questions.length - 1
                    ? lang === "zh" ? "完成" : lang === "en" ? "Finish" : "終わる"
                    : lang === "zh" ? "下一題" : lang === "en" ? "Next" : "次へ"}
                  →
                </button>
              </motion.div>
            </motion.div>
          )}
                {phase === "result" && (
            <motion.div
              key="result"
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="space-y-6 text-ink/80 text-xl leading-[2.2] mb-20">
                {quizContent.result[lang].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.4 }}
                    className={i === quizContent.result[lang].length - 1 ? "text-accent italic font-serif" : ""}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  setPhase("intro");
                  setCurrentIndex(0);
                }}
                className="px-10 py-4 bg-accent/10 text-accent rounded-full font-mono text-sm tracking-wider hover:bg-accent/20 transition-all border border-accent/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                {lang === "zh" ? "重新開始" : lang === "en" ? "Start Over" : "もう一度"} →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
