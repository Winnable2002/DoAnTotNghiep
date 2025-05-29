"use client";

import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!authLoading && authUser && !hasRedirected) {
      const userRole = authUser.userRole?.toLowerCase();

      // Redirect only if current path is root or inappropriate for the role
      if (
        userRole === "manager" &&
        (pathname === "/" || pathname.startsWith("/search"))
      ) {
        setHasRedirected(true);
        router.push("/managers/properties", { scroll: false });
      }
    }
  }, [authUser, authLoading, router, pathname, hasRedirected]);

  return (
    <div className="h-full w-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>  
  );
};

export default Layout;
