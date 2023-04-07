import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get all quizMarks from the server
    getQuizzesMarks: builder.query({
      query: () => `/quizMark`,
      providesTags: ["quizMarks"],
    }),

    // Endpoint for get quizMark for a student from the server
    getFilteredQuizMark: builder.query({
      query: ({ sId, vId }) => `/quizMark?student_id=${sId}&video_id=${vId}`,
      providesTags: ["filteredQuizMark"],
    }),

    // Endpoint for add QuizMark to the server
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["filteredQuizMark"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: quizMark } = await queryFulfilled;

          if (quizMark?.id) {
            //update chaches pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzesMarks",
                undefined,
                (draft) => {
                  draft.push(quizMark);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesMarksQuery,
  useGetFilteredQuizMarkQuery,
  useAddQuizMarkMutation,
} = quizMarkApi;
