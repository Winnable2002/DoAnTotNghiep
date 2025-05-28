"use client";

import React from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import { useGetAuthUserQuery } from "@/state/api"; // ✅ Đảm bảo đường dẫn đúng
import {  Message } from "@aws-amplify/ui-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery(); // ✅ sửa cú pháp destructuring
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenant");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex items-center justify-between w-full py-3 px-8 bg-primary-700 text-white">
        {/* Logo + Brand */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" scroll={false} className="cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Logo Rentiful"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div className="text-2xl font-bold tracking-wide">
                <span className="text-white">RENT</span>
                <span className="text-secondary-500 font-light hover:text-primary-300 transition-colors duration-200">
                  NQB
                </span>
              </div>
            </div>
          </Link>
          {isDashboardPage && authUser && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {authUser.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Thêm Resort</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Tìm Resort</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-primary-300 hidden md:block">
          Thuê Resort mơ ước của bạn một cách dễ dàng. Tìm chỗ ở lý tưởng ngay
          hôm nay!
        </p>

        {/* Auth buttons */}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
            <div className="flex items-center gap-5">
              <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-secondary-400 " />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-secondary-700  rounded-full"></span>
            </div>
            <div className="flex items-center gap-5">
              <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-secondary-400 " />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-secondary-700  rounded-full"></span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={authUser.userInfo?.image} />
                  <AvatarFallback className="bg-primary-600">
                    {authUser.userRole?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-primary-200 hidden md:block">
                  {authUser.userInfo?.name 
                  ?? authUser.cognitoInfo?.username 
                  ?? authUser.cognitoInfo?.signInDetails?.loginId?.split('@')[0] 
                  ?? 'Người dùng'}
                </p>
              </div>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-primary-700">
                
                <DropdownMenuItem
                className="cursor-pointer hover:!bg-primary-100 hover:!text-secondary-400 "
                onClick={() => router.push(authUser.userRole?.toLowerCase() === "manager" ? 
                "/managers/properties" : "/tenants/favourites",
                { scroll: false }
                )}>
                  Go to Dashboard
                </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-primary-200" />
                  
                  <DropdownMenuItem 
                className="cursor-pointer hover:!bg-primary-100 hover:!text-secondary-400 "
                onClick={() => router.push('/${authUser.userRole?.toLowerCase()}s/settings',
                { scroll: false }
                )}>
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem 
                className="cursor-pointer hover:!bg-primary-100 hover:!text-secondary-400 "
                onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
            </>

          ) : (
            <><>
              </><Link href="/signin">
                  <Button
                    variant="outline"
                    className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                  >
                    Đăng nhập
                  </Button>
                </Link><Link href="/signup">
                  <Button
                    variant="secondary"
                    className="text-white border-white bg-secondary-700 hover:bg-white hover:text-primary-700 rounded-lg"
                  >
                    Đăng ký
                  </Button>
                </Link>
                
                </>)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
