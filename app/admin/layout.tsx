import AdminNavbar from "../components/AdminNavbar";
import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-[calc(100vh_-_150px)] max-w-screen flex">
      <div className="w-1/6 h-full">
        <AdminNavbar />
      </div>
      <div className="w-5/6 min-h-[calc(100vh_-_150px)] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
