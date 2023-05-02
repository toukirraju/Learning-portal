import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  previousQuestion,
  resetQuiz,
  selectAnswer,
} from "../../../../redux/featuers/quizes/quizSlice";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";

const QuizModal = ({ quizModal, setQuizModal }) => {
  const dispatch = useDispatch();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [confirmation, setConfirmation] = useState({
    data: "",
    popupType: "",
    popupMessage: "",
  });

  const { user } = useSelector((state) => state.auth);
  const { questions, currentQuestionIndex, selectedAnswers } = useSelector(
    (state) => state.quiz
  );

  const handleAnswerSelect = (questionId, answerId) => {
    dispatch(selectAnswer({ questionId, answerId }));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };
  const handlePreviousQuestion = () => {
    dispatch(previousQuestion());
  };

  // calculate quiz result
  const calculateResult = (quizQustions) => {
    const result = {
      id: Math.floor(new Date().getTime().toString()),
      student_id: user?.id,
      student_name: user?.name,
      video_id: quizQustions[0].video_id,
      video_title: quizQustions[0].video_title,
      totalQuiz: quizQustions.length,
      totalCorrect: 0,
      totalWrong: 0,
      totalMark: 0,
      mark: 0,
    };

    const { correctAnswers } = getQuizAnswers(quizQustions);

    quizQustions.forEach((question) => {
      const selectedAns = selectedAnswers[question.id] || [];

      const currectOptions = correctAnswers[question.id];

      if (arraysEqual(selectedAns, currectOptions)) {
        // The arrays are equal.");
        result.totalCorrect++;
        // result.totalMark = result.totalMark + 5;
      } else {
        // The arrays are not equal.");
        result.totalWrong++;
      }

      result.mark = result.totalCorrect * 5;
      result.totalMark = result.totalQuiz * 5;
    });
    return result;
  };

  // array equality checking function
  const arraysEqual = (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) return false;
    }

    return true;
  };

  // get correct and wrong optns ids for specific qustion
  const getQuizAnswers = (quizArray) => {
    const correctAnswers = {};
    const wrongAnswers = {};

    quizArray.forEach((question) => {
      // separate currect option
      const correctOptionIds = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.id);
      // separate incurrect option
      const incorrectOptionIds = question.options
        .filter((option) => !option.isCorrect)
        .map((option) => option.id);

      if (correctOptionIds.length > 0) {
        correctAnswers[question.id] = correctOptionIds;
      }

      if (incorrectOptionIds.length > 0) {
        wrongAnswers[question.id] = incorrectOptionIds;
      }
    });

    return { correctAnswers, wrongAnswers };
  };

  const handleQuizSubmit = () => {
    const result = calculateResult(questions);
    setConfirmationPopup(true);
    setConfirmation({
      data: result,
      popupType: "quizSubmit",
      popupMessage:
        "This action cannot be undone. Are you sure you want to submit Quiz?",
    });
    setQuizModal(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    dispatch(resetQuiz());
  }, [quizModal]);

  return (
    <>
      <Modal
        title={currentQuestion?.video_title}
        opened={quizModal}
        onClose={() => setQuizModal(false)}
        size="xl"
        classNames={{
          content: `modal__Body`,
          header: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
      >
        <div className="quiz">
          <h4 className="question">{currentQuestion?.question}</h4>
          <div className="quizOptions">
            {currentQuestion?.options.map((option) => (
              <div key={option.id}>
                <label key={Number(option.id)}>
                  <input
                    type="checkbox"
                    id={option.id}
                    name={currentQuestion.id}
                    value={option.id}
                    checked={(
                      selectedAnswers[currentQuestion.id] || []
                    ).includes(option.id)}
                    onChange={() =>
                      handleAnswerSelect(currentQuestion.id, option.id)
                    }
                  />
                  {option.option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around my-5">
          <button
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary disabled:cursor-not-allowed disabled:hover:text-cyan-600 disabled:hover:bg-transparent  "
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              className="px-3 font-bold py-1 border border-green-800 text-green-800 bg-green-300 rounded-full text-sm hover:bg-green-500 hover:text-gray-200"
              onClick={handleQuizSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </Modal>

      <ConfirmationPopup
        confirmationPopup={confirmationPopup}
        setConfirmationPopup={setConfirmationPopup}
        confirmation={confirmation}
      />
    </>
  );
};

export default QuizModal;
