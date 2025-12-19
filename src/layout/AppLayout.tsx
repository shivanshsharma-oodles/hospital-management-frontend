import React from "react";
import BlobBg from "@/components/design/BlobBg";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <BlobBg />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
