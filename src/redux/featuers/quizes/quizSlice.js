import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: {},
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
      // Initialize selectedAnswers with an empty array for each question ID
      action.payload.forEach((question) => {
        state.selectedAnswers[question.id] = [];
      });
    },
    selectAnswer(state, action) {
      const { questionId, answerId } = action.payload;
      // Add or remove the answer from the selectedAnswers array for this question
      const selected = state.selectedAnswers[questionId] || [];
      if (selected.includes(answerId)) {
        state.selectedAnswers[questionId] = selected.filter(
          (id) => id !== answerId
        );
      } else {
        state.selectedAnswers[questionId] = [...selected, answerId];
      }
    },

    nextQuestion(state) {
      state.currentQuestionIndex++;
    },
    previousQuestion(state) {
      state.currentQuestionIndex--;
    },

    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = {};
    },
  },
});

export const {
  setQuestions,
  selectAnswer,
  nextQuestion,
  previousQuestion,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
