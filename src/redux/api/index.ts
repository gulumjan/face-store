import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQueryMyApi = fetchBaseQuery({
  baseUrl: "https://face-store-three.vercel.app/",
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  return baseQueryMyApi(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["fake", "auth", "myapi", "favourites", "basket"],
  endpoints: () => ({}),
});
