import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Playlists from "../components/Playlists";

const CoursePlayer = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          {/* video player  */}
          <VideoPlayer />
          {/* video Playlist  */}
          <Playlists />
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
