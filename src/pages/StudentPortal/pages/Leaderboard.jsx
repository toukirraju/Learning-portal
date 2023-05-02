import React from "react";
import Table from "../../../components/Table";
import { useSelector } from "react-redux";
import { useFetchSubmitedQuizesQuery } from "../../../redux/featuers/quizes/quizApi";
import { useFetchSubmitedAssignmentsQuery } from "../../../redux/featuers/assignments/assignmentApi";
import { calculateLeaderBoardMarks } from "../../../utility/calculateLeaderBoardMark";

const Leaderboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: submitedQuiz, isLoading: submitedQuizLoading } =
    useFetchSubmitedQuizesQuery();

  const { data: submitedAssignments, isLoading: submitedAssLoading } =
    useFetchSubmitedAssignmentsQuery();

  const headers = [
    {
      header: "Rank",
      rowField: "rank",
    },
    {
      header: "Name",
      rowField: "student_name",
    },
    {
      header: "Quiz Mark",
      rowField: "quizMark",
    },
    {
      header: "Assignment Mark",
      rowField: "assignmentMark",
    },
    {
      header: "Total",
      rowField: "total",
    },
  ];

  let leaderBoardTable = null;
  let ownInfo = null;
  if (!submitedQuizLoading && !submitedAssLoading) {
    leaderBoardTable = (
      <Table
        headers={headers}
        // rowData={calculateLeaderBoardMarks(submitedQuiz, submitedAssignments)}
        rowData={calculateLeaderBoardMarks(
          submitedQuiz,
          submitedAssignments
        ).filter((item) => item.rank <= 20)}
      />
    );
    ownInfo = (
      <Table
        headers={headers}
        rowData={[
          calculateLeaderBoardMarks(submitedQuiz, submitedAssignments).find(
            (item) => item.student_id == user?.id
          )
            ? calculateLeaderBoardMarks(submitedQuiz, submitedAssignments).find(
                (item) => item.student_id == user?.id
              )
            : [],
        ]}
      />
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>

          <div className="text-base w-full h-auto overflow-y-scroll border border-slate-600/50 rounded-md my-4">
            {ownInfo}
          </div>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <div className="text-base w-full border h-96 overflow-y-scroll border-slate-600/50 rounded-md my-4">
            {leaderBoardTable}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
