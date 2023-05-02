import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:9000",
  baseUrl: "https://learning-portal-server-production.up.railway.app",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      api.dispatch(adminLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  endpoints: (builder) => ({}),
});

export default apiSlice;
