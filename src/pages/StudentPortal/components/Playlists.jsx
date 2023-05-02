import React from "react";
import Video from "./Video";
import { useFetchVideosQuery } from "../../../redux/featuers/videos/videosApi";
import ErrorMessage from "../../../components/ErrorMessage";

const Playlists = () => {
  const { data: videos, isLoading, isError } = useFetchVideosQuery();

  //decide what to render
  let content = null;

  if (isLoading && !isError) {
    content = <h1>Loading...</h1>;
  }

  if (!isLoading && isError) {
    content = (
      <ErrorMessage
        message={"There is an error occord! Please try again later!"}
      />
    );
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <ErrorMessage message={"Empty playlist"} />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video video={video} />);
  }

  return (
    <div className="col-span-full lg:col-auto h-screen max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 relative">
      {content}
    </div>
  );
};

export default Playlists;
