import React, { useState } from "react";
import Table from "../../../components/Table";
import AssignmentStatus from "../components/UI/AssignmentStatus";
import TableLoader from "../../../components/loader/TableLoader";
import ErrorMessage from "../../../components/ErrorMessage";
import { useSelector } from "react-redux";
import { useFetchSubmitedAssignmentsQuery } from "../../../redux/featuers/assignments/assignmentApi";
import moment from "moment";
import ConfirmationPopup from "../../../components/ConfirmationPopup";

const AssignmentMark = () => {
  const {
    data: submitedAssignments,
    isLoading,
    isError,
  } = useFetchSubmitedAssignmentsQuery();

  const { status } = useSelector((state) => state.filter);

  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [confirmation, setConfirmation] = useState({
    data: "",
    popupType: "",
    popupMessage: "",
  });

  //assignment mark submit
  const submitMark = (event, data, mark) => {
    event.preventDefault();
    if (isNaN(mark)) {
      alert("Please enter a valid number for the mark");
      return;
    }

    setConfirmationPopup(true);
    setConfirmation({
      data: {
        ...data,
        mark: Number(mark),
        status: "published",
      },
      popupType: "assignmentMark",
      popupMessage:
        "Important! Once marks are submitted, it cannot be changed. Please review before submitting.",
    });
  };

  const headers = [
    {
      header: "Assignment",
      rowField: "title",
    },
    {
      header: "Date",
      rowField: (row) => <>{moment(row.createdAt).format("DD MMMM YYYY")}</>,
    },
    {
      header: "Student Name",
      rowField: "student_name",
    },
    {
      header: "Repo Link",
      rowField: "repo_link",
    },
    {
      header: "Mark",
      rowField: (row, mark, handleChangeMark) => (
        <>
          {row?.status === "pending" ? (
            <div className="input-mark">
              <form onSubmit={(event) => submitMark(event, row, mark)}>
                <input
                  type="number"
                  pattern={`[0-9]{1,3}|${row.totalMark}`}
                  max={row.totalMark}
                  defaultValue={row.totalMark}
                  value={mark || row.mark}
                  onChange={(e) => handleChangeMark(e, row)}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(`Max value is: ${row.totalMark}`)
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
                <button>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                    // onClick={(event) => submitMark(event, row)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <>{row.mark}</>
          )}
        </>
      ),
    },
  ];

  //decide what to render
  let content = null;

  if (isLoading && !isError) {
    content = <TableLoader headers={headers} />;
  }

  if (!isLoading && isError) {
    content = (
      <ErrorMessage
        message={"There is an error occord! Please try again later!"}
      />
    );
  }
  if (!isLoading && !isError && submitedAssignments?.length === 0) {
    content = <ErrorMessage message={"No assignment found"} />;
  }

  // filter assignment by status
  const filterStatus = (status, assignments) => {
    if (status) {
      return assignments.filter((assignment) => assignment.status === status);
    }
    return assignments;
  };

  // render with filtered assignment
  const renderFilterdAssignmentTable = (assignments) => {
    return <Table headers={headers} rowData={assignments} />;
  };

  if (!isLoading && !isError && submitedAssignments?.length > 0) {
    const filterdAssignments = filterStatus(status, submitedAssignments);

    content = renderFilterdAssignmentTable(filterdAssignments);
  }

  //count all status from submited assignments
  const assignmetStatus = submitedAssignments?.reduce(
    (acc, curr) => {
      // Increment the total count
      acc.total++;

      // Check the status and increment the corresponding count
      if (curr.status === "pending") {
        acc.pending++;
      } else if (curr.status === "published") {
        acc.published++;
      }

      return acc;
    },
    { total: 0, pending: 0, published: 0 }
  );

  return (
    <section className="py-6 bg-primary h-[calc(100vh-65px)] overflow-y-hidden ">
      <div className="mx-auto h-fit max-w-full px-5 lg:px-20">
        <div className="bg-opacity-10 relative">
          <AssignmentStatus data={assignmetStatus} />
          <div className="h-[33rem] overflow-x-auto overflow-y-scroll mt-4">
            {content}
          </div>
        </div>
      </div>
      <ConfirmationPopup
        confirmationPopup={confirmationPopup}
        setConfirmationPopup={setConfirmationPopup}
        confirmation={confirmation}
      />
    </section>
  );
};

export default AssignmentMark;
