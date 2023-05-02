import apiSlice from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch all assignments
    fetchAssignments: builder.query({
      query: () => "/assignments",
    }),
    //add assignment
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        //update assignments pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchAssignments",
              undefined,
              (draft) => {
                return [...draft, data];
              }
            )
          );
        }
        //update assignments pessimistically end
      },
    }),
    //update assignment
    updateAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data: updatedAssignment } = await queryFulfilled;
        //update assignment pessimistically start
        if (updatedAssignment) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchAssignments",
              undefined,
              (draft) => {
                const newAssignmentsArray = draft.map((assignment) => {
                  if (assignment.id == updatedAssignment.id) {
                    return {
                      ...updatedAssignment,
                    };
                  }
                  return assignment;
                });
                return newAssignmentsArray;
              }
            )
          );
        }

        //update assignment pessimistically end
      },
    }),

    //delete assignment
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;
        //delete assignment pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchAssignments",
              undefined,
              (draft) => {
                const newAssignmentsArray = draft.filter(
                  (assignment) => assignment.id != arg
                );
                return newAssignmentsArray;
              }
            )
          );
        }
        //delete assignment pessimistically end
      },
    }),

    //fetch all submited assignments
    fetchSubmitedAssignments: builder.query({
      query: () => "/assignmentMark",
    }),
    //update assignment Mark
    updateAssignmentMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "fetchSubmitedAssignments",
            undefined,
            (draft) => {
              const draftAssignment = draft.find(
                (assignment) => assignment.id == args.id
              );
              (draftAssignment.mark = args.mark),
                (draftAssignment.status = args.status);
            }
          )
        );
        // optimistic cache update end

        try {
          const { data: updatedAssignment } = await queryFulfilled;
          //update assignment pessimistically start
          if (updatedAssignment) {
            dispatch(
              apiSlice.util.updateQueryData(
                "fetchSubmitedAssignments",
                undefined,
                (draft) => {
                  const newAssignmentsArray = draft.map((assignment) => {
                    if (assignment.id == updatedAssignment.id) {
                      return {
                        ...updatedAssignment,
                      };
                    }
                    return assignment;
                  });
                  return newAssignmentsArray;
                }
              )
            );
          }

          //update assignment pessimistically end
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    //fetch single video Assignment
    fetchSingleAssignment: builder.query({
      query: (video_id) => {
        return {
          url: `/assignments?video_id=${video_id}`,
        };
      },
    }),

    //submit assignment
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        //update assignments pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchSubmitedAssignments",
              undefined,
              (draft) => {
                return [...draft, data];
              }
            )
          );
        }
        //update assignments pessimistically end
      },
    }),
  }),
});

export const {
  useFetchAssignmentsQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useFetchSubmitedAssignmentsQuery,
  useUpdateAssignmentMarkMutation,
  useFetchSingleAssignmentQuery,
  useSubmitAssignmentMutation,
} = assignmentApi;
