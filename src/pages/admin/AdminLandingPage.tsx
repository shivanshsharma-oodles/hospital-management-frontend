// import About from "@/components/pages/landingComp/About";

import React from "react";
import AuthPage from "../auth/AuthPage";
import { Logo } from "@/components/design/LogoImage";
import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01";
import { APP } from "@/utils/constants/contants";

const AdminLandingPage = () => {

    return (
        <>
            <Navbar01 showNavLinks={false} showButtons={false} logo={<Logo className="w-26 h-16" />} appName={APP.ADMIN_NAME} />
            <main id="main" className="min-h-dvh">

                <AuthPage variant="admin" />
                {/* <About /> */}
            </main>
        </>
    )
}

export default AdminLandingPage;