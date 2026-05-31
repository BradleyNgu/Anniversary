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
    question: "Question 1 — where was our first meet?",
    answers: [
      { text: "Carleton University", correct: false },
      { text: "Movie Theatre", correct: true },
      { text: "Karoke", correct: false },
      { text: "Square One Mall", correct: false },
    ],
  },
  {
    id: 2,
    question: "Question 2 — When did we start officially dating?",
    answers: [
      { text: "July 21, 2025", correct: false },
      { text: "May 28, 2025", correct: false },
      { text: "July 20, 2025", correct: true },
      { text: "June 1, 2025", correct: false },
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
