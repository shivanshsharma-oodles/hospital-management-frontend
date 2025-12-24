import React from "react";
import CommonNavbar from "@/components/common/CommonNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <CommonNavbar role="ADMIN" />
            <Outlet />
        </>
    );
};
export default AdminLayout;