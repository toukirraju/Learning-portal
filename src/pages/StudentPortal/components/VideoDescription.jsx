import React, { useState } from "react";
import AssignmentModal from "./modal/AssignmentModal";
import QuizModal from "./modal/QuizModal";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../../../redux/featuers/quizes/quizSlice";
import moment from "moment/moment";

const VideoDescription = ({
  video,
  assignments,
  submitedAssignments,
  quizes,
  submitedQuiz,
}) => {
  const dispatch = useDispatch();
  const { title, description, createdAt } = video || {};
  const { user } = useSelector((state) => state.auth);

  const [assignmentModal, setAssignmentModal] = useState(false);
  const [assignmentData, setAssignmentData] = useState({});

  const [quizModal, setQuizModal] = useState(false);
  const [quizData, setQuizData] = useState({});

  const handleAssignment = (data) => {
    setAssignmentModal(true);
    setAssignmentData(data);
  };
  const handleQuiz = (data) => {
    setQuizModal(true);
    setQuizData(data);
    dispatch(setQuestions(data));
  };

  // check student are already submited quiz or not
  function checkIfStudentAndVideoExist(dataArray, sid, vid) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].student_id === sid && dataArray[i].video_id === vid) {
        return true;
      }
    }
    return false;
  }

  // check student are already submited assignment or not
  function checkIfStudentAndAssignmentExist(dataArray, sid, aid) {
    for (let i = 0; i < dataArray.length; i++) {
      if (
        dataArray[i].student_id === sid &&
        dataArray[i].assignment_id === aid
      ) {
        return true;
      }
    }
    return false;
  }

  //decide what to render
  let assignment = null;
  if (assignments?.length > 0) {
    assignment = assignments.map((item, idx) => (
      <button
        key={idx}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary disabled:bg-cyan-900 disabled:hover:text-cyan-500 disabled:cursor-not-allowed"
        onClick={() => handleAssignment(item)}
        disabled={checkIfStudentAndAssignmentExist(
          submitedAssignments,
          user?.id,
          item.id
        )}
      >
        এসাইনমেন্ট {idx + 1}
      </button>
    ));
  }

  let quiz = null;
  if (quizes?.length > 0) {
    quiz = (
      <button
        onClick={() => handleQuiz(quizes)}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary  disabled:bg-cyan-900 disabled:hover:text-cyan-500 disabled:cursor-not-allowed"
        disabled={checkIfStudentAndVideoExist(submitedQuiz, user?.id, video.id)}
      >
        কুইজে অংশগ্রহণ করুন
      </button>
    );
  }
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {moment(createdAt).format("DD MMMM YYYY")}
      </h2>

      <div className="flex gap-4">
        {assignment}
        {quiz}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>

      <AssignmentModal
        assignmentModal={assignmentModal}
        setAssignmentModal={setAssignmentModal}
        data={assignmentData}
      />
      <QuizModal
        setQuizModal={setQuizModal}
        quizModal={quizModal}
        data={quizData}
      />
    </div>
  );
};

export default VideoDescription;
