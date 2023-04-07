import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get videos from the server
    getVideos: builder.query({
      query: () => `/videos`,

      providesTags: ["videos"],
    }),

    // Endpoint for get a single video from the server
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,

      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),

    // Endpoint for add video to the server
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: video } = await queryFulfilled;

          if (video?.id) {
            //update chaches pessimistically
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(video);
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),

    // Endpoint for edit video to the server
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.id },
      ],
    }),

    // Endpoint for Delete Video from the server
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
