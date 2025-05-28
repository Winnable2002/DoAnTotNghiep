"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();

      // Nếu là manager, không cho vào "/" hoặc "/search"
      if (
        userRole === "manager" &&
        (pathname === "/" || pathname.startsWith("/search"))
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false); // ✅ Dừng loading nếu hợp lệ
      }
    } else {
      setIsLoading(false); // ✅ Không có authUser vẫn cần dừng loading
    }
  }, [authUser, pathname, router]);

  if (authLoading || isLoading) return <>Loading...</>;

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className="flex flex-col items-center justify-between"
        style={{ paddingTop: `${NAVBAR_HEIGHT}px`, paddingBottom: "20px" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
