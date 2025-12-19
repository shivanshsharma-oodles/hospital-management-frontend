import React from "react";
import About from "@/components/pagesComp/landingComp/About";
import Footer  from "@/components/common/Footer";
import NavBar from "@/components/common/Navbar";
import AuthPage from "../auth/AuthPage";

const LandingPage = () => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  

  // {showSignIn && <div>Sign In Modal</div>}
  // {showRegister && <div>Register Modal</div>}

  return (
    <>
      <NavBar OnSignInClick={() => setShowSignIn(!showSignIn)} OnRegisterClick={() => setShowRegister(!showRegister)} />
      <main id="main" className="min-h-dvh">
        <AuthPage />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;