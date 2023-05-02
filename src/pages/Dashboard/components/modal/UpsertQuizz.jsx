import { Loader, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import FormField from "../UI/FormField";
import addIcon from "../../../../assets/image/addIcon.png";
import deleteIcon from "../../../../assets/image/deleteIcon.png";
import SetQuizOption from "./SetQuizOption";
import { useMediaQuery } from "@mantine/hooks";
import { useFetchVideosQuery } from "../../../../redux/featuers/videos/videosApi";
import {
  useAddQuizMutation,
  useUpdateQuizMutation,
} from "../../../../redux/featuers/quizes/quizApi";

const UpsertQuizz = ({ upsertModalOpen, setUpsertModalOpen, data }) => {
  const [quizOptionModalOpen, setQuizOptionModalOpen] = useState(false);

  const { data: videos } = useFetchVideosQuery();
  const [addQuiz, { isSuccess: added, isLoading: addLoading }] =
    useAddQuizMutation();
  const [updateQuiz, { isSuccess: updated, isLoading: upLoading }] =
    useUpdateQuizMutation();

  const isMobile = useMediaQuery("(max-width: 50em)");
  const [formValue, setFormValue] = useState(
    data || {
      id: "",
      question: "",
      video_id: "",
      video_title: "",
      options: [],
    }
  );

  const formReset = () => {
    setFormValue({
      id: "",
      question: "",
      video_id: "",
      video_title: "",
      options: [],
    });
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFormValue(data);
    } else {
      formReset();
    }
  }, [data]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // select video from videos array
    setFormValue((preValue) => {
      if (name === "video") {
        const selectedVideo = JSON.parse(value);
        return {
          ...preValue,
          video_id: selectedVideo.id,
          video_title: selectedVideo.title,
        };
      }
      // add form values
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleOptionSubmit = (option) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      options: [...prevValue.options, option],
    }));
  };

  const removeOption = (option) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      options: prevValue.options.filter((item) => item.id != option.id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    if (!data?.id) {
      //add quiz
      addQuiz({
        ...formValue,
        id: Math.floor(new Date().getTime().toString()),
      });
    } else {
      //update quiz
      updateQuiz(formValue);
    }
  };

  useEffect(() => {
    if (added || updated) {
      formReset();
      setUpsertModalOpen(false);
    }
  }, [added, updated]);

  //videos comming from videos endpoint
  let videoOptions = null;
  if (videos?.length > 0) {
    videoOptions = videos?.map((video) => (
      <option
        key={video.id}
        value={JSON.stringify(video)}
        selected={formValue.video_id === video.id}
      >
        {video.title}
      </option>
    ));
  }

  return (
    <>
      <Modal
        opened={upsertModalOpen}
        onClose={() => setUpsertModalOpen(false)}
        withCloseButton
        size="auto"
        styles={{
          header: {
            background: "rgb(24, 49, 69)",
            borderBottom: "1px solid white",
          },
          body: { background: "rgb(24, 49, 69)" },
        }}
      >
        <form className="input__form" onSubmit={handleSubmit}>
          <h3 className="form__title"> {data?.id ? "Update" : " Add Quiz"}</h3>

          <div className="form__group">
            <FormField
              InputType="input"
              title="Question"
              name="question"
              value={formValue.question}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__group">
            <FormField
              InputType="select"
              title="Videos"
              name="video"
              value={formValue.description}
              onChange={handleChange}
              option={videoOptions}
              required
            />
          </div>

          {/* quiz options shows here */}
          <div className="form__group">
            {formValue?.options?.map((item) => (
              <div className="flex justify-between items-center gap-3 border-4 px-2 border-gray-300">
                <span className="text-lg font-semibold text-gray-500 w-10/12">
                  {item.option}
                </span>
                <span className="text-lg font-semibold text-gray-600  w-3/12 mr-2">
                  Is Correct: {item.isCorrect ? "Yes" : "No"}
                </span>
                <img
                  src={deleteIcon}
                  alt="delete option"
                  className="h-5 cursor-pointer w-auto"
                  onClick={() => removeOption(item)}
                />
              </div>
            ))}
          </div>

          {/* set quiz options  */}
          <div
            className="form__group flex  items-center gap-2 cursor-pointer"
            onClick={() => setQuizOptionModalOpen(true)}
          >
            <img src={addIcon} alt="add" className="h-6" />
            <span className="uppercase font-bold text-sm text-gray-500 hover:text-gray-700">
              Set Options
            </span>
          </div>

          <div className="center__button">
            <button
              className="btn form__submit__btn"
              type="submit"
              disabled={addLoading || upLoading}
            >
              {(addLoading || upLoading) && (
                <Loader
                  color="white"
                  size="lg"
                  variant="dots"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                />
              )}
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <SetQuizOption
        quizOptionModalOpen={quizOptionModalOpen}
        setQuizOptionModalOpen={setQuizOptionModalOpen}
        onSubmit={handleOptionSubmit}
      />
    </>
  );
};

export default UpsertQuizz;
