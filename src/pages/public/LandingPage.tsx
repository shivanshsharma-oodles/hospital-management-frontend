// import ChatPage from "@/components/pages/ChatPage";

import About from "@/components/pages/landingComp/About";
import Footer  from "@/components/common/Footer";
import Hero from "@/components/pages/landingComp/Hero";
import NavBar from "@/components/common/Navbar";

import React from "react";

const LandingPage = () => {

  return (
    <>
      <NavBar/>
      <main id="main" className="min-h-dvh">
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;