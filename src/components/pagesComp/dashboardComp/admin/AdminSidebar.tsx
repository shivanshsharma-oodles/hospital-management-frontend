import React from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/design/LogoImage";
import { ADMIN_DASH_SIDEBAR_BUTTONS } from "@/utils/constants/contants";

const AdminSidebar = () => {
  return (
    <div className="h-full flex flex-col justify-between px-4 py-6">

      {/* Top */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-2">
          <Logo className="w-12 h-12" />
          <span className="font-semibold text-md">Admin</span>
        </div>

        <div className="flex flex-col gap-2">
          {ADMIN_DASH_SIDEBAR_BUTTONS.map((ele, idx) => (
            <Button variant="ghost" onClick={ele.ON_CLICK} key={idx} className="justify-start">
              {ele.BUTTON_TEXT}
            </Button>
          ))}

        </div>
      </div>

      {/* Bottom */}
      {/* <div className="text-sm text-muted-foreground">
        Logged in as Admin
      </div> */}
    </div>
  );
};

export default AdminSidebar;
