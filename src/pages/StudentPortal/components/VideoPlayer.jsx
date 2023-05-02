import React from "react";
import Player from "./Player";
import { useFetchSingleVideoQuery } from "../../../redux/featuers/videos/videosApi";
import VideoDescription from "./VideoDescription";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  useFetchSingleAssignmentQuery,
  useFetchSubmitedAssignmentsQuery,
} from "../../../redux/featuers/assignments/assignmentApi";
import {
  useFetchSingleQuizQuery,
  useFetchSubmitedQuizesQuery,
} from "../../../redux/featuers/quizes/quizApi";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  // const { videoId } = useSelector((state) => state.video);
  const { videoId } = useParams();

  const {
    data: singleVideo,
    isLoading,
    isError,
  } = useFetchSingleVideoQuery(videoId);

  const { data: assignments } = useFetchSingleAssignmentQuery(videoId);

  const { data: quizes } = useFetchSingleQuizQuery(videoId);

  const { data: submitedAssignments, isLoading: submitedAssLoading } =
    useFetchSubmitedAssignmentsQuery();

  const { data: submitedQuiz, isLoading: submitedQuizLoading } =
    useFetchSubmitedQuizesQuery();

  //   console.log(singleVideo);
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
  if (!isLoading && !isError && !singleVideo?.length === 0) {
    content = <ErrorMessage message={"video not found"} />;
  }

  if (
    !isLoading &&
    !submitedAssLoading &&
    !submitedQuizLoading &&
    !isError &&
    singleVideo?.length > 0
  ) {
    content = (
      <>
        <Player video={singleVideo[0]} />
        <VideoDescription
          video={singleVideo[0]}
          assignments={assignments}
          submitedAssignments={submitedAssignments}
          quizes={quizes}
          submitedQuiz={submitedQuiz}
        />
      </>
    );
  }

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2 relative">
      {/* <VideoDescription /> */}
      {content}
    </div>
  );
};

export default VideoPlayer;
