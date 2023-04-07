import { apiSlice } from "../api/apiSlice";

export const assignmentMarkssApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get assignmentMarks from the server
    getAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,
      providesTags: ["assignmentMarks"],
    }),

    // Endpoint for get assignmentMarks for a video from the server
    getFilteredAssignmentMarks: builder.query({
      query: ({ sId, aId }) =>
        `/assignmentMark?student_id=${sId}&assignment_id=${aId}`,
      providesTags: ["filteredAssignmentMark"],
    }),

    // Endpoint for add assignmentMark to the server
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["filteredAssignmentMark"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: assignmentMark } = await queryFulfilled;

          if (assignmentMark?.id) {
            //update chaches pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
                undefined,
                (draft) => {
                  draft.push(assignmentMark);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for edit AssignmentMark to the server
    editAssignmentMarks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["assignmentMarks"],
    }),
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useGetFilteredAssignmentMarksQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarksMutation,
} = assignmentMarkssApi;
