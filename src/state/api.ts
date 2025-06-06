import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Managers", "Tenants"],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;

          const endpoint =
            userRole === "manager"
              ? `/managers/${user.userId}`
              : `/tenants/${user.userId}`;

          let userDetailsResponse = await fetchWithBQ(endpoint);

          // ✅ Nếu chưa có user trong DB → tạo mới
        if (
  userDetailsResponse.error &&
  userDetailsResponse.error.status === 404
    ) {
            const createResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            );

            if (createResponse.error) {
              throw new Error("Failed to create user");
            }

            if (!createResponse.data) {
              throw new Error("No user data returned after creation");
            }

            // ✅ Gán lại sau khi tạo thành công
            userDetailsResponse = { data: createResponse.data };
          }


          return {
            data: {
              cognitoInfo: user,
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole,
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: 500,
              data: error.message || "Could not fetch user data",
            },
          };
        }
      },
    }),
  }),
});

export const { useGetAuthUserQuery } = api;
