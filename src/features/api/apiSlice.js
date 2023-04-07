import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

// Define the apiSlice using createApi from reduxjs/toolkit

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },

  // An array of tag names to be used for data invalidation and re-fetching
  tagTypes: [
    "videos",
    "video",
    "assignments",
    "assignment",
    "quizzes",
    "quiz",
    "assignmentMarks",
    "filteredAssignmentMark",
    "quizMarks",
    "filteredQuizMark",
  ],

  // Define the endpoints
  endpoints: (builder) => ({}),
});
