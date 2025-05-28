import { Manager, Tenant } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { createNewUserInDatabase } from "@/lib/utils";
import { updateTenant } from "../../server/src/controllers/tenantControllers";

type UserRole = "manager" | "tenant";

type ExtendedManager = Manager & { image?: string };
type ExtendedTenant = Tenant & { image?: string };

type User = {
  cognitoInfo: {
    username: string;
    userId: string;
    signInDetails?: any;
  };
  userInfo: ExtendedManager | ExtendedTenant;
  userRole: UserRole;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      try {
        const session = await fetchAuthSession();
        const { idToken } = session.tokens ?? {};

        if (idToken) {
          headers.set("Authorization", `Bearer ${idToken}`);
        }
      } catch (error) {
        console.warn("No session found when preparing headers:", error);
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Managers", "Tenants"],

  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};

          // Nếu không có token thì không tiếp tục
          if (!idToken) {
            return {
              error: {
                status: 401,
                statusText: "Unauthorized",
                data: "No valid ID token found",
              },
            };
          }

          let user;
          try {
            user = await getCurrentUser();
          } catch (err) {
            return {
              error: {
                status: 401,
                statusText: "Unauthorized",
                data: "User not authenticated",
              },
            };
          }

          const userRole = idToken.payload["custom:role"] as UserRole;
          const userId = user.userId;

          const endpoint =
            userRole === "manager"
              ? `/managers/${userId}`
              : `/tenants/${userId}`;

          let userDetailsResponse = await fetchWithBQ(endpoint);

          // Nếu chưa có trong DB, tạo mới
          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              userRole,
              fetchWithBQ
            );
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as ExtendedManager | ExtendedTenant,
              userRole,
            },
          };
        } catch (error) {
          console.error("Error fetching user details:", error);
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: error,
            },
          };
        }
      },
    }),

    updateTenantSettings: build.mutation<Tenant, {cognitoId: string} & Partial<Tenant>>({
      query: ({cognitoId, ...updatedTenant }) => ({
        url: `tenants/${cognitoId}`,
        method: "PUT",
        body: updatedTenant,
      }),
      invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }],
    }),

    updateMManagerSettings: build.mutation<Manager, {cognitoId: string} & Partial<Manager>>({
      query: ({cognitoId, ...updatedManager }) => ({
        url: `managers/${cognitoId}`,
        method: "PUT",
        body: updatedManager,
      }),
      invalidatesTags: (result) => [{ type: "Managers", id: result?.id }],
    }),

  }),
});

export const { useGetAuthUserQuery, useUpdateTenantSettingsMutation, useUpdateMManagerSettingsMutation } = api;
