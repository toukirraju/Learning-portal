import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  removeOption,
} from "../../../../redux/featuers/quizes/quizSlice";

const QuizOption = ({ option }) => {
  const dispatch = useDispatch();
  const { selectedOptions } = useSelector((state) => state.quiz);

  const handleChange = (e) => {
    console.log(e);
    // const isChecked = e.target.checked;
    // if (isChecked) {
    //   dispatch(addOption(option.id));
    // } else {
    //   dispatch(removeOption(option.id));
    // }
  };
  return (
    <label htmlFor="option1_q1">
      <input
        type="checkbox"
        id="option1_q1"
        checked={selectedOptions.includes(option.id)}
        // name={name}
        // value={value}
        onChange={() => handleChange(option)}
      />
      {option?.option}
    </label>
  );
};

export default QuizOption;
