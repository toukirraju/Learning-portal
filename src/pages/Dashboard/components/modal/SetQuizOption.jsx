import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import FormField from "../UI/FormField";

const SetQuizOption = ({
  quizOptionModalOpen,
  setQuizOptionModalOpen,
  onSubmit,
}) => {
  const theme = useMantineTheme();
  const [quizOption, setQuizOption] = useState({
    id: 0,
    option: "",
    isCorrect: true,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuizOption({ ...quizOption, [name]: value });
  };

  const restForm = () => {
    setQuizOption({
      id: 0,
      option: "",
      isCorrect: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...quizOption,
      id: Math.floor(new Date().getTime().toString()),
    });
    restForm();
    setQuizOptionModalOpen(false);
  };
  return (
    <Modal
      opened={quizOptionModalOpen}
      onClose={() => setQuizOptionModalOpen(false)}
      title="Quiz option"
      size="md"
      styles={{
        header: { background: "lightgray", borderBottom: "1px solid white" },
        body: { background: "lightgray" },
      }}
    >
      <form className="input__form" onSubmit={handleSubmit}>
        <h3 className="form__title"> Set Quiz option</h3>

        <div className="form__group">
          <FormField
            InputType="input"
            title="Option"
            name="option"
            value={quizOption.option}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form__group">
          <label className="form__label">Is Answer Correct ?</label>
          <label
            htmlFor="radio_Correct"
            className="flex items-center gap-2 text-sm font-bold cursor-pointer  text-gray-600"
          >
            <input
              id="radio_Correct"
              name="isCorrect"
              value="yes"
              checked={quizOption.isCorrect}
              type="radio"
              onChange={(e) =>
                setQuizOption({ ...quizOption, isCorrect: true })
              }
            />{" "}
            Yes
          </label>
          <label
            htmlFor="radio_inCorrect"
            className="flex items-center gap-2 text-sm font-bold  cursor-pointer  text-gray-600"
          >
            <input
              id="radio_inCorrect"
              name="isCorrect"
              value="no"
              checked={!quizOption.isCorrect}
              type="radio"
              onChange={(e) =>
                setQuizOption({ ...quizOption, isCorrect: false })
              }
            />{" "}
            No
          </label>
        </div>

        <div className="center__button">
          <button className="btn form__submit__btn" type="submit">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SetQuizOption;
