"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();

      // Điều kiện redirect nếu truy cập sai dashboard
      if (
        (userRole === "tenant" && pathname.startsWith("/manager")) ||
        (userRole === "manager" && pathname.startsWith("/tenant"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favourites",
          { scroll: false }
        );
      } else {
        setIsLoading(false); // ✅ Truy cập đúng, ngưng loading
      }
    } else {
      setIsLoading(false); // ✅ Không có authUser, tránh loading mãi
    }
  }, [authUser, pathname, router]);

  if (authLoading || isLoading) return <>Loading...</>;

  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar
              userType={
                authUser?.userRole.toLowerCase() as "manager" | "tenant"
              }
            />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
