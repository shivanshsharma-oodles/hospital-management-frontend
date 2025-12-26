// import About from "@/components/pages/landingComp/About";

import React from "react";
import AuthPage from "../auth/AuthPage";

const AdminLandingPage = () => {

    return (
        <>
            <main id="main" className="min-h-dvh">

                <AuthPage variant="admin" />
                {/* <About /> */}
            </main>
        </>
    )
}

export default AdminLandingPage;