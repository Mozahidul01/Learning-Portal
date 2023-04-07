import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get quizzes from the server
    getQuizzes: builder.query({
      query: () => `/quizzes`,
      providesTags: ["quizzes"],
    }),

    // Endpoint for get a quiz from the server
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,

      providesTags: (result, error, arg) => [{ type: "quiz", id: arg }],
    }),

    // Endpoint for get a quiz for a video from the server
    getRelatedQuiz: builder.query({
      query: (vId) => `/quizzes?video_id=${vId}`,
    }),

    // Endpoint for add Quiz to the server
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: quiz } = await queryFulfilled;

          if (quiz?.id) {
            //update chaches pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(quiz);
                }
              )
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for edit Quiz to the server
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, arg) => [
        "quizzes",
        { type: "quiz", id: arg.id },
      ],
    }),

    // Endpoint for add Quiz to the server
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quizzes"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useGetRelatedQuizQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
