/**
 * Trivia questions — edit text and set `correct: true` on the right answer.
 * Default GIFs: `correctAnswerGif` / `wrongAnswerGif`.
 * Override per question with `correctReactionGif` or `reactionGif` if needed.
 */
export const correctAnswerGif = "/assets/cat-cute.gif";
export const wrongAnswerGif = "/assets/consumed-by-hatred-kitten.gif";

export const triviaIntro = {
  title: "Our Little Quiz",
  body: "Sample intro text — replace this with your own words before the game starts.",
};

export const triviaQuestions = [
  {
    id: 1,
    question: "Sample question 1 — where did we first meet?",
    answers: [
      { text: "Sample answer A", correct: false },
      { text: "Sample answer B (mark correct)", correct: true },
      { text: "Sample answer C", correct: false },
      { text: "Sample answer D", correct: false },
    ],
  },
  {
    id: 2,
    question: "Sample question 2 — what's our song?",
    answers: [
      { text: "Sample answer A", correct: false },
      { text: "Sample answer B", correct: false },
      { text: "Sample answer C (mark correct)", correct: true },
      { text: "Sample answer D", correct: false },
    ],
  },
  {
    id: 3,
    question: "Sample question 3 — favorite shared memory?",
    answers: [
      { text: "Sample answer A (mark correct)", correct: true },
      { text: "Sample answer B", correct: false },
      { text: "Sample answer C", correct: false },
      { text: "Sample answer D", correct: false },
    ],
  },
];
