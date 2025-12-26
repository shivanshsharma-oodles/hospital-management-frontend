import React from "react";
import About from "@/components/pagesComp/landingComp/About";
import Footer  from "@/components/common/Footer";
import AuthPage from "../auth/AuthPage";
import CommonNavbar from "@/components/common/CommonNavbar";

const LandingPage = () => {
  
  return (
    <>
      <CommonNavbar />
      <main id="main" className="h-screen overflow-auto">
        <AuthPage />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;