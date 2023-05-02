import React, { useState } from "react";
import Table from "../../../components/Table";
import UpsertAssignment from "../components/modal/UpsertAssignment";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import TableLoader from "../../../components/loader/TableLoader";
import { useFetchAssignmentsQuery } from "../../../redux/featuers/assignments/assignmentApi";
import ErrorMessage from "../../../components/ErrorMessage";

const Assignment = () => {
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [upsertModalOpen, setUpsertModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({
    data: "",
    popupType: "",
    popupMessage: "",
  });
  const [editedData, setEditedData] = useState({});

  const { data: assignments, isLoading, isError } = useFetchAssignmentsQuery();

  const handleEdit = (data) => {
    setUpsertModalOpen(true);
    setEditedData(data);
  };

  const handleAdd = () => {
    setUpsertModalOpen(true);
    setEditedData({});
  };

  const handleDelete = (id) => {
    setConfirmationPopup(true);
    setConfirmation({
      data: id,
      popupType: "deleteAssignment",
      popupMessage: "Are you sure you want to delete this Assignment?",
    });
  };

  const headers = [
    {
      header: "Title",
      rowField: "title",
    },
    {
      header: "Video Title",
      rowField: "video_title",
    },
    {
      header: "Mark",
      rowField: "totalMark",
    },
    {
      header: "Action",
      rowField: (row) => (
        <div className="flex gap-x-2">
          <button onClick={() => handleDelete(row.id)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button onClick={() => handleEdit(row)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
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
  if (!isLoading && !isError && assignments?.length === 0) {
    content = <ErrorMessage message={"No assignment found"} />;
  }

  if (!isLoading && !isError && assignments?.length > 0) {
    content = <Table headers={headers} rowData={assignments} />;
  }

  return (
    <section className="py-6 bg-primary h-[calc(100vh-65px)] overflow-y-hidden">
      <div className="mx-auto h-fit max-w-full px-5 lg:px-20">
        <div className="bg-opacity-10 relative">
          <div className="w-full flex">
            <button className="btn ml-auto" onClick={handleAdd}>
              Add Assignment
            </button>
          </div>
          <div className="h-[33rem] overflow-x-auto overflow-y-scroll mt-4">
            {content}
          </div>
        </div>
      </div>
      <UpsertAssignment
        upsertModalOpen={upsertModalOpen}
        setUpsertModalOpen={setUpsertModalOpen}
        data={editedData}
      />
      <ConfirmationPopup
        confirmationPopup={confirmationPopup}
        setConfirmationPopup={setConfirmationPopup}
        confirmation={confirmation}
      />
    </section>
  );
};

export default Assignment;
