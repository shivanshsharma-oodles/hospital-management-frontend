// import About from "@/components/pages/landingComp/About";

import React from "react";
import AuthPage from "../auth/AuthPage";
import CommonNavbar from "@/components/common/CommonNavbar";

const AdminLandingPage = () => {

    return (
        <>
            <CommonNavbar role="ADMIN" />
            <main id="main" className="min-h-dvh">

                <AuthPage variant="admin" />
                {/* <About /> */}
            </main>
        </>
    )
}

export default AdminLandingPage;