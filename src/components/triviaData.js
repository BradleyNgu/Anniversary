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
    question: "Question 3 - What was the first restaurant we went to alone together?",
    answers: [
      { text: "Waton kabob", correct: true },
      { text: "Gyubee", correct: false },
      { text: "Sammi & Soupe Dumpling", correct: false },
      { text: "Shawarma Palace", correct: false },
    ],
  },
  {
    id: 4,
    question: "Question 4 - What did Bradley wear on the first date?",
    answers: [
      { text: "All white", correct: false },
      { text: "All black", correct: true },
      { text: "Hoodie and sweatpants", correct: false },
      { text: "Nothing", correct: false },
    ],
  },
  {
    id: 5,
    question: "Question 5 - What was the first movie we watched together?",
    answers: [
      { text: "Project Hail Mary", correct: false },
      { text: "Scary Movie", correct: false },
      { text: "F1: The Movie", correct: true },
      { text: "La La Land", correct: false },
    ],
  },
];
