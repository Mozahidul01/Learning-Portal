import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get assignments from the server
    getAssignments: builder.query({
      query: () => `/assignments`,
      providesTags: ["assignments"],
    }),

    // Endpoint for get a  assignment from the server
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, error, arg) => [{ type: "assignment", id: arg }],
    }),

    // Endpoint for get a  assignment for a video from the server
    getRelatedAssignment: builder.query({
      query: (vId) => `/assignments?video_id=${vId}`,
    }),

    // Endpoint for add assignment to the server
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: assignment } = await queryFulfilled;

          if (assignment?.id) {
            //update chaches pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(assignment);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for edit Assignment to the server
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, arg) => [
        "assignments",
        { type: "assignment", id: arg.id },
      ],
    }),

    // Endpoint for Delete Assignment from the server
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["assignments"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useGetRelatedAssignmentQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
