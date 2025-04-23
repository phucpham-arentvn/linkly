import { createApi } from "@reduxjs/toolkit/query/react";
import { httpQuery } from "@/lib/httpQuery";
import { API_DEFAULT_VALUES, API_PATHS, API_TAGS } from "@/constants/api";

export interface Linkly {
  id: string;
  short_link: string;
  origin_link: string;
  clicks: number;
  status: string;
  created_at: string;
  updated_at: string;
  icon?: string;
  user_id: string;
}

export interface GetLinklyResponse {
  data: Linkly[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetLinklyRequest {
  page?: number;
  limit?: number;
}

export interface CreateLinklyRequest {
  url: string;
}

export interface CreateLinklyResponse {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
}

export interface UpdateLinklyRequest {
  shortCode: string;
  url: string;
  status?: string;
}

export interface UpdateLinklyResponse {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  icon?: string;
}

export interface DeleteLinklyResponse {
  message: string;
  id: string;
  shortCode: string;
}

export const linklyApi = createApi({
  reducerPath: "linklyApi",
  baseQuery: httpQuery(),
  tagTypes: [API_TAGS.LINKLY],
  endpoints: (builder) => ({
    getLinkly: builder.query<GetLinklyResponse, GetLinklyRequest>({
      query: ({
        page = API_DEFAULT_VALUES.PAGE,
        limit = API_DEFAULT_VALUES.LIMIT,
      } = {}) => ({
        url: API_PATHS.LINKLY.LIST,
        method: "get",
        params: {
          page: page.toString(),
          limit: limit.toString(),
        },
      }),
      providesTags: [API_TAGS.LINKLY],
    }),
    createLinkly: builder.mutation<CreateLinklyResponse, CreateLinklyRequest>({
      query: (data) => ({
        url: API_PATHS.LINKLY.CREATE,
        method: "post",
        data,
      }),
      invalidatesTags: [API_TAGS.LINKLY],
    }),
    updateLinkly: builder.mutation<UpdateLinklyResponse, UpdateLinklyRequest>({
      query: (data) => ({
        url: API_PATHS.LINKLY.UPDATE,
        method: "put",
        data,
      }),
      invalidatesTags: [API_TAGS.LINKLY],
    }),
    deleteLinkly: builder.mutation<DeleteLinklyResponse, string>({
      query: (id) => ({
        url: API_PATHS.LINKLY.DELETE,
        method: "delete",
        params: { id },
      }),
      invalidatesTags: [API_TAGS.LINKLY],
    }),
  }),
});

export const {
  useGetLinklyQuery,
  useCreateLinklyMutation,
  useUpdateLinklyMutation,
  useDeleteLinklyMutation,
} = linklyApi;
