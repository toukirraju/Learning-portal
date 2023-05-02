import { Loader, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import FormField from "../UI/FormField";
import {
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
} from "../../../../redux/featuers/assignments/assignmentApi";
import { useFetchVideosQuery } from "../../../../redux/featuers/videos/videosApi";

const UpsertAssignment = ({ upsertModalOpen, setUpsertModalOpen, data }) => {
  const { data: videos } = useFetchVideosQuery();
  const [addAssignment, { isSuccess: added, isLoading: addLoading }] =
    useAddAssignmentMutation();
  const [updateAssignment, { isSuccess: updated, isLoading: upLoading }] =
    useUpdateAssignmentMutation();

  const [formValue, setFormValue] = useState(
    data || {
      id: "",
      title: "",
      video_id: "",
      video_title: "",
      totalMark: 0,
    }
  );

  const formReset = () => {
    setFormValue({
      id: "",
      title: "",
      video_id: "",
      video_title: "",
      totalMark: 0,
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

    setFormValue((preValue) => {
      if (name === "video") {
        const selectedVideo = JSON.parse(value);
        return {
          ...preValue,
          video_id: selectedVideo.id,
          video_title: selectedVideo.title,
        };
      }
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.id) {
      //add assignment
      addAssignment({
        ...formValue,
        id: Math.floor(new Date().getTime().toString()),
      });
    } else {
      //update assignment
      updateAssignment(formValue);
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
    <Modal
      opened={upsertModalOpen}
      onClose={() => setUpsertModalOpen(false)}
      withCloseButton={false}
      size="md"
      styles={{
        header: {
          background: "rgb(24, 49, 69)",
          borderBottom: "1px solid white",
        },
        body: { background: "rgb(24, 49, 69)" },
      }}
    >
      <form className="input__form" onSubmit={handleSubmit}>
        <h3 className="form__title">
          {" "}
          {data?.id ? "Update" : " Add Assignment"}
        </h3>

        <div className="form__group">
          <FormField
            InputType="input"
            title="Title"
            name="title"
            value={formValue.title}
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

        <div className="form__group">
          <FormField
            InputType="input"
            type="number"
            title="Mark"
            name="totalMark"
            value={formValue.totalMark}
            onChange={handleChange}
            required
          />
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
  );
};

export default UpsertAssignment;
