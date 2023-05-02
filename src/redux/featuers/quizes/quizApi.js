import apiSlice from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch all quizzes
    fetchQuizes: builder.query({
      query: () => "/quizzes",
    }),
    //add quizze
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        //update quizz pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData("fetchQuizes", undefined, (draft) => {
              return [...draft, data];
            })
          );
        }
        //update quizzes pessimistically end
      },
    }),
    //update quizze
    updateQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data: updatedQuiz } = await queryFulfilled;
        //update quizze pessimistically start
        if (updatedQuiz) {
          dispatch(
            apiSlice.util.updateQueryData("fetchQuizes", undefined, (draft) => {
              const newQuizArray = draft.map((quizze) => {
                if (quizze.id == updatedQuiz.id) {
                  return {
                    ...updatedQuiz,
                  };
                }
                return quizze;
              });
              return newQuizArray;
            })
          );
        }

        //update quizze pessimistically end
      },
    }),

    //delete quizze
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;
        //delete quizze pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData("fetchQuizes", undefined, (draft) => {
              const newQuizArray = draft.filter((quizze) => quizze.id != arg);
              return newQuizArray;
            })
          );
        }
        //delete quizze pessimistically end
      },
    }),

    //fetch single video quiz
    fetchSingleQuiz: builder.query({
      query: (video_id) => {
        return {
          url: `/quizzes?video_id=${video_id}`,
        };
      },
    }),

    //fetch all submited quizes
    fetchSubmitedQuizes: builder.query({
      query: () => "/quizMark",
    }),

    //submit quiz
    submitQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        //update quizz pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchSubmitedQuizes",
              undefined,
              (draft) => {
                return [...draft, data];
              }
            )
          );
        }
        //update quizzes pessimistically end
      },
    }),
  }),
});

export const {
  useFetchQuizesQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useFetchSingleQuizQuery,
  useSubmitQuizMutation,
  useFetchSubmitedQuizesQuery,
} = quizApi;
