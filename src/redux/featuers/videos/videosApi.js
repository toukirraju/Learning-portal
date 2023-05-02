import apiSlice from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch all videos
    fetchVideos: builder.query({
      query: () => "/videos",
    }),
    //add video
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        //update videos pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData("fetchVideos", undefined, (draft) => {
              return [...draft, data];
            })
          );
        }
        //update videos pessimistically end
      },
    }),
    //update video
    updateVideo: builder.mutation({
      query: (data) => ({
        url: `/videos/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data: updatedVideo } = await queryFulfilled;
        //update video pessimistically start
        // console.log(JSON.stringify(data:updatedVideo));
        if (updatedVideo) {
          dispatch(
            apiSlice.util.updateQueryData("fetchVideos", undefined, (draft) => {
              const newVideosArray = draft.map((video) => {
                if (video.id == updatedVideo.id) {
                  return {
                    ...updatedVideo,
                  };
                }
                return video;
              });
              return newVideosArray;
            })
          );
        }

        //update video pessimistically end
      },
    }),

    //delete video
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;
        //delete video pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData("fetchVideos", undefined, (draft) => {
              const newVideosArray = draft.filter((video) => video.id != arg);
              return newVideosArray;
            })
          );
        }
        //delete video pessimistically end
      },
    }),

    //fetch single video
    fetchSingleVideo: builder.query({
      query: (id) => {
        return {
          url: `/videos?id=${id}`,
        };
      },
    }),
  }),
});

export const {
  useFetchVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useFetchSingleVideoQuery,
} = videosApi;
