"use client";

import Navbar from "@/components/dashboard/layout/Navbar";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import ProtectedRoute from "@/utils/ProtectedRoutes";
import { useParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { memberId } = useParams();
  const pathname = usePathname();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [children]);

  console.log("pathname", pathname);

  // Whitelisted routes including the dynamic one
  const whitelistedRoutes = [
    "/dashboard/tools/view-secret",
    "/dashboard/assessments/game/[id]", // Dynamic route pattern
  ];

  // Adding support for query params and dynamic path matching
  const isWhitelisted = whitelistedRoutes.some((route) =>
    pathname?.startsWith("/dashboard/assessments/game")
  );

  return pathname?.includes("/dashboard/assessments/invites") && memberId ? (
    children
  ) : (
    <ProtectedRoute whitelistedRoutes={whitelistedRoutes}>
      <div className="w-full min-h-screen flex justify-between overflow-auto font-poppins relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed max-h-screen overflow-auto custom-scrollbar bg-Cgreen inset-0 z-50 transition-transform transform 
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0 xl:w-[16%] lg:w-[23%] md:w-[26%] w-[70%]`}
        >
          <Sidebar />
        </div>

        <div className="flex-1 xl:w-[84%] w-full lg:w-[77%] md:w-[74%] max-h-screen custom-scrollbar overflow-auto">
          <div className="sticky md:z-50 z-40 top-0 w-full">
            <Navbar toggleSidebar={toggleSidebar} />
          </div>
          {isWhitelisted ? children : <ProtectedRoute>{children}</ProtectedRoute>}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
