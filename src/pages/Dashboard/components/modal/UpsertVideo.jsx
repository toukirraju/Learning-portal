import { Loader, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import FormField from "../UI/FormField";
import {
  useAddVideoMutation,
  useUpdateVideoMutation,
} from "../../../../redux/featuers/videos/videosApi";

const UpsertVideo = ({ upsertModalOpen, setUpsertModalOpen, data }) => {
  const [addVideo, { isSuccess: added, isLoading: addLoading }] =
    useAddVideoMutation();
  const [updateVideo, { isSuccess: updated, isLoading: upLoading }] =
    useUpdateVideoMutation();

  const [formValue, setFormValue] = useState(
    data || {
      id: "",
      title: "",
      description: "",
      url: "",
      views: "",
      duration: "",
      createdAt: "",
    }
  );
  const formReset = () => {
    setFormValue({
      id: "",
      title: "",
      description: "",
      url: "",
      views: "",
      duration: "",
      createdAt: "",
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
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.id) {
      //add video
      addVideo({
        ...formValue,
        id: Math.floor(new Date().getTime().toString()),
        createdAt: new Date(),
      });
    } else {
      //update video
      updateVideo(formValue);
    }
  };

  useEffect(() => {
    if (added || updated) {
      formReset();
      setUpsertModalOpen(false);
    }
  }, [added, updated]);

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
        <h3 className="form__title"> {data?.id ? "Update" : " Add Videos"}</h3>

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
            InputType="textarea"
            title="Description"
            name="description"
            value={formValue.description}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
          <FormField
            InputType="input"
            title="Url"
            name="url"
            value={formValue.url}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- double input in a row start --> */}
        <div className="form__group__double">
          <FormField
            InputType="input"
            title="Views"
            name="views"
            value={formValue.views}
            onChange={handleChange}
            required
          />
          <FormField
            InputType="input"
            title="Duration"
            name="duration"
            value={formValue.duration}
            onChange={handleChange}
            required
          />
        </div>
        {/* <!-- double input in a row end --> */}

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

export default UpsertVideo;
