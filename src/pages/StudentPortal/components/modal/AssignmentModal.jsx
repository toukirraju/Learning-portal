import { Loader, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import FormField from "../../../Dashboard/components/UI/FormField";
import { useSelector } from "react-redux";
import { useSubmitAssignmentMutation } from "../../../../redux/featuers/assignments/assignmentApi";

const AssignmentModal = ({ assignmentModal, setAssignmentModal, data }) => {
  const { user } = useSelector((state) => state.auth);
  const [submitAssignment, { isLoading, isSuccess }] =
    useSubmitAssignmentMutation();
  const [formData, setFormData] = useState({
    id: "",
    student_id: "",
    student_name: "",
    assignment_id: "",
    title: "",
    createdAt: "",
    totalMark: 0,
    mark: "0",
    repo_link: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAssignment({
      ...formData,
      id: Math.floor(new Date().getTime().toString()),
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        id: "",
        student_id: "",
        student_name: "",
        assignment_id: "",
        title: "",
        createdAt: "",
        totalMark: 0,
        mark: "0",
        repo_link: "",
        status: "pending",
      });
      setAssignmentModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data?.id && user?.id) {
      setFormData({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: data?.id,
        title: data?.title,
        totalMark: data?.totalMark,
        repo_link: "",
        status: "pending",
      });
    }
  }, [data?.id, user?.id]);

  return (
    <Modal
      opened={assignmentModal}
      onClose={() => setAssignmentModal(false)}
      title
      withCloseButton
      styles={{
        body: { background: "rgb(24, 49, 69)", borderRadius: "10px" },
      }}
      classNames={{
        content: `modal__Body`,
        header: `modal__Body`,
        title: `modal__title`,
        close: `modal__close`,
      }}
    >
      <form className="input__form" onSubmit={handleSubmit}>
        <h3 className="form__title mt-5">Assignment Submission</h3>

        <div className="form__group">
          <FormField
            InputType="input"
            title="Repositories Link"
            name="repo_link"
            value={formData.repo_link}
            onChange={handleChange}
            required
          />
        </div>

        <div className="center__button">
          <button
            className="btn form__submit__btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
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
  );
};

export default AssignmentModal;
