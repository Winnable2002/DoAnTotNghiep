"use client";

import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import React from "react";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant, { isLoading: isUpdating, isSuccess }] =
    useUpdateTenantSettingsMutation();

  if (isLoading || !authUser?.userInfo) return <>Loading...</>;

  const initialData = {
    name: authUser.userInfo.name || "",
    email: authUser.userInfo.email || "",
    phoneNumber: authUser.userInfo.phoneNumber || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateTenant({
        cognitoId: authUser.cognitoInfo?.userId ?? "",
        ...data,
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
};

export default TenantSettings;
