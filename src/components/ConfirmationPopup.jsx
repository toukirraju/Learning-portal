import { Loader, Modal } from "@mantine/core";
import deleteIcon from "../assets/image/deleteIcon2.png";
import confirmationIcon from "../assets/image/confirm.png";
import { useDeleteVideoMutation } from "../redux/featuers/videos/videosApi";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMarkMutation,
} from "../redux/featuers/assignments/assignmentApi";
import {
  useDeleteQuizMutation,
  useSubmitQuizMutation,
} from "../redux/featuers/quizes/quizApi";
import { useNavigate } from "react-router-dom";

const ConfirmationPopup = ({
  confirmationPopup,
  setConfirmationPopup,
  confirmation,
}) => {
  const navigate = useNavigate();
  //delete video mutation
  const [
    deleteVideo,
    { isSuccess: videoDeleted, isLoading: videoLoading, isError: videoError },
  ] = useDeleteVideoMutation();
  //delete assignment mutation
  const [
    deleteAssignment,
    {
      isSuccess: assignmentDeleted,
      isLoading: assignmentLoading,
      isError: assignmentError,
    },
  ] = useDeleteAssignmentMutation();
  //delete quiz mutation
  const [
    deleteQuiz,
    { isSuccess: quizDeleted, isLoading: quizLoading, isError: quizError },
  ] = useDeleteQuizMutation();

  // submit quiz mutation
  const [
    submitQuiz,
    {
      isSuccess: quizSubmited,
      isLoading: quizSubmitLoading,
      isError: quizSubmitError,
    },
  ] = useSubmitQuizMutation();
  // submit assignment mark mutation
  const [
    updateAssignmentMark,
    {
      isSuccess: assMarkSubmited,
      isLoading: assMarkSubmitLoading,
      isError: assMarkSubmitError,
    },
  ] = useUpdateAssignmentMarkMutation();

  const handleSubmit = (type) => {
    switch (type) {
      case "deleteVideo":
        deleteVideo(confirmation.data);
        break;

      case "deleteAssignment":
        deleteAssignment(confirmation.data);
        break;
      case "deleteQuiz":
        deleteQuiz(confirmation.data);
        break;

      case "quizSubmit":
        submitQuiz(confirmation.data);
        break;

      case "assignmentMark":
        updateAssignmentMark(confirmation.data);
        // submitQuiz(confirmation.data);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (
      videoDeleted ||
      assignmentDeleted ||
      quizDeleted ||
      quizSubmited ||
      assMarkSubmited
    ) {
      setConfirmationPopup(false);
    }
  }, [
    videoDeleted,
    assignmentDeleted,
    quizDeleted,
    quizSubmited,
    assMarkSubmited,
  ]);

  useEffect(() => {
    if (quizSubmited) {
      navigate("/leaderboard");
    }
  }, [quizSubmited]);

  return (
    <Modal
      opened={confirmationPopup}
      onClose={() => setConfirmationPopup(false)}
      withCloseButton={false}
    >
      {(videoError ||
        assignmentError ||
        quizError ||
        quizSubmitError ||
        assMarkSubmitError) && (
        <ErrorMessage
          message={`Somthing want wrong with ${
            quizSubmitError || assMarkSubmitError ? "Submiting" : "deletion"
          }!`}
        />
      )}
      <div className="flex flex-col justify-center items-center gap-5 ">
        {confirmation.popupType === "quizSubmit" ||
        confirmation.popupType === "assignmentMark" ? (
          <img src={confirmationIcon} alt="confirmIcon" className="w-20" />
        ) : (
          <img src={deleteIcon} alt="DeleteIcon" className="w-20" />
        )}

        <div className="flex flex-col justify-center items-center gap-3">
          <span className="text-2xl font-extrabold text-gray-700">
            Are you sure?
          </span>
          <span className="text-lg font-semibold text-gray-500">
            {confirmation.popupMessage}
          </span>
          <div className="flex  justify-center items-center gap-3">
            <button
              className="bg-slate-400 py-2 px-3 rounded text-white hover:bg-blue-400 ease-out duration-100"
              onClick={() => setConfirmationPopup(false)}
            >
              Cancel
            </button>
            <button
              className={`${
                confirmation.popupType === "quizSubmit" ||
                confirmation.popupType === "assignmentMark"
                  ? "bg-cyan-400 hover:bg-cyan-300"
                  : "bg-red-400 hover:bg-red-500"
              } relative py-2 px-3 rounded text-white   ease-out duration-100 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:bg-slate-300`}
              onClick={() => handleSubmit(confirmation.popupType)}
              disabled={
                videoLoading ||
                assignmentLoading ||
                quizLoading ||
                quizSubmitLoading ||
                assMarkSubmitLoading
              }
            >
              {(videoLoading ||
                assignmentLoading ||
                quizLoading ||
                quizSubmitLoading ||
                assMarkSubmitLoading) && (
                <Loader
                  color="gray"
                  size="lg"
                  variant="dots"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                />
              )}
              {confirmation.popupType === "quizSubmit" ||
              confirmation.popupType === "assignmentMark"
                ? "Submit"
                : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationPopup;
