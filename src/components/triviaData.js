/**
 * Trivia questions — edit text and set `correct: true` on the right answer.
 * Default GIFs: `correctAnswerGif` / `wrongAnswerGif`.
 * Override per question with `correctReactionGif` or `reactionGif` if needed.
 */
export const correctAnswerGif = "/assets/cat-cute.gif";
export const wrongAnswerGif = "/assets/consumed-by-hatred-kitten.gif";

export const triviaIntro = {
  title: "Our Little Quiz",
  body: "Here is a little quiz to test your knowledge of us. See how well you know us!",
};

export const triviaQuestions = [
  {
    id: 1,
    question: "Question 1 — What was the first movie we watched together?",
    answers: [
      { text: "F1: The Movie", correct: false },
      { text: "Final Destination: Bloodlines", correct: true },
      { text: "One Piece Movie: Red", correct: false },
      { text: "The Matrix", correct: false },
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
  {
    id: 6,
    question: "Question 6 - What is Bradley's nickname",
    answers: [
      { text: "Bronchacho", correct: false },
      { text: "Bread", correct: true },
      { text: "Breadster", correct: false },
      { text: "Brad", correct: false },
    ],
  },
  {
    id: 7,
    question: "Question 7 - What was the name saved in Bradley's phone for the first 6 months?",
    answers: [
      { text: "Nicole Runa", correct: true },
      { text: "Nicole Espey", correct: false },
      { text: "Nicole my Lurtz", correct: false },
      { text: "Watermelon Lover", correct: false },
    ],
  },
  {
    id: 8,
    question: "Question 8 - Where did we go skiing together for the first time?",
    answers: [
      { text: "Blue Mountain", correct: false },
      { text: "Mont Tremblant", correct: false },
      { text: "Camp Fortune", correct: true },
      { text: "Glen Eden", correct: false },
    ],
  },
  {
    id: 9,
    question: "Question 9 - What did we have for dinner on our date in Brampton?",
    answers: [
      { text: "Chinese food", correct: false },
      { text: "Indian food", correct: true },
      { text: "Italian food", correct: false },
      { text: "Mexican food", correct: false },
    ],
  },
  {
    id: 10,
    question: "Question 10 - What name would we name our dog?",
    answers: [
      { text: "Lurtz", correct: false },
      { text: "Gloria", correct: false },
      { text: "Bertholomew", correct: false },
      { text: "Paul", correct: true },
    ],
  },
  {
    id: 11,
    question: "Question 11 - Who is the hottest person to exist?",
    answers: [
      { text: "Bradley", correct: false },
      { text: "Nicole", correct: false },
      { text: "Lurtz", correct: true },
      { text: "King Juilian", correct: false },
    ],
  },
  {
    id: 11,
    question: "Question 10 - Who loves each other the most?",
    answers: [
      { text: "Bradley", correct: true},
      { text: "Nicole", correct: true },
    ],
  }
];
