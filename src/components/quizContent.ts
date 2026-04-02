export interface QuizQuestion {
  id: number;
  group: number;
  groupTitle: { zh: string; en: string; ja: string };
  text: { zh: string; en: string; ja: string };
  isClosing?: boolean;
}

export interface QuizContent {
  intro: { zh: string[]; en: string[]; ja: string[]; };
  beforeStart: { zh: string; en: string; ja: string; };
  questions: QuizQuestion[];
  result: { zh: string[]; en: string[]; ja: string[]; };
}

const quizContent: QuizContent = {
  intro: {
    zh: [
      "這不是心理測驗，不會定位你是誰。",
      "這些題目只是一面鏡子，讓你找到新的角度去看見。",
      "你要怎麼用這面鏡子，決定權永遠在你手上。"
    ],
    en: [
      "This is not a personality test. It will not define who you are.",
      "These questions are simply a mirror — to help you see from a new angle.",
      "How you use this mirror is entirely up to you."
    ],
    ja: [
      "これは心理テストではありません。あなたが誰であるかを定義するものではありません。",
      "これらの問いは、ただの鏡です。新しい角度で自分を見つめるための。",
      "この鏡をどう使うかは、いつだってあなた次第です。"
    ]
  },
  beforeStart: {
    zh: "這裡沒有對錯答案，沒有分數，沒有「你已經完成了百分之幾」。只有你，和你自己。",
    en: "There are no right or wrong answers here. No scores. No \"you are X% complete.\" Just you, and yourself.",
    ja: "ここに正解も不正解もありません。点数もありません。「完了率」もありません。ただ、あなたと、あなた自身だけ。"
  },
    questions: [
    {
      id: 1, group: 1,
      groupTitle: { zh: "情緒", en: "Emotions", ja: "感情" },
      text: { zh: "今天有沒有什麼情緒突然莫名出現？", en: "Was there any emotion that suddenly surfaced today, seemingly out of nowhere?", ja: "今日、理由もなく突然浮かび上がってきた感情はありましたか？" }
    },
    {
      id: 2, group: 1,
      groupTitle: { zh: "情緒", en: "Emotions", ja: "感情" },
      text: { zh: "當下注意到時有沒有想過為什麼？", en: "When you noticed it, did you wonder why?", ja: "それに気づいたとき、なぜだろうと思いましたか？" }
    },
    {
      id: 3, group: 1,
      groupTitle: { zh: "情緒", en: "Emotions", ja: "感情" },
      text: { zh: "找到原因後，那原因是可改變的，還是無法改變的？", en: "Once you found the cause — was it something changeable, or unchangeable?", ja: "原因が見つかったとき、それは変えられるものでしたか？それとも変えられないものでしたか？" }
    },
    {
      id: 4, group: 1,
      groupTitle: { zh: "情緒", en: "Emotions", ja: "感情" },
      text: { zh: "你願意接受那（無法改變的）事實嗎？", en: "Are you willing to accept that (unchangeable) fact?", ja: "その（変えられない）事実を受け入れる意愿はありますか？" }
    },
    {
      id: 5, group: 1, isClosing: true,
      groupTitle: { zh: "情緒", en: "Emotions", ja: "感情" },
      text: { zh: "該情緒所帶來的力量，讓我們慢慢改變可改變的，無法改變的，你願意借力使力練習先看見它的存在，而不選擇和它對抗嗎？", en: "The force this emotion brings — let it slowly reshape what can be changed. For what cannot, would you practice simply seeing it exist, rather than choosing to fight it?", ja: "その感情がもたらす力を、変えられるものを少しずつ変えるために使いましょう。変えられないものについては、それと戦うのではなく、まずはそこにあることを見つめる練習をしてみませんか？" }
    },
    {
      id: 6, group: 2,
      groupTitle: { zh: "關係裡的自己", en: "Yourself in Relationships", ja: "関係の中のあなた" },
      text: { zh: "在親近的關係裡，你有沒有發現自己在用「同一種模式」表現自己？", en: "In your close relationships, have you noticed yourself using the \"same pattern\" to express who you are?", ja: "親しい関係の中で、あなたは「同じパターン」で自分を表現していないか気づいたことはありますか？" }
    },
    {
      id: 7, group: 2,
      groupTitle: { zh: "關係裡的自己", en: "Yourself in Relationships", ja: "関係の中のあなた" },
      text: { zh: "你覺得你需要這樣表現自己的原因是什麼？", en: "Why do you think you need to express yourself that way?", ja: "なぜそのように自分を表現する必要があると思いますか？" }
    },
    {
      id: 8, group: 2,
      groupTitle: { zh: "關係裡的自己", en: "Yourself in Relationships", ja: "関係の中のあなた" },
      text: { zh: "那個原因，是從什麼時候開始的？", en: "Since when did that reason begin?", ja: "その原因は、いつ頃から始まったものですか？" }
    },
    {
      id: 9, group: 2, isClosing: true,
      groupTitle: { zh: "關係裡的自己", en: "Yourself in Relationships", ja: "関係の中のあなた" },
      text: { zh: "是否是因為那時候你不這樣，就沒人看見你嗎？還是有其他原因？", en: "Was it because, back then, if you didn't act that way, no one would see you? Or was there another reason?", ja: "あの頃、そうしていなかったら、誰もあなたを見てくれなかったからですか？それとも別の理由がありますか？" }
    },
          {
      id: 10, group: 3,
      groupTitle: { zh: "你和「你的」信念", en: "You and \"Your\" Beliefs", ja: "あなたと「あなたの」信念" },
      text: { zh: "你有沒有做過一件事，不是因為你想做，是因為「本來就該」？", en: "Have you ever done something — not because you wanted to, but because you felt you \"should\"?", ja: "あなたがやりたいからではなく、「本来そうするべきだから」という理由で何かをしたことはありますか？" }
    },
    {
      id: 11, group: 3,
      groupTitle: { zh: "你和「你的」信念", en: "You and \"Your\" Beliefs", ja: "あなたと「あなたの」信念" },
      text: { zh: "如果沒有人會評價你，你還會做同樣的選擇嗎？", en: "If no one were judging you, would you still make the same choice?", ja: "誰もあなたを評価しないとしたら、同じ選択をしますか？" }
    },
    {
      id: 12, group: 3, isClosing: true,
      groupTitle: { zh: "你和「你的」信念", en: "You and \"Your\" Beliefs", ja: "あなたと「あなたの」信念" },
      text: { zh: "那個「本來就該」，是誰告訴你的？", en: "Who told you that you \"should\"?", ja: "その「本来そうするべきだ」と教えたのは誰ですか？" }
    },
    {
      id: 13, group: 4,
      groupTitle: { zh: "你的框架是誰給的？", en: "Who Gave You Your Framework?", ja: "あなたの枠組みは誰が与えたものですか？" },
      text: { zh: "在你的預測中有沒有什麼事，你從來沒想過它可以是別的樣子？", en: "Among your expectations, is there anything you've never considered could be different?", ja: "あなたの予想の中に、別のあり方かもしれないと考えたことのないものはありますか？" }
    },
    {
      id: 14, group: 4,
      groupTitle: { zh: "你的框架是誰給的？", en: "Who Gave You Your Framework?", ja: "あなたの枠組みは誰が与えたものですか？" },
      text: { zh: "那個「預演中」，是你自己觀念預設出來的，還是有人告訴你要這樣想？", en: "Was that \"rehearsal\" something you constructed from your own assumptions, or did someone tell you to think that way?", ja: "その「予行演習」は、あなた自身の思い込みが作り出したものですか？それとも誰かがそう考えるようにと言ったものですか？" }
    },
    {
      id: 15, group: 4,
      groupTitle: { zh: "你的框架是誰給的？", en: "Who Gave You Your Framework?", ja: "あなたの枠組みは誰が与えたものですか？" },
      text: { zh: "「人生一定會有遺憾」——這句話，是你自己驗證過的，還是你也從來沒想過它可以是別的樣子？", en: "\"Life will always have regrets\" — did you verify this yourself, or have you never considered it could be otherwise?", ja: "「人生には必ず後悔がつきもの」——この言葉は、あなた自身が確かめたものですか？それとも、別のあり方があるとは考えたこともなかったものですか？" }
    },
    {
      id: 16, group: 4, isClosing: true,
      groupTitle: { zh: "你的框架是誰給的？", en: "Who Gave You Your Framework?", ja: "あなたの枠組みは誰が与えたものですか？" },
      text: { zh: "同理，「人生一定會有後悔」——是因為它真的是，還是因為別人給的指示？", en: "Likewise, \"Life will always have regrets\" — is it because it truly is, or because someone else told you so?", ja: "同じく、「人生には必ず後悔がつきもの」——それは本当にそうだからですか？それとも誰かがそう言ったからですか？" }
    }
  ],
    result: {
    zh: [
      "以上的回答有沒有讓你離自己的感受多一點？",
      "每天都可以試著練習看看。",
      "有時候答案不會馬上出現。",
      "有時候出現的答案不是你真正的回覆。",
      "祝你在每一次傾聽自己的回音中，找到你原本真正的聲音。"
    ],
    en: [
      "Did any of the above answers bring you a little closer to your own feelings?",
      "You can practice this every day.",
      "Sometimes the answer doesn't appear right away.",
      "Sometimes the answer that appears isn't your true response.",
      "May you find your own, original voice every time you listen to your own echo."
    ],
    ja: [
      "これまでの答えは、あなたを自分の感覚に少しだけ近づけてくれましたか？",
      "毎日、練習してみてください。",
      "答えはすぐには出ないこともあります。",
      "出てきた答えが、本当のあなたの声ではないこともあります。",
      "自分のこだまに耳を傾けるたびに、あなたが本来持っていた本当の声が見つかりますように。"
    ]
  }
};

export default quizContent;
